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
import com.digitalasset.refapps.bondissuance.util.*;
import com.google.common.collect.Sets;
import da.refapps.bond.fixedratebond.FixedRateBondFact;
import da.finance.rule.asset.AssetFungible;
import da.finance.rule.asset.AssetSettlement;
import da.refapps.bond.roles.issuerrole.CommissionBotTrigger;
import io.reactivex.Flowable;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import org.slf4j.Logger;

/**
 * An automation bot to exercise the <i>CommissionBotTrigger_InviteAgent</i> choice when
 * <i>CommissionBotTrigger</i> contracts created on the ledger. It accumulates and filters the
 * necessary parameters.
 */
public class InviteAgentBot {

  public final TransactionFilter transactionFilter;
  private final Logger logger;
  private final CommandsAndPendingSetBuilder commandBuilder;

  public InviteAgentBot(TimeManager timeManager, String appId, String partyName) {
    String workflowId = "WORKFLOW-" + partyName + "-InviteAgentBot-" + UUID.randomUUID().toString();
    logger = BotLogger.getLogger(InviteAgentBot.class, workflowId);

    commandBuilder = new CommandsAndPendingSetBuilder(appId, partyName, workflowId, timeManager);

    Filter messageFilter =
        new InclusiveFilter(
            Sets.newHashSet(
                CommissionBotTrigger.TEMPLATE_ID,
                FixedRateBondFact.TEMPLATE_ID,
                AssetSettlement.TEMPLATE_ID,
                AssetFungible.TEMPLATE_ID));

    this.transactionFilter = new FiltersByParty(Collections.singletonMap(partyName, messageFilter));

    logger.info("Startup completed");
  }

  public Flowable<CommandsAndPendingSet> calculateCommands(
      LedgerViewFlowable.LedgerView<Template> ledgerView) {
    // collecting the trigger contracts from the ledger
    Map<String, CommissionBotTrigger> commissionBotTriggerCids =
        BotUtil.filterTemplates(
            CommissionBotTrigger.class, ledgerView.getContracts(CommissionBotTrigger.TEMPLATE_ID));

    // collecting bond refdata contracts from the ledger
    Map<String, FixedRateBondFact> fixedRateBondsMap =
        BotUtil.filterTemplates(
            FixedRateBondFact.class, ledgerView.getContracts(FixedRateBondFact.TEMPLATE_ID));

    // collecting settlement contracts from the ledger
    Map<String, AssetSettlement> settlementCids =
        BotUtil.filterTemplates(
            AssetSettlement.class, ledgerView.getContracts(AssetSettlement.TEMPLATE_ID));

    // collecting AssetFungible contracts from the ledger
    Map<String, AssetFungible> fungibleCids =
        BotUtil.filterTemplates(
            AssetFungible.class,
            ledgerView.getContracts(AssetFungible.TEMPLATE_ID));

    if (commissionBotTriggerCids.size() > 0) {
      logger.info(
          "Processing, number of CommissionBotTriggerId Contracts: "
              + commissionBotTriggerCids.size());
    }

    // processing trigger contracts
    CommandsAndPendingSetBuilder.Builder builder = commandBuilder.newBuilder();
    for (Map.Entry<String, CommissionBotTrigger> trigger : commissionBotTriggerCids.entrySet()) {
      CommissionBotTrigger.ContractId triggerCid =
          new CommissionBotTrigger.ContractId(trigger.getKey());

     AssetSettlement.ContractId bondSettlementCid =
          AssetUtil.findAssetSettlement(settlementCids, trigger.getValue().issuerBondAccount.provider, trigger.getValue().issuerBondAccount.owner, logger);

      AssetSettlement.ContractId cashSettlementCid =
          AssetUtil.findAssetSettlement(settlementCids, trigger.getValue().cashAccount.provider, trigger.getValue().cashAccount.owner, logger);
      
      AssetFungible.ContractId bondAssetFungibleCid =
          AssetUtil.findAssetFungible(
              fungibleCids, trigger.getValue().issuerBondAccount.provider, trigger.getValue().issuerBondAccount.owner, logger);

      // find the bond refdata contract
      List<FixedRateBondFact.ContractId> fixedRateBondCids =
          fixedRateBondsMap.entrySet().stream()
              .filter(
                  cidWithBond ->
                      cidWithBond
                          .getValue()
                          .instrumentId
                          .equals(trigger.getValue().bondAssetId))
              .map(cidWithBond -> new FixedRateBondFact.ContractId(cidWithBond.getKey()))
              .collect(Collectors.toList());

      if (fixedRateBondCids.size() < 1) {
        logger.error(
            "Can't find fixed rate bond for instrumentId: " + trigger.getValue().bondAssetId);
        throw new IllegalStateException("Can't find fixed rate bond");
      }
      FixedRateBondFact.ContractId fixedRateBondCid = fixedRateBondCids.iterator().next();

      // exercise choice
      builder.addCommand(
          triggerCid.exerciseCommissionBotTrigger_InviteAgent(
              bondAssetFungibleCid, bondSettlementCid, cashSettlementCid, fixedRateBondCid));
    }
    return builder.buildFlowable();
  }

  public Template getContractInfo(CreatedContract createdContract) {
    Value args = createdContract.getCreateArguments();
    if (createdContract.getTemplateId().equals(CommissionBotTrigger.TEMPLATE_ID)) {
      return CommissionBotTrigger.fromValue(args);
    } else if (createdContract.getTemplateId().equals(FixedRateBondFact.TEMPLATE_ID)) {
      return FixedRateBondFact.fromValue(args);
    } else if (createdContract.getTemplateId().equals(AssetSettlement.TEMPLATE_ID)) {
      return AssetSettlement.fromValue(args);
    } else if (createdContract.getTemplateId().equals(AssetFungible.TEMPLATE_ID)) {
      return AssetFungible.fromValue(args);
    } else {
      String msg =
          "Invite Agent Bot encountered an unknown contract of type "
              + createdContract.getTemplateId();
      logger.error(msg);
      throw new IllegalStateException(msg);
    }
  }
}
