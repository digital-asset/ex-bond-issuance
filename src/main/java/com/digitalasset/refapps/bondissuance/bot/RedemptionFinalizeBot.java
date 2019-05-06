/**
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance.bot;

import com.daml.ledger.javaapi.data.*;
import com.daml.ledger.rxjava.components.LedgerViewFlowable;
import com.daml.ledger.rxjava.components.helpers.CommandsAndPendingSet;
import com.daml.ledger.rxjava.components.helpers.CreatedContract;
import com.digitalasset.refapps.bondissuance.util.*;
import com.google.common.collect.Sets;
import da.finance.fact.asset.AssetDeposit;
import da.finance.rule.asset.AssetFungible;
import da.finance.rule.asset.AssetSettlement;
import da.refapps.bond.redemption.RedemptionFinalizeBotTrigger;
import io.reactivex.Flowable;
import java.util.*;
import org.slf4j.Logger;

/**
 * An automation bot to exercise the <i>RedemptionFinalizeBotTrigger_Finalize</i> choice when
 * <i>RedemptionFinalizeBotTrigger</i> contracts created on the ledger. It accumulates and filters
 * the necessary parameters.
 */
public class RedemptionFinalizeBot {

  public final TransactionFilter transactionFilter;
  private final Logger logger;
  private final CommandsAndPendingSetBuilder commandBuilder;

  public RedemptionFinalizeBot(TimeManager timeManager, String appId, String partyName) {
    String workflowId =
        "WORKFLOW-" + partyName + "-RedemptionFinalizeBot-" + UUID.randomUUID().toString();
    logger = BotLogger.getLogger(RedemptionFinalizeBot.class, workflowId);

    commandBuilder = new CommandsAndPendingSetBuilder(appId, partyName, workflowId, timeManager);

    Filter messageFilter =
        new InclusiveFilter(
            Sets.newHashSet(
                RedemptionFinalizeBotTrigger.TEMPLATE_ID,
                AssetDeposit.TEMPLATE_ID,
                AssetSettlement.TEMPLATE_ID,
                AssetFungible.TEMPLATE_ID));

    transactionFilter = new FiltersByParty(Collections.singletonMap(partyName, messageFilter));

    logger.info("Startup completed");
  }

  public Flowable<CommandsAndPendingSet> calculateCommands(
      LedgerViewFlowable.LedgerView<Template> ledgerView) {
    // collecting the trigger contracts from the ledger
    Map<String, RedemptionFinalizeBotTrigger> triggerContracts =
        BotUtil.filterTemplates(
            RedemptionFinalizeBotTrigger.class,
            ledgerView.getContracts(RedemptionFinalizeBotTrigger.TEMPLATE_ID));

    // collecting asset fact contracts from the ledger
    Map<String, AssetDeposit> assetDeposits =
        BotUtil.filterTemplates(AssetDeposit.class, ledgerView.getContracts(AssetDeposit.TEMPLATE_ID));

    // collecting AssetSettlement contracts from the ledger
    Map<String, AssetSettlement> assetSettlements =
        BotUtil.filterTemplates(
            AssetSettlement.class, ledgerView.getContracts(AssetSettlement.TEMPLATE_ID));

    // collecting AssetFungible contracts from the ledger
    Map<String, AssetFungible> assetFungibles =
        BotUtil.filterTemplates(
            AssetFungible.class,
            ledgerView.getContracts(AssetFungible.TEMPLATE_ID));

    CommandsAndPendingSetBuilder.Builder builder = commandBuilder.newBuilder();
    if (triggerContracts.size() > 0) {
      // Do one payment at a time as we consume the cash asset for this choice
      Map.Entry<String, RedemptionFinalizeBotTrigger> trigger =
          triggerContracts.entrySet().iterator().next();
      RedemptionFinalizeBotTrigger.ContractId triggerCid =
          new RedemptionFinalizeBotTrigger.ContractId(trigger.getKey());

      String cashAccountProvider = trigger.getValue().cashAccountProvider;

      // pick AssetSettlement
      AssetSettlement.ContractId assetSettlementCid =
          AssetUtil.findAssetSettlement(assetSettlements, cashAccountProvider, trigger.getValue().issuer, logger);

      // pick AssetFungible
      AssetFungible.ContractId assetFungibleCid =
          AssetUtil.findAssetFungible(assetFungibles, cashAccountProvider, trigger.getValue().issuer, logger);

      // find relevant asset facts
      List<AssetDeposit.ContractId> assetDepositCids =
          AssetUtil.findAssetDepositCids(
              assetDeposits, trigger.getValue().cashAssetId);

      // exercise choice
      if (assetDepositCids.isEmpty()) {
        logger.warn(
            "No cash assets found to pay with. Instrument: "
                + trigger.getValue().cashAssetId);
      } else {
        logger.info("Completing redemption " + trigger.getKey());
        builder.addCommand(
            triggerCid.exerciseRedemptionFinalizeBotTrigger_Finalize(
                assetDepositCids, assetSettlementCid, assetFungibleCid));
      }
    }
    return builder.buildFlowable();
  }

  public Template getContractInfo(CreatedContract createdContract) {
    Value args = createdContract.getCreateArguments();
    if (createdContract.getTemplateId().equals(RedemptionFinalizeBotTrigger.TEMPLATE_ID)) {
      return RedemptionFinalizeBotTrigger.fromValue(args);
    } else if (createdContract.getTemplateId().equals(AssetDeposit.TEMPLATE_ID)) {
      return AssetDeposit.fromValue(args);
    } else if (createdContract.getTemplateId().equals(AssetSettlement.TEMPLATE_ID)) {
      return AssetSettlement.fromValue(args);
    } else if (createdContract.getTemplateId().equals(AssetFungible.TEMPLATE_ID)) {
      return AssetFungible.fromValue(args);
    } else {
      String msg =
          "RedemptionFinalizeBot Bot encountered an unknown contract of type "
              + createdContract.getTemplateId();
      logger.error(msg);
      throw new IllegalStateException(msg);
    }
  }
}
