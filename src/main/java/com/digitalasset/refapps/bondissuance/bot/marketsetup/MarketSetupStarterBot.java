/**
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance.bot.marketsetup;

import com.daml.ledger.javaapi.data.*;
import com.daml.ledger.rxjava.CommandSubmissionClient;
import com.daml.ledger.rxjava.components.LedgerViewFlowable;
import com.daml.ledger.rxjava.components.helpers.CommandsAndPendingSet;
import com.daml.ledger.rxjava.components.helpers.CreatedContract;
import com.digitalasset.refapps.bondissuance.bot.marketsetup.data.MarketParties;
import com.digitalasset.refapps.bondissuance.util.*;
import com.google.common.collect.Sets;
import da.refapps.bond.test.marketsetup.MarketSetup;
import io.reactivex.Flowable;
import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.checkerframework.checker.nullness.qual.NonNull;
import org.slf4j.Logger;

/**
 * A bot starting the market setup process by instantiating a market setup contract and ending it by
 * executing its last step (market setup itself, having all the needed signatories).
 */
public class MarketSetupStarterBot {

  public static final int MRT = 15;
  private final Logger logger;
  private final String partyName;
  private final CommandSubmissionClient client;
  private final String appId;
  private final MarketParties marketParties;
  private final TimeManager timeManager;
  private final CommandsAndPendingSetBuilder commandBuilder;
  public final TransactionFilter transactionFilter;
  private MarketSetupSignerBot.MarketSetupSignerBotGroup signerBotGroup;

  public MarketSetupStarterBot(
      TimeManager timeManager,
      CommandSubmissionClient client,
      String appId,
      String partyName,
      MarketParties marketParties) {
    String workflowId =
        "WORKFLOW-" + partyName + "-MarketSetupStarterBot-" + UUID.randomUUID().toString();
    logger = BotLogger.getLogger(MarketSetupStarterBot.class, workflowId);
    this.partyName = partyName;
    this.client = client;
    this.appId = appId;
    this.marketParties = marketParties;
    this.timeManager = timeManager;
    this.commandBuilder =
        new CommandsAndPendingSetBuilder(appId, partyName, workflowId, timeManager);

    Filter messageFilter = new InclusiveFilter(Sets.newHashSet(MarketSetup.TEMPLATE_ID));
    this.transactionFilter = new FiltersByParty(Collections.singletonMap(partyName, messageFilter));

    logger.info("Startup completed");
  }

  public MarketSetupSignerBot addNextSignerBot(String partyName) {
    if (signerBotGroup == null) {
      int operatorIsOnlySignatoryYet = 1;
      signerBotGroup =
          new MarketSetupSignerBot.MarketSetupSignerBotGroup(
              timeManager, appId, operatorIsOnlySignatoryYet);
    }
    return signerBotGroup.addNextSignerBot(partyName);
  }

  public void startMarketSetup() {
    String cmdId = UUID.randomUUID().toString();
    @NonNull
    List<Command> commands =
        Collections.singletonList(
            MarketSetup.create(
                marketParties.operator, marketParties.regulator,
                marketParties.auctionAgent, marketParties.bank1,
                marketParties.bank2, marketParties.bank3,
                marketParties.csd, marketParties.issuer,
                marketParties.centralBank, Collections.singletonList(partyName)));
    Instant time = timeManager.getTime();
    client.submit(
        "marketSetupWorkflow", appId, cmdId, partyName, time, time.plusSeconds(MRT), commands);
  }

  public Flowable<CommandsAndPendingSet> calculateCommands(
      LedgerViewFlowable.LedgerView<Template> ledgerView) {
    // tell cpd to start ignoring code - CPD-OFF
    Map<String, MarketSetup> marketSetupMap =
        BotUtil.filterTemplates(
            MarketSetup.class, ledgerView.getContracts(MarketSetup.TEMPLATE_ID));

    if (marketSetupMap.size() > 1) {
      throw new IllegalStateException("More than one market setup contracts are visible.");
    }

    CommandsAndPendingSetBuilder.Builder builder = commandBuilder.newBuilder();
    for (Map.Entry<String, MarketSetup> marketSetup : marketSetupMap.entrySet()) {
      // Only send command if every bot in the group signed the contract
      if (marketSetup.getValue().signatories.size() == signerBotGroup.getBotNumber()) {
        MarketSetup.ContractId marketSetupCid = new MarketSetup.ContractId(marketSetup.getKey());
        builder.addCommand(marketSetupCid.exerciseMarketSetup_SetupMarket());
      }
    }
    return builder.buildFlowable();
    // - CPD-ON
  }

  public Template getContractInfo(CreatedContract createdContract) {
    Value args = createdContract.getCreateArguments();
    if (createdContract.getTemplateId().equals(MarketSetup.TEMPLATE_ID)) {
      return MarketSetup.fromValue(args);
    } else {
      String msg =
          "Market Setup Starter Bot encountered an unknown contract of type "
              + createdContract.getTemplateId();
      logger.error(msg);
      throw new IllegalStateException(msg);
    }
  }
}
