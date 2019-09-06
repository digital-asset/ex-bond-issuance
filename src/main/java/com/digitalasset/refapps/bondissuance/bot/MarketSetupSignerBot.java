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
import da.finance.rule.asset.AssetFungible;
import da.finance.rule.asset.AssetSettlement;
import da.refapps.bond.fixedratebond.FixedRateBondFact;
import da.refapps.bond.roles.issuerrole.CommissionBotTrigger;
import da.refapps.bond.test.marketsetup.MarketSetup;
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
public class MarketSetupSignerBot {

  public final TransactionFilter transactionFilter;
  private final Logger logger;
  private final CommandsAndPendingSetBuilder commandBuilder;
  private final String partyName;

  public MarketSetupSignerBot(TimeManager timeManager, String appId, String partyName) {
    String workflowId = "WORKFLOW-" + partyName + "-MarketSetupSignerBot-" + UUID.randomUUID().toString();
    logger = BotLogger.getLogger(CommissionBot.class, workflowId);
    this.partyName = partyName;

    commandBuilder = new CommandsAndPendingSetBuilder(appId, partyName, workflowId, timeManager);

    Filter messageFilter =
        new InclusiveFilter(
            Sets.newHashSet(
                    MarketSetup.TEMPLATE_ID));

    this.transactionFilter = new FiltersByParty(Collections.singletonMap(partyName, messageFilter));

    logger.info("Startup completed");
  }

  public Flowable<CommandsAndPendingSet> calculateCommands(
      LedgerViewFlowable.LedgerView<Template> ledgerView) {
    // collecting the trigger contracts from the ledger
    Map<String, MarketSetup> marketSetupMap =
        BotUtil.filterTemplates(
                MarketSetup.class, ledgerView.getContracts(MarketSetup.TEMPLATE_ID));

    if (marketSetupMap.size() > 1) {
      throw new IllegalStateException("More than one market setup contracts are visible.");
    }

    // processing trigger contracts
    CommandsAndPendingSetBuilder.Builder builder = commandBuilder.newBuilder();
    for (Map.Entry<String, MarketSetup> marketSetup : marketSetupMap.entrySet()) {
      if (!marketSetup.getValue().signatories.contains(partyName)) {
        MarketSetup.ContractId marketSetupCid = new MarketSetup.ContractId(marketSetup.getKey());
        builder.addCommand(marketSetupCid.exerciseMarketSetup_Sign(partyName));
      }
    }
    return builder.buildFlowable();
  }

  public Template getContractInfo(CreatedContract createdContract) {
    Value args = createdContract.getCreateArguments();
    if (createdContract.getTemplateId().equals(MarketSetup.TEMPLATE_ID)) {
      return MarketSetup.fromValue(args);
    } else {
      String msg =
          "Market Setup Signer Bot encountered an unknown contract of type "
              + createdContract.getTemplateId();
      logger.error(msg);
      throw new IllegalStateException(msg);
    }
  }
}
