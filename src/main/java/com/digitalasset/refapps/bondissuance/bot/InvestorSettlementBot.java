/*
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
import da.finance.rule.asset.AssetFungible;
import da.finance.rule.asset.AssetSettlement;
import da.refapps.bond.lock.AuctionLockedCash;
import da.refapps.bond.settlement.InvestorSettlement;
import io.reactivex.Flowable;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import org.slf4j.Logger;

/**
 * An automation bot to exercise the <i>InvestorSettlement_Finalize</i> choice when
 * <i>InvestorSettlement</i> contracts created on the ledger. It accumulates and filters the
 * necessary parameters.
 */
public class InvestorSettlementBot {

  public final TransactionFilter transactionFilter;
  private final Logger logger;
  private final CommandsAndPendingSetBuilder commandBuilder;

  public InvestorSettlementBot(String appId, String partyName) {
    String workflowId =
        "WORKFLOW-" + partyName + "-InvestorSettlementBot-" + UUID.randomUUID().toString();
    logger = BotLogger.getLogger(InvestorSettlementBot.class, workflowId);

    commandBuilder = new CommandsAndPendingSetBuilder(appId, partyName, workflowId);

    Filter messageFilter =
        new InclusiveFilter(
            Sets.newHashSet(
                InvestorSettlement.TEMPLATE_ID,
                AuctionLockedCash.TEMPLATE_ID,
                AssetSettlement.TEMPLATE_ID,
                AssetFungible.TEMPLATE_ID));

    this.transactionFilter = new FiltersByParty(Collections.singletonMap(partyName, messageFilter));

    logger.info("Startup completed");
  }

  public Flowable<CommandsAndPendingSet> calculateCommands(
      LedgerViewFlowable.LedgerView<Template> ledgerView) {
    // collecting the trigger contracts from the ledger
    Map<String, InvestorSettlement> triggerContracts =
        BotUtil.filterTemplates(
            InvestorSettlement.class, ledgerView.getContracts(InvestorSettlement.TEMPLATE_ID));

    // collecting AuctionLockedCash contracts from the ledger
    Map<String, AuctionLockedCash> auctionLockedCash =
        BotUtil.filterTemplates(
            AuctionLockedCash.class, ledgerView.getContracts(AuctionLockedCash.TEMPLATE_ID));

    // collecting transfer rule contracts from the ledger
    Map<String, AssetSettlement> assetSettlements =
        BotUtil.filterTemplates(
            AssetSettlement.class, ledgerView.getContracts(AssetSettlement.TEMPLATE_ID));

    // collecting AssetFungible contracts from the ledger
    Map<String, AssetFungible> assetFungibles =
        BotUtil.filterTemplates(
            AssetFungible.class, ledgerView.getContracts(AssetFungible.TEMPLATE_ID));

    CommandsAndPendingSetBuilder.Builder builder = commandBuilder.newBuilder();
    if (triggerContracts.size() > 0) {
      // Do one settlement at a time as we consume the cash asset for settlement
      Map.Entry<String, InvestorSettlement> settlement =
          triggerContracts.entrySet().iterator().next();
      logger.info("Processing InvestorSettlement for " + settlement.getValue().auctionName);

      InvestorSettlement.ContractId triggerCid =
          new InvestorSettlement.ContractId(settlement.getKey());

      // pick a transfer rule
      AssetSettlement.ContractId assetSettlement =
          AssetUtil.findAssetSettlement(
              assetSettlements,
              settlement.getValue().cashProvider,
              settlement.getValue().investor,
              logger);

      // pick an asset fungible
      AssetFungible.ContractId assetFungible =
          AssetUtil.findAssetFungible(
              assetFungibles,
              settlement.getValue().cashProvider,
              settlement.getValue().investor,
              logger);

      // find the relevant locked cash assets
      List<AuctionLockedCash.ContractId> auctionLockedCashCids =
          auctionLockedCash.entrySet().stream()
              .filter(
                  cidWithAuctionLockedCash ->
                      cidWithAuctionLockedCash
                          .getValue()
                          .auctionAgent
                          .equals(settlement.getValue().auctionAgent))
              .filter(
                  cidWithAuctionLockedCash ->
                      cidWithAuctionLockedCash
                          .getValue()
                          .auctionName
                          .equals(settlement.getValue().auctionName))
              .map(cidWithAccount -> new AuctionLockedCash.ContractId(cidWithAccount.getKey()))
              .collect(Collectors.toList());
      if (auctionLockedCashCids.isEmpty()) {
        String msg =
            "Can't find any auction locks for this auction: " + settlement.getValue().auctionName;
        logger.error(msg);
        throw new IllegalStateException(msg);
      }

      // exercise the choice
      logger.info("Executing InvestorSettlement_Finalize for " + settlement.getKey());
      builder.addCommand(
          triggerCid.exerciseInvestorSettlement_Finalize(
              auctionLockedCashCids, assetFungible, assetSettlement));
    }
    return builder.buildFlowable();
  }

  public Template getContractInfo(CreatedContract createdContract) {
    //noinspection unchecked
    return TemplateUtils.contractTransformer(
            InvestorSettlement.class,
            AuctionLockedCash.class,
            AssetSettlement.class,
            AssetFungible.class)
        .apply(createdContract);
  }
}
