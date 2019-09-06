/**
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance.bot;

import com.daml.ledger.javaapi.data.Command;
import com.daml.ledger.javaapi.data.Template;
import com.daml.ledger.rxjava.CommandSubmissionClient;
import com.daml.ledger.rxjava.components.helpers.CommandsAndPendingSet;
import com.digitalasset.refapps.bondissuance.LedgerTestView;
import com.digitalasset.refapps.bondissuance.bot.data.MarketParties;
import com.google.protobuf.Empty;
import da.finance.fact.asset.AssetDeposit;
import da.finance.rule.asset.AssetFungible;
import da.finance.rule.asset.AssetSettlement;
import da.refapps.bond.auction.BidData;
import da.refapps.bond.auction.PlaceBidBotTrigger;
import da.refapps.bond.lock.AssetLockRule;
import da.refapps.bond.test.marketsetup.MarketSetup;
import io.reactivex.Single;
import org.checkerframework.checker.nullness.qual.NonNull;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.ConcurrentSkipListSet;

import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.*;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

@RunWith(JUnit4.class)
public class MarketSetupStarterBotTest {

  private MarketSetupStarterBot bot;
  private final String BANK1 = "bank1";
  private final ConcurrentLinkedQueue<List<Command>> sentIn = new ConcurrentLinkedQueue<>();

  @Before
  public void setupTests() {
    CommandSubmissionClient client = new CommandSubmissionClient() {
      @Override
      public Single<Empty> submit(String workflowId, String applicationId, String commandId,
                                  String party, Instant ledgerEffectiveTime,
                                  Instant maximumRecordTime, List<Command> commands) {
        sentIn.add(commands);
        return Single.just(Empty.getDefaultInstance());
      }
    };
    MarketParties marketParties =
            new MarketParties("operator", "regulator", "auctionAgent", BANK1,
                      "bank2", "bank3", "csd", "issuer", "centralBank");
    bot = new MarketSetupStarterBot(TIME_MANAGER, client, APP_ID, BANK1, marketParties);
  }

  @Test
  public void testBotHasSentInCommand() throws InvocationTargetException, IllegalAccessException {
    bot.startMarketSetup();
    assertEquals(1, sentIn.size());
    List<Command> commands = sentIn.poll();
    assertEquals(1, commands.size());
    Command firstCommand = commands.get(0);
    assertTrue(firstCommand.asCreateCommand().isPresent());
    assertEquals("MarketSetup", firstCommand.asCreateCommand().get().getTemplateId().getEntityName());
  }
}
