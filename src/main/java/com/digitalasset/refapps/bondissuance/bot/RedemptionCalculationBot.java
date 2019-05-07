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
import da.finance.fact.asset.AssetDeposit;
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
 * filters the necessary parameters.
 */
public class RedemptionCalculationBot {

  public final TransactionFilter transactionFilter;
  private final Logger logger;
  private final CommandsAndPendingSetBuilder commandBuilder;

  public RedemptionCalculationBot(TimeManager timeManager, String appId, String partyName) {
    String workflowId =
        "WORKFLOW-" + partyName + "-RedemptionCalculationBot-" + UUID.randomUUID().toString();
    logger = BotLogger.getLogger(RedemptionCalculationBot.class, workflowId);
    commandBuilder = new CommandsAndPendingSetBuilder(appId, partyName, workflowId, timeManager);

    Filter messageFilter =
        new InclusiveFilter(
            Sets.newHashSet(
                RedemptionCalculationBotTrigger.TEMPLATE_ID,
                RedemptionPayoutInfo.TEMPLATE_ID,
                AssetDeposit.TEMPLATE_ID));

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
    Map<String, AssetDeposit> assetDeposits =
        BotUtil.filterTemplates(
            AssetDeposit.class, ledgerView.getContracts(AssetDeposit.TEMPLATE_ID));

    CommandsAndPendingSetBuilder.Builder builder = commandBuilder.newBuilder();
    for (Map.Entry<String, RedemptionCalculationBotTrigger> calculation :
        triggerContracts.entrySet()) {
      logger.info("Processing redemption calculation " + calculation.getKey());
      RedemptionCalculationBotTrigger.ContractId triggerCid =
          new RedemptionCalculationBotTrigger.ContractId(calculation.getKey());

      // find relevant accounts
      List<RedemptionPayoutInfo.ContractId> payouInfos =
          paymentInfoCids.entrySet().stream()
              .filter(e -> e.getValue().bondInstrumentId.equals(calculation.getValue().bondAssetId))
              .map(e -> new RedemptionPayoutInfo.ContractId(e.getKey()))
              .collect(Collectors.toList());
      if (payouInfos.isEmpty()) {
        String msg = "No RedemptionPayoutInfos found!";
        logger.error(msg);
        throw new IllegalStateException(msg);
      }

      // find relevant assets
      List<AssetDeposit.ContractId> remainingAssetCids =
          assetDeposits.entrySet().stream()
              .filter(e -> e.getValue().account.owner.equals(calculation.getValue().issuer))
              .map(e -> new AssetDeposit.ContractId(e.getKey()))
              .collect(Collectors.toList());

      // exercise the choice
      builder.addCommand(
          triggerCid.exerciseRedemptionCalculationBotTrigger_Start(payouInfos, remainingAssetCids));
    }
    return builder.buildFlowable();
  }

  public Template getContractInfo(CreatedContract createdContract) {
    Value args = createdContract.getCreateArguments();
    if (createdContract.getTemplateId().equals(RedemptionCalculationBotTrigger.TEMPLATE_ID)) {
      return RedemptionCalculationBotTrigger.fromValue(args);
    } else if (createdContract.getTemplateId().equals(RedemptionPayoutInfo.TEMPLATE_ID)) {
      return RedemptionPayoutInfo.fromValue(args);
    } else if (createdContract.getTemplateId().equals(AssetDeposit.TEMPLATE_ID)) {
      return AssetDeposit.fromValue(args);
    } else {
      String msg =
          "RedemptionStart Agent Bot encountered an unknown contract of type "
              + createdContract.getTemplateId();
      logger.error(msg);
      throw new IllegalStateException(msg);
    }
  }
}
