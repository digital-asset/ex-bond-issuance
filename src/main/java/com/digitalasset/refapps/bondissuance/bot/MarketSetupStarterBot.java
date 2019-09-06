/**
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance.bot;

import com.daml.ledger.javaapi.data.*;
import com.daml.ledger.rxjava.CommandSubmissionClient;
import com.daml.ledger.rxjava.DamlLedgerClient;
import com.digitalasset.refapps.bondissuance.bot.data.MarketParties;
import com.digitalasset.refapps.bondissuance.util.*;
import da.refapps.bond.test.marketsetup.MarketSetup;

import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

import org.checkerframework.checker.nullness.qual.NonNull;
import org.slf4j.Logger;

/**
 * An automation bot to exercise the <i>CommissionBotTrigger_InviteAgent</i> choice when
 * <i>CommissionBotTrigger</i> contracts created on the ledger. It accumulates and filters the
 * necessary parameters.
 */
public class MarketSetupStarterBot {

  public static final int MRT = 15;
  private final Logger logger;
  private final String partyName;
  private final CommandSubmissionClient client;
  private final String appId;
  private final MarketParties marketParties;
  private final TimeManager timeManager;

  public MarketSetupStarterBot(TimeManager timeManager, CommandSubmissionClient client, String appId, String partyName, MarketParties marketParties) {
    String workflowId = "WORKFLOW-" + partyName + "-MarketSetupStarterBot-" + UUID.randomUUID().toString();
    logger = BotLogger.getLogger(CommissionBot.class, workflowId);
    this.partyName = partyName;
    this.client = client;
    this.appId = appId;
    this.marketParties = marketParties;
    this.timeManager = timeManager;

    logger.info("Startup completed");
  }

  public void startMarketSetup() {
    String cmdId = UUID.randomUUID().toString();
    @NonNull List<Command> commands =
            Collections.singletonList(MarketSetup.create(
                    marketParties.operator, marketParties.regulator,
                    marketParties.auctionAgent, marketParties.bank1,
                    marketParties.bank2, marketParties.bank3,
                    marketParties.csd, marketParties.issuer,
                    marketParties.centralBank, Collections.singletonList(partyName)));
    Instant time = timeManager.getTime();
    client.submit("marketSetupWorkflow", appId,
                    cmdId, partyName, time,
                    time.plusSeconds(MRT), commands);
  }
}
