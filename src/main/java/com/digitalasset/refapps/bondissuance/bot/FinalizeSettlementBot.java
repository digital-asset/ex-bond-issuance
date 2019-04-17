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
import da.finance.account.fact.AccountFact;
import da.finance.asset.splitandmerge.AssetSplitAndMergeRule;
import da.finance.asset.transfer.bilateral.AssetTransferRule;
import da.refapps.bond.settlement.AuctionLockedCash;
import da.refapps.bond.settlement.InvestorSettlementBotTrigger;
import io.reactivex.Flowable;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import org.slf4j.Logger;

/**
 * An automation bot to exercise the <i>InvestorSettlementBotTrigger_Finalize</i> choice when
 * <i>InvestorSettlementBotTrigger</i> contracts created on the ledger. It accumulates and filters
 * the necessary parameters: - deliveryTransferRuleCid - deliverySplitAndMergeRuleCid -
 * auctionLockedCashCids - cashAccountCid - assetTargetAccountFactCid
 */
public class FinalizeSettlementBot {

  public final TransactionFilter transactionFilter;
  private final Logger logger;
  private final CommandsAndPendingSetBuilder commandBuilder;

  public FinalizeSettlementBot(TimeManager timeManager, String appId, String partyName) {
    String workflowId =
        "WORKFLOW-" + partyName + "-FinalizeSettlementBot-" + UUID.randomUUID().toString();
    logger = BotLogger.getLogger(FinalizeSettlementBot.class, workflowId);

    commandBuilder = new CommandsAndPendingSetBuilder(appId, partyName, workflowId, timeManager);

    Filter messageFilter =
        new InclusiveFilter(
            Sets.newHashSet(
                InvestorSettlementBotTrigger.TEMPLATE_ID,
                AccountFact.TEMPLATE_ID,
                AuctionLockedCash.TEMPLATE_ID,
                AssetTransferRule.TEMPLATE_ID,
                AssetSplitAndMergeRule.TEMPLATE_ID));

    this.transactionFilter = new FiltersByParty(Collections.singletonMap(partyName, messageFilter));

    logger.info("Startup completed");
  }

  public Flowable<CommandsAndPendingSet> calculateCommands(
      LedgerViewFlowable.LedgerView<Template> ledgerView) {
    // collecting the trigger contracts from the ledger
    Map<String, InvestorSettlementBotTrigger> triggerContracts =
        BotUtil.filterTemplates(
            InvestorSettlementBotTrigger.class,
            ledgerView.getContracts(InvestorSettlementBotTrigger.TEMPLATE_ID));

    // collecting account contracts from the ledger
    Map<String, AccountFact> accountFacts =
        BotUtil.filterTemplates(
            AccountFact.class, ledgerView.getContracts(AccountFact.TEMPLATE_ID));

    // collecting AuctionLockedCash contracts from the ledger
    Map<String, AuctionLockedCash> auctionLockedCash =
        BotUtil.filterTemplates(
            AuctionLockedCash.class, ledgerView.getContracts(AuctionLockedCash.TEMPLATE_ID));

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
      // Do one settlement at a time as we consume the cash asset for settlement
      Map.Entry<String, InvestorSettlementBotTrigger> settlement =
          triggerContracts.entrySet().iterator().next();
      logger.info(
          "Processing InverstorSettlementBotTrigger for " + settlement.getValue().auctionName);

      InvestorSettlementBotTrigger.ContractId triggerCid =
          new InvestorSettlementBotTrigger.ContractId(settlement.getKey());

      // pick a transfer rule
      AssetTransferRule.ContractId transferRule =
          AssetUtil.findTransferRule(
              assetTransferRules, settlement.getValue().cashProvider, logger);

      // pick a splitAndMergeRule
      AssetSplitAndMergeRule.ContractId splitAndMergeRule =
          AssetUtil.findSplitAndMergeRule(
              assetSplitAndMergeRules, settlement.getValue().cashProvider, logger);

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

      // pick a cash account
      List<AccountFact.ContractId> cashAccounts =
          accountFacts.entrySet().stream()
              .filter(
                  cidWithAccount ->
                      cidWithAccount
                          .getValue()
                          .accountId
                          .provider
                          .equals(settlement.getValue().cashProvider))
              .map(cidWithAccount -> new AccountFact.ContractId(cidWithAccount.getKey()))
              .collect(Collectors.toList());
      if (cashAccounts.size() < 1) {
        logger.error(
            "Can't find cash account for InvestorSettlementBotTriggerContractInfo contract");
        throw new IllegalStateException(
            "Can't find cash account for InvestorSettlementBotTriggerContractInfo contract");
      }
      AccountFact.ContractId cashAccount = cashAccounts.iterator().next();

      // pick a bond account
      List<AccountFact.ContractId> assetAccounts =
          accountFacts.entrySet().stream()
              .filter(
                  cidWithAccount ->
                      cidWithAccount
                          .getValue()
                          .accountId
                          .provider
                          .equals(settlement.getValue().bondAccountProvider))
              .map(cidWithAccount -> new AccountFact.ContractId(cidWithAccount.getKey()))
              .collect(Collectors.toList());
      if (assetAccounts.size() < 1) {
        logger.error(
            "Can't find asset account for InvestorSettlementBotTriggerContractInfo contract");
        throw new IllegalStateException(
            "Can't find asset account for InvestorSettlementBotTriggerContractInfo contract");
      }
      AccountFact.ContractId assetAccount = assetAccounts.iterator().next();

      // exercise the choice
      logger.info("Executing InvestorSettlementBotTrigger_Finalize for " + settlement.getKey());
      builder.addCommand(
          triggerCid.exerciseInvestorSettlementBotTrigger_Finalize(
              transferRule, splitAndMergeRule, auctionLockedCashCids, cashAccount, assetAccount));
    }
    return builder.buildFlowable();
  }

  public Template getContractInfo(CreatedContract createdContract) {
    Value args = createdContract.getCreateArguments();
    if (createdContract.getTemplateId().equals(InvestorSettlementBotTrigger.TEMPLATE_ID)) {
      return InvestorSettlementBotTrigger.fromValue(args);
    } else if (createdContract.getTemplateId().equals(AccountFact.TEMPLATE_ID)) {
      return AccountFact.fromValue(args);
    } else if (createdContract.getTemplateId().equals(AuctionLockedCash.TEMPLATE_ID)) {
      return AuctionLockedCash.fromValue(args);
    } else if (createdContract.getTemplateId().equals(AssetTransferRule.TEMPLATE_ID)) {
      return AssetTransferRule.fromValue(args);
    } else if (createdContract.getTemplateId().equals(AssetSplitAndMergeRule.TEMPLATE_ID)) {
      return AssetSplitAndMergeRule.fromValue(args);
    } else {
      logger.error(
          "ERROR: Finalize Settlement Bot encountered an unknown contract of type "
              + createdContract.getTemplateId());
      throw new IllegalStateException(
          "Finalize Settlement Bot encountered an unknown contract of type "
              + createdContract.getTemplateId());
    }
  }
}
