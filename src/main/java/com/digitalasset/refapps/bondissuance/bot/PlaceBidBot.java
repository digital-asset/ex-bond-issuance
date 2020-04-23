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
import com.daml.ledger.rxjava.components.LedgerViewFlowable;
import com.daml.ledger.rxjava.components.helpers.CommandsAndPendingSet;
import com.daml.ledger.rxjava.components.helpers.CreatedContract;
import com.daml.ledger.rxjava.components.helpers.TemplateUtils;
import com.digitalasset.refapps.bondissuance.util.AssetUtil;
import com.digitalasset.refapps.bondissuance.util.BotLogger;
import com.digitalasset.refapps.bondissuance.util.BotUtil;
import com.digitalasset.refapps.bondissuance.util.CommandsAndPendingSetBuilder;
import com.google.common.collect.Sets;
import da.finance.fact.asset.AssetDeposit;
import da.finance.rule.asset.AssetFungible;
import da.finance.rule.asset.AssetSettlement;
import da.refapps.bond.auction.PlaceBidBotTrigger;
import da.refapps.bond.lock.AssetLockRule;
import io.reactivex.Flowable;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.slf4j.Logger;

/**
 * An automation bot to exercise the <i>PlaceBidBotTrigger_LockCash</i> choice when
 * <i>PlaceBidBotTrigger</i> contracts created on the ledger. It accumulates and filters the
 * necessary parameters.
 */
public class PlaceBidBot {

  public final TransactionFilter transactionFilter;
  private final Logger logger;
  private final CommandsAndPendingSetBuilder commandBuilder;

  public PlaceBidBot(String appId, String partyName) {
    String workflowId = "WORKFLOW-" + partyName + "-PlaceBidBot-" + UUID.randomUUID().toString();
    logger = BotLogger.getLogger(PlaceBidBot.class, workflowId);
    commandBuilder = new CommandsAndPendingSetBuilder(appId, partyName, workflowId);

    Filter messageFilter =
        new InclusiveFilter(
            Sets.newHashSet(
                AssetDeposit.TEMPLATE_ID,
                AssetLockRule.TEMPLATE_ID,
                AssetFungible.TEMPLATE_ID,
                AssetSettlement.TEMPLATE_ID,
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

    // collecting AssetDeposit contracts from the ledger
    Map<String, AssetDeposit> assetDeposits =
        BotUtil.filterTemplates(
            AssetDeposit.class, ledgerView.getContracts(AssetDeposit.TEMPLATE_ID));

    // collecting AssetFungible contracts from the ledger
    Map<String, AssetFungible> assetFungibles =
        BotUtil.filterTemplates(
            AssetFungible.class, ledgerView.getContracts(AssetFungible.TEMPLATE_ID));

    // collecting AssetSettlement contracts from the ledger
    Map<String, AssetSettlement> assetSettlements =
        BotUtil.filterTemplates(
            AssetSettlement.class, ledgerView.getContracts(AssetSettlement.TEMPLATE_ID));

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
      List<AssetDeposit.ContractId> cashAssets =
          AssetUtil.findAssetDepositCids(assetDeposits, lockRequest.getValue().cashAssetId);

      // pick a lock rule
      AssetLockRule.ContractId lockRule =
          AssetUtil.findLockRule(assetLockRules, lockRequest.getValue().cashProvider, logger);

      // pick a AssetFungible
      AssetFungible.ContractId assetFungible =
          AssetUtil.findAssetFungible(
              assetFungibles,
              lockRequest.getValue().cashProvider,
              lockRequest.getValue().bidder,
              logger);

      // pick a AssetSettlement
      AssetSettlement.ContractId assetSettlement =
          AssetUtil.findAssetSettlement(
              assetSettlements,
              lockRequest.getValue().bondProvider,
              lockRequest.getValue().bidder,
              logger);

      // exercise the choice
      builder.addCommand(
          triggerCid.exercisePlaceBidBotTrigger_LockCash(
              cashAssets, assetFungible, lockRule, assetSettlement));
    }
    return builder.buildFlowable();
  }

  public Template getContractInfo(CreatedContract createdContract) {
    //noinspection unchecked
    return TemplateUtils.contractTransformer(
            PlaceBidBotTrigger.class,
            AssetDeposit.class,
            AssetLockRule.class,
            AssetFungible.class,
            AssetSettlement.class)
        .apply(createdContract);
  }
}
