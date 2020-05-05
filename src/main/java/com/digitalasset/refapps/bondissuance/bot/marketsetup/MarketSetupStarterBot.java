/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance.bot.marketsetup;

import com.daml.ledger.javaapi.data.*;
import com.daml.ledger.rxjava.CommandSubmissionClient;
import com.daml.ledger.rxjava.components.LedgerViewFlowable;
import com.daml.ledger.rxjava.components.helpers.CommandsAndPendingSet;
import com.daml.ledger.rxjava.components.helpers.CreatedContract;
import com.daml.ledger.rxjava.components.helpers.TemplateUtils;
import com.digitalasset.refapps.bondissuance.util.*;
import com.google.common.collect.Sets;
import da.refapps.bond.test.marketsetup.MarketSetupSignature;
import da.refapps.bond.test.marketsetup.MarketSetupSignatureCreator;
import io.reactivex.Flowable;
import java.util.*;
import java.util.stream.Collectors;
import org.checkerframework.checker.nullness.qual.NonNull;
import org.slf4j.Logger;

/**
 * A bot starting the market setup process by instantiating a market setup contract and ending it by
 * executing its last step (market setup itself, having all the needed signatories).
 */
public class MarketSetupStarterBot {

  private static final int TOTAL_COUNT_OF_PARTIES = 9;

  private final Logger logger;
  private final String partyName;
  private final CommandSubmissionClient client;
  private final String appId;
  private final PartyAllocator.AllParties marketParties;
  private final CommandsAndPendingSetBuilder commandBuilder;
  public final TransactionFilter transactionFilter;

  public MarketSetupStarterBot(
      CommandSubmissionClient client,
      String appId,
      String partyName,
      PartyAllocator.AllParties marketParties) {
    String workflowId =
        "WORKFLOW-" + partyName + "-MarketSetupStarterBot-" + UUID.randomUUID().toString();
    logger = BotLogger.getLogger(MarketSetupStarterBot.class, workflowId);
    this.partyName = partyName;
    this.client = client;
    this.appId = appId;
    this.marketParties = marketParties;
    this.commandBuilder = new CommandsAndPendingSetBuilder(appId, partyName, workflowId);

    Filter messageFilter =
        new InclusiveFilter(
            Sets.newHashSet(
                MarketSetupSignatureCreator.TEMPLATE_ID, MarketSetupSignature.TEMPLATE_ID));
    this.transactionFilter = new FiltersByParty(Collections.singletonMap(partyName, messageFilter));

    logger.info("Startup completed");
  }

  public void startMarketSetup() {
    String cmdId = UUID.randomUUID().toString();
    @NonNull
    List<Command> commands =
        Collections.singletonList(
            MarketSetupSignatureCreator.create(
                marketParties.getOperator(), marketParties.getRegulator(),
                marketParties.getAuctionAgent(), marketParties.getBank1(),
                marketParties.getBank2(), marketParties.getBank3(),
                marketParties.getCSD(), marketParties.getIssuer(),
                marketParties.getCentralBank(), Collections.singletonList(partyName)));
    logger.info("Submitting Market Setup Start command.");
    client.submit("marketSetupWorkflow", appId, cmdId, partyName, commands);
  }

  public Flowable<CommandsAndPendingSet> calculateCommands(
      LedgerViewFlowable.LedgerView<Template> ledgerView) {
    Map<String, MarketSetupSignature> marketSetupSignatureMap =
        BotUtil.filterTemplates(
            MarketSetupSignature.class, ledgerView.getContracts(MarketSetupSignature.TEMPLATE_ID));
    CommandsAndPendingSetBuilder.Builder builder = commandBuilder.newBuilder();

    if (marketSetupSignatureMap.size() == TOTAL_COUNT_OF_PARTIES) {
      Map<String, MarketSetupSignatureCreator> marketSetupSignatureCreatorMap =
          BotUtil.filterTemplates(
              MarketSetupSignatureCreator.class,
              ledgerView.getContracts(MarketSetupSignatureCreator.TEMPLATE_ID));

      if (marketSetupSignatureCreatorMap.size() > 1) {
        throw new IllegalStateException(
            "More than one market setup signature creator contracts are visible.");
      }

      for (Map.Entry<String, MarketSetupSignatureCreator> marketSetupSignatureCreator :
          marketSetupSignatureCreatorMap.entrySet()) {
        MarketSetupSignatureCreator.ContractId marketSetupSignatureCreatorCid =
            new MarketSetupSignatureCreator.ContractId(marketSetupSignatureCreator.getKey());

        List<MarketSetupSignature.ContractId> signatures =
            marketSetupSignatureMap.keySet().stream()
                .map(MarketSetupSignature.ContractId::new)
                .collect(Collectors.toList());
        builder.addCommand(
            marketSetupSignatureCreatorCid.exerciseMarketSetupSignatureCreator_SetupMarket(
                signatures));
      }
    }
    return builder.buildFlowable();
  }

  public Template getContractInfo(CreatedContract createdContract) {
    //noinspection unchecked
    return TemplateUtils.contractTransformer(
            MarketSetupSignature.class, MarketSetupSignatureCreator.class)
        .apply(createdContract);
  }
}
