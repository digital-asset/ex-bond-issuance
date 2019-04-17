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
import com.digitalasset.refapps.bondissuance.util.AssetUtil;
import com.digitalasset.refapps.bondissuance.util.BotLogger;
import com.digitalasset.refapps.bondissuance.util.BotUtil;
import com.digitalasset.refapps.bondissuance.util.CommandsAndPendingSetBuilder;
import com.digitalasset.refapps.bondissuance.util.TimeManager;
import com.google.common.collect.Sets;
import da.finance.asset.fact.AssetFact;
import da.finance.asset.lock.AssetLockRule;
import da.finance.asset.splitandmerge.AssetSplitAndMergeRule;
import da.refapps.bond.auction.PlaceBidBotTrigger;
import io.reactivex.Flowable;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.slf4j.Logger;

/**
 * An automation bot to exercise the <i>PlaceBidBotTrigger_LockCash</i> choice when
 * <i>PlaceBidBotTrigger</i> contracts created on the ledger. It accumulates and filters the
 * necessary parameters: - cashAssets - cashSplitAndMergeRuleCid - cashLockRuleCid
 */
public class AuctionLockBot {

  public final TransactionFilter transactionFilter;
  private final Logger logger;
  private final CommandsAndPendingSetBuilder commandBuilder;

  public AuctionLockBot(TimeManager timeManager, String appId, String partyName) {
    String workflowId = "WORKFLOW-" + partyName + "-AuctionLockBot-" + UUID.randomUUID().toString();
    logger = BotLogger.getLogger(InviteAgentBot.class, workflowId);
    commandBuilder = new CommandsAndPendingSetBuilder(appId, partyName, workflowId, timeManager);

    Filter messageFilter =
        new InclusiveFilter(
            Sets.newHashSet(
                AssetFact.TEMPLATE_ID,
                AssetLockRule.TEMPLATE_ID,
                AssetSplitAndMergeRule.TEMPLATE_ID,
                PlaceBidBotTrigger.TEMPLATE_ID));

    transactionFilter = new FiltersByParty(Collections.singletonMap(partyName, messageFilter));

    logger.info("Startup completed");
  }

  public Flowable<CommandsAndPendingSet> calculateCommands(
      LedgerViewFlowable.LedgerView<Template> ledgerView) {
    // collecting the trigger contracts from the ledger
    Map<String, PlaceBidBotTrigger> lockRequests =
        BotUtil.filterTemplates(
            PlaceBidBotTrigger.class, ledgerView.getContracts(PlaceBidBotTrigger.TEMPLATE_ID));

    // collecting AssetFact contracts from the ledger
    Map<String, AssetFact> assetFacts =
        BotUtil.filterTemplates(AssetFact.class, ledgerView.getContracts(AssetFact.TEMPLATE_ID));

    // collecting splitAndMergeRule contracts from the ledger
    Map<String, AssetSplitAndMergeRule> assetSplitAndMergeRules =
        BotUtil.filterTemplates(
            AssetSplitAndMergeRule.class,
            ledgerView.getContracts(AssetSplitAndMergeRule.TEMPLATE_ID));

    // collecting lockRule contracts from the ledger
    Map<String, AssetLockRule> assetLockRules =
        BotUtil.filterTemplates(
            AssetLockRule.class, ledgerView.getContracts(AssetLockRule.TEMPLATE_ID));

    CommandsAndPendingSetBuilder.Builder builder = commandBuilder.newBuilder();

    if (lockRequests.size() > 0) {
      // Do one locking at a time as we consume the cash asset
      Map.Entry<String, PlaceBidBotTrigger> lockRequest = lockRequests.entrySet().iterator().next();

      PlaceBidBotTrigger.ContractId triggerCid =
          new PlaceBidBotTrigger.ContractId(lockRequest.getKey());

      // find relevant assets
      List<AssetFact.ContractId> cashAssets =
          AssetUtil.findAssetFactCids(
              assetFacts,
              lockRequest.getValue().cashInstrumentKey.provider,
              lockRequest.getValue().cashInstrumentKey.instrumentId);

      // pick a lock rule
      AssetLockRule.ContractId lockRule =
          AssetUtil.findLockRule(
              assetLockRules, lockRequest.getValue().cashInstrumentKey.provider, logger);

      // pick a splitAndMerge rule
      AssetSplitAndMergeRule.ContractId splitAndMergeRule =
          AssetUtil.findSplitAndMergeRule(
              assetSplitAndMergeRules, lockRequest.getValue().cashInstrumentKey.provider, logger);

      // exercise the choice
      builder.addCommand(
          triggerCid.exercisePlaceBidBotTrigger_LockCash(cashAssets, splitAndMergeRule, lockRule));
    }
    return builder.buildFlowable();
  }

  public Template getContractInfo(CreatedContract createdContract) {
    Value args = createdContract.getCreateArguments();
    if (createdContract.getTemplateId().equals(PlaceBidBotTrigger.TEMPLATE_ID)) {
      return PlaceBidBotTrigger.fromValue(args);
    } else if (createdContract.getTemplateId().equals(AssetFact.TEMPLATE_ID)) {
      return AssetFact.fromValue(args);
    } else if (createdContract.getTemplateId().equals(AssetLockRule.TEMPLATE_ID)) {
      return AssetLockRule.fromValue(args);
    } else if (createdContract.getTemplateId().equals(AssetSplitAndMergeRule.TEMPLATE_ID)) {
      return AssetSplitAndMergeRule.fromValue(args);
    } else {
      String msg =
          "AuctionLockBot encountered an unknown contract of type "
              + createdContract.getTemplateId();
      logger.error(msg);
      throw new IllegalStateException(msg);
    }
  }
}
