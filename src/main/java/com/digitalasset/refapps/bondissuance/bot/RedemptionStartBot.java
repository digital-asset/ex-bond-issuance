/**
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance.bot;

import com.daml.ledger.javaapi.data.Filter;
import com.daml.ledger.javaapi.data.FiltersByParty;
import com.daml.ledger.javaapi.data.InclusiveFilter;
import com.daml.ledger.javaapi.data.Template;
import com.daml.ledger.javaapi.data.TransactionFilter;
import com.daml.ledger.javaapi.data.Value;
import com.daml.ledger.rxjava.components.LedgerViewFlowable;
import com.daml.ledger.rxjava.components.helpers.CommandsAndPendingSet;
import com.daml.ledger.rxjava.components.helpers.CreatedContract;
import com.digitalasset.refapps.bondissuance.util.BotLogger;
import com.digitalasset.refapps.bondissuance.util.BotUtil;
import com.digitalasset.refapps.bondissuance.util.CommandsAndPendingSetBuilder;
import com.digitalasset.refapps.bondissuance.util.TimeManager;
import com.google.common.collect.Sets;
import da.finance.asset.fact.AssetFact;
import da.finance.asset.lock.AssetLockedFact;
import da.finance.types.InstrumentId;
import da.refapps.bond.redemption.RedemptionCalculationBotTrigger;
import da.refapps.bond.redemption.RedemptionPayoutInfo;
import io.reactivex.Flowable;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import org.slf4j.Logger;

/**
 * An automation bot to exercise the <i>RedemptionCalculationBotTrigger_Start</i> choice when
 * <i>RedemptionCalculationBotTrigger</i> contracts created on the ledger. It accumulates and
 * filters the necessary parameters: - redemptionPayoutInfos - bondsAtIssuer - lockedAssets
 */
public class RedemptionStartBot {

  public final TransactionFilter transactionFilter;
  private final Logger logger;
  private final CommandsAndPendingSetBuilder commandBuilder;

  public RedemptionStartBot(TimeManager timeManager, String appId, String partyName) {
    String workflowId =
        "WORKFLOW-" + partyName + "-RedemptionStartBot-" + UUID.randomUUID().toString();
    logger = BotLogger.getLogger(InviteAgentBot.class, workflowId);
    commandBuilder = new CommandsAndPendingSetBuilder(appId, partyName, workflowId, timeManager);

    Filter messageFilter =
        new InclusiveFilter(
            Sets.newHashSet(
                RedemptionCalculationBotTrigger.TEMPLATE_ID,
                RedemptionPayoutInfo.TEMPLATE_ID,
                AssetFact.TEMPLATE_ID,
                AssetLockedFact.TEMPLATE_ID));

    transactionFilter = new FiltersByParty(Collections.singletonMap(partyName, messageFilter));

    logger.info("Startup completed");
  }

  public Flowable<CommandsAndPendingSet> calculateCommands(
      LedgerViewFlowable.LedgerView<Template> ledgerView) {
    // collecting the trigger contracts from the ledger
    Map<String, RedemptionCalculationBotTrigger> triggerContracts =
        BotUtil.filterTemplates(
            RedemptionCalculationBotTrigger.class,
            ledgerView.getContracts(RedemptionCalculationBotTrigger.TEMPLATE_ID));

    // collecting RedemptionPayoutInfo contracts from the ledger
    Map<String, RedemptionPayoutInfo> paymentInfoCids =
        BotUtil.filterTemplates(
            RedemptionPayoutInfo.class, ledgerView.getContracts(RedemptionPayoutInfo.TEMPLATE_ID));

    // collecting asset fact contracts from the ledger
    Map<String, AssetFact> assetFactCids =
        BotUtil.filterTemplates(AssetFact.class, ledgerView.getContracts(AssetFact.TEMPLATE_ID));

    // collecting locked asset fact contracts from the ledger
    Map<String, AssetLockedFact> assetLockedFactCids =
        BotUtil.filterTemplates(
            AssetLockedFact.class, ledgerView.getContracts(AssetLockedFact.TEMPLATE_ID));

    CommandsAndPendingSetBuilder.Builder builder = commandBuilder.newBuilder();
    for (Map.Entry<String, RedemptionCalculationBotTrigger> calculation :
        triggerContracts.entrySet()) {
      logger.info("Processing redemption calculation " + calculation.getKey());
      RedemptionCalculationBotTrigger.ContractId triggerCid =
          new RedemptionCalculationBotTrigger.ContractId(calculation.getKey());

      // find relevant accounts
      InstrumentId instrumentId = calculation.getValue().bondInstrumentId;
      List<RedemptionPayoutInfo.ContractId> accountCids =
          paymentInfoCids.entrySet().stream()
              .filter(e -> e.getValue().bondInstrumentId.equals(instrumentId))
              .map(e -> new RedemptionPayoutInfo.ContractId(e.getKey()))
              .collect(Collectors.toList());
      if (accountCids.isEmpty()) {
        String msg = "No RedemptionPayoutInfos found!";
        logger.error(msg);
        throw new IllegalStateException(msg);
      }

      // find relevant assets
      List<AssetFact.ContractId> remainingAssetCids =
          assetFactCids.entrySet().stream()
              .filter(e -> e.getValue().accountId.owner.equals(e.getValue().assetId.issuer))
              .map(e -> new AssetFact.ContractId(e.getKey()))
              .collect(Collectors.toList());

      // find relevant locked assets
      List<AssetLockedFact.ContractId> lockedAssets =
          assetLockedFactCids.entrySet().stream()
              .filter(e -> e.getValue().assetFact.assetId.instrumentId.equals(instrumentId))
              .map(e -> new AssetLockedFact.ContractId(e.getKey()))
              .collect(Collectors.toList());

      // exercise the choice
      builder.addCommand(
          triggerCid.exerciseRedemptionCalculationBotTrigger_Start(
              accountCids, remainingAssetCids, lockedAssets));
    }
    return builder.buildFlowable();
  }

  public Template getContractInfo(CreatedContract createdContract) {
    Value args = createdContract.getCreateArguments();
    if (createdContract.getTemplateId().equals(RedemptionCalculationBotTrigger.TEMPLATE_ID)) {
      return RedemptionCalculationBotTrigger.fromValue(args);
    } else if (createdContract.getTemplateId().equals(RedemptionPayoutInfo.TEMPLATE_ID)) {
      return RedemptionPayoutInfo.fromValue(args);
    } else if (createdContract.getTemplateId().equals(AssetFact.TEMPLATE_ID)) {
      return AssetFact.fromValue(args);
    } else if (createdContract.getTemplateId().equals(AssetLockedFact.TEMPLATE_ID)) {
      return AssetLockedFact.fromValue(args);
    } else {
      String msg =
          "RedemptionStart Agent Bot encountered an unknown contract of type "
              + createdContract.getTemplateId();
      logger.error(msg);
      throw new IllegalStateException(msg);
    }
  }
}
