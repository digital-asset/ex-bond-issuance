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
import com.digitalasset.refapps.bondissuance.util.BotLogger;
import com.digitalasset.refapps.bondissuance.util.BotUtil;
import com.digitalasset.refapps.bondissuance.util.CommandsAndPendingSetBuilder;
import com.google.common.collect.Sets;
import da.refapps.bond.auction.AuctionBid;
import da.refapps.bond.auction.AuctionFinalizeBotTrigger;
import da.refapps.bond.auction.BidderParticipation;
import io.reactivex.Flowable;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import org.slf4j.Logger;

/**
 * An automation bot to exercise the <i>AuctionFinalizeBotTrigger_AllocateBond</i> choice when
 * <i>AuctionFinalizeBotTrigger</i> contracts created on the ledger. It accumulates and filters the
 * necessary parameters.
 */
public class AuctionFinalizeBot {
  public final TransactionFilter transactionFilter;
  private final Logger logger;
  private final CommandsAndPendingSetBuilder commandBuilder;

  public AuctionFinalizeBot(String appId, String partyName) {
    String workflowId =
        "WORKFLOW-" + partyName + "-AuctionFinalizeBot-" + UUID.randomUUID().toString();
    logger = BotLogger.getLogger(AuctionFinalizeBot.class, workflowId);

    commandBuilder = new CommandsAndPendingSetBuilder(appId, partyName, workflowId);

    Filter messageFilter =
        new InclusiveFilter(
            Sets.newHashSet(
                BidderParticipation.TEMPLATE_ID,
                AuctionBid.TEMPLATE_ID,
                AuctionFinalizeBotTrigger.TEMPLATE_ID));

    this.transactionFilter = new FiltersByParty(Collections.singletonMap(partyName, messageFilter));

    logger.info("Startup completed");
  }

  public Flowable<CommandsAndPendingSet> calculateCommands(
      LedgerViewFlowable.LedgerView<Template> ledgerView) {
    // collecting participation contracts from the ledger
    Map<String, BidderParticipation> participationContracts =
        BotUtil.filterTemplates(
            BidderParticipation.class, ledgerView.getContracts(BidderParticipation.TEMPLATE_ID));

    // collecting AuctionBid contracts from the ledger
    Map<String, AuctionBid> bidContracts =
        BotUtil.filterTemplates(AuctionBid.class, ledgerView.getContracts(AuctionBid.TEMPLATE_ID));

    // collecting the trigger contracts from the ledger
    Map<String, AuctionFinalizeBotTrigger> triggerContracts =
        BotUtil.filterTemplates(
            AuctionFinalizeBotTrigger.class,
            ledgerView.getContracts(AuctionFinalizeBotTrigger.TEMPLATE_ID));

    if (triggerContracts.size() > 0) {
      logger.info("Processing, number of triggerContracts: " + triggerContracts.size());
    }

    CommandsAndPendingSetBuilder.Builder builder = commandBuilder.newBuilder();
    for (Map.Entry<String, AuctionFinalizeBotTrigger> e : triggerContracts.entrySet()) {
      AuctionFinalizeBotTrigger.ContractId triggerCid =
          new AuctionFinalizeBotTrigger.ContractId(e.getKey());
      String auctionAgent = e.getValue().auctionAgent;
      String auctionName = e.getValue().auctionName;

      // for all trigger contract we need to find the corresponding participation and bid contracts
      List<BidderParticipation.ContractId> matchingParticipationCids =
          getMatchingParticipationCids(participationContracts, auctionAgent, auctionName);
      List<AuctionBid.ContractId> matchingBidCids =
          getMatchingBidCids(bidContracts, auctionAgent, auctionName);

      // Exercise getAllPartyIDs bond for the participation
      builder.addCommand(
          triggerCid.exerciseAuctionFinalizeBotTrigger_AllocateBond(
              matchingParticipationCids, matchingBidCids));
    }
    return builder.buildFlowable();
  }

  private List<AuctionBid.ContractId> getMatchingBidCids(
      Map<String, AuctionBid> bidContracts, String auctionAgent, String auctionName) {
    return bidContracts.entrySet().stream()
        .filter(
            entry ->
                auctionName.equals(entry.getValue().auctionName)
                    && auctionAgent.equals(entry.getValue().auctionAgent))
        .map(e -> new AuctionBid.ContractId(e.getKey()))
        .collect(Collectors.toList());
  }

  private List<BidderParticipation.ContractId> getMatchingParticipationCids(
      Map<String, BidderParticipation> participationContracts,
      String auctionAgent,
      String auctionName) {
    return participationContracts.entrySet().stream()
        .filter(
            entry ->
                auctionName.equals(entry.getValue().auctionName)
                    && auctionAgent.equals(entry.getValue().auctionAgent))
        .map(e -> new BidderParticipation.ContractId(e.getKey()))
        .collect(Collectors.toList());
  }

  public Template getContractInfo(CreatedContract createdContract) {
    //noinspection unchecked
    return TemplateUtils.contractTransformer(
            AuctionFinalizeBotTrigger.class, BidderParticipation.class, AuctionBid.class)
        .apply(createdContract);
  }
}
