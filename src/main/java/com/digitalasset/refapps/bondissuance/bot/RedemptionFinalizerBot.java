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
import da.finance.asset.fact.AssetFact;
import da.finance.asset.splitandmerge.AssetSplitAndMergeRule;
import da.finance.asset.transfer.bilateral.AssetTransferRule;
import da.refapps.bond.redemption.RedemptionFinalizeBotTrigger;
import io.reactivex.Flowable;
import java.util.*;
import org.slf4j.Logger;

/**
 * An automation bot to exercise the <i>RedemptionFinalizeBotTrigger_Finalize</i> choice when
 * <i>RedemptionFinalizeBotTrigger</i> contracts created on the ledger. It accumulates and filters
 * the necessary parameters: - cashAssetFactCids - cashTransferRuleCid - cashSplitAndMergeRuleCid
 */
public class RedemptionFinalizerBot {

  public final TransactionFilter transactionFilter;
  private final Logger logger;
  private final CommandsAndPendingSetBuilder commandBuilder;

  public RedemptionFinalizerBot(TimeManager timeManager, String appId, String partyName) {
    String workflowId =
        "WORKFLOW-" + partyName + "-RedemptionFinalizerBot-" + UUID.randomUUID().toString();
    logger = BotLogger.getLogger(InviteAgentBot.class, workflowId);

    commandBuilder = new CommandsAndPendingSetBuilder(appId, partyName, workflowId, timeManager);

    Filter messageFilter =
        new InclusiveFilter(
            Sets.newHashSet(
                RedemptionFinalizeBotTrigger.TEMPLATE_ID,
                AssetFact.TEMPLATE_ID,
                AssetTransferRule.TEMPLATE_ID,
                AssetSplitAndMergeRule.TEMPLATE_ID));

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
    Map<String, AssetFact> assetFactCids =
        BotUtil.filterTemplates(AssetFact.class, ledgerView.getContracts(AssetFact.TEMPLATE_ID));

    // collecting transfer rule contracts from the ledger
    Map<String, AssetTransferRule> assetTransferRules =
        BotUtil.filterTemplates(
            AssetTransferRule.class, ledgerView.getContracts(AssetTransferRule.TEMPLATE_ID));

    // collecting splitAndMergeRule contracts from the ledger
    Map<String, AssetSplitAndMergeRule> assetSplitAndMergeRules =
        BotUtil.filterTemplates(
            AssetSplitAndMergeRule.class,
            ledgerView.getContracts(AssetSplitAndMergeRule.TEMPLATE_ID));

    CommandsAndPendingSetBuilder.Builder builder = commandBuilder.newBuilder();
    if (triggerContracts.size() > 0) {
      // Do one payment at a time as we consume the cash asset for this choice
      Map.Entry<String, RedemptionFinalizeBotTrigger> trigger =
          triggerContracts.entrySet().iterator().next();
      RedemptionFinalizeBotTrigger.ContractId triggerCid =
          new RedemptionFinalizeBotTrigger.ContractId(trigger.getKey());

      String cashAccountProvider = trigger.getValue().cashAccountProvider;

      // pick transfer rule
      AssetTransferRule.ContractId transferRuleCid =
          AssetUtil.findTransferRule(assetTransferRules, cashAccountProvider, logger);

      // pick splitAndMergeRule
      AssetSplitAndMergeRule.ContractId splitAndMergeRuleCid =
          AssetUtil.findSplitAndMergeRule(assetSplitAndMergeRules, cashAccountProvider, logger);

      // find relevant asset facts
      List<AssetFact.ContractId> assetFacts =
          AssetUtil.findAssetFactCids(
              assetFactCids, cashAccountProvider, trigger.getValue().cashInstrumentId);

      // exercise choice
      if (assetFacts.isEmpty()) {
        logger.warn(
            "No cash assets found to pay with. Instrument: "
                + trigger.getValue().cashInstrumentId
                + " provider: "
                + cashAccountProvider);
      } else {
        logger.info("Completing redemption " + trigger.getKey());
        builder.addCommand(
            triggerCid.exerciseRedemptionFinalizeBotTrigger_Finalize(
                assetFacts, transferRuleCid, splitAndMergeRuleCid));
      }
    }
    return builder.buildFlowable();
  }

  public Template getContractInfo(CreatedContract createdContract) {
    Value args = createdContract.getCreateArguments();
    if (createdContract.getTemplateId().equals(RedemptionFinalizeBotTrigger.TEMPLATE_ID)) {
      return RedemptionFinalizeBotTrigger.fromValue(args);
    } else if (createdContract.getTemplateId().equals(AssetFact.TEMPLATE_ID)) {
      return AssetFact.fromValue(args);
    } else if (createdContract.getTemplateId().equals(AssetTransferRule.TEMPLATE_ID)) {
      return AssetTransferRule.fromValue(args);
    } else if (createdContract.getTemplateId().equals(AssetSplitAndMergeRule.TEMPLATE_ID)) {
      return AssetSplitAndMergeRule.fromValue(args);
    } else {
      String msg =
          "RedemptionFinalizerBot Bot encountered an unknown contract of type "
              + createdContract.getTemplateId();
      logger.error(msg);
      throw new IllegalStateException(msg);
    }
  }
}
