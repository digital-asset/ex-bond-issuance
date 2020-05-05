/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance.bot;

import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.*;
import static org.junit.Assert.*;

import com.daml.ledger.javaapi.data.Command;
import com.daml.ledger.javaapi.data.Template;
import com.daml.ledger.rxjava.CommandSubmissionClient;
import com.daml.ledger.rxjava.components.helpers.CommandsAndPendingSet;
import com.digitalasset.refapps.bondissuance.LedgerTestView;
import com.digitalasset.refapps.bondissuance.bot.marketsetup.MarketSetupSignerBot;
import com.digitalasset.refapps.bondissuance.bot.marketsetup.MarketSetupStarterBot;
import com.digitalasset.refapps.bondissuance.util.PartyAllocator;
import com.google.protobuf.Empty;
import da.refapps.bond.test.marketsetup.MarketSetupSignature;
import da.refapps.bond.test.marketsetup.MarketSetupSignatureCreator;
import io.reactivex.Single;
import java.lang.reflect.InvocationTargetException;
import java.time.Duration;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.checkerframework.checker.nullness.qual.NonNull;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

@RunWith(JUnit4.class)
public class MarketSetupStarterBotTest {

  private MarketSetupStarterBot marketSetupBot;
  private final String BANK1 = "bank1";
  private final ConcurrentLinkedQueue<List<Command>> sentIn = new ConcurrentLinkedQueue<>();

  @Before
  public void setupTests() {
    CommandSubmissionClient client =
        new CommandSubmissionClient() {
          {
            sentIn.clear();
          }

          @Override
          public Single<Empty> submit(
              @NonNull String workflowId,
              @NonNull String applicationId,
              @NonNull String commandId,
              @NonNull String party,
              @NonNull Optional<Instant> minLedgerTimeAbs,
              @NonNull Optional<Duration> minLedgerTimeRel,
              @NonNull Optional<Duration> deduplicationTime,
              @NonNull List<Command> commands) {
            return null;
          }

          @Override
          public Single<Empty> submit(
              @NonNull String workflowId,
              @NonNull String applicationId,
              @NonNull String commandId,
              @NonNull String party,
              @NonNull Optional<Instant> minLedgerTimeAbs,
              @NonNull Optional<Duration> minLedgerTimeRel,
              @NonNull Optional<Duration> deduplicationTime,
              @NonNull List<Command> commands,
              @NonNull String accessToken) {
            return null;
          }

          @Override
          public Single<Empty> submit(
              String workflowId,
              String applicationId,
              String commandId,
              String party,
              List<Command> commands) {
            sentIn.add(commands);
            return Single.just(Empty.getDefaultInstance());
          }

          @Override
          public Single<Empty> submit(
              String workflowId,
              String applicationId,
              String commandId,
              String party,
              List<Command> commands,
              String accessToken) {
            throw new UnsupportedOperationException(
                "This method should be in use in this test and thus throwing an exception should not cause problems.");
          }
        };
    Map<String, String> parties =
        Arrays.stream(
                new String[] {
                  "operator",
                  "regulator",
                  "auctionAgent",
                  BANK1,
                  "bank2",
                  "bank3",
                  "CSD",
                  "issuer",
                  "centralBank"
                })
            .collect(Collectors.toMap(Function.identity(), Function.identity()));
    PartyAllocator.AllParties marketParties = new PartyAllocator.AllParties(parties);
    marketSetupBot = new MarketSetupStarterBot(client, APP_ID, OPERATOR, marketParties);
  }

  private void addActiveMarketSetupSignatureCreatorContract(
      LedgerTestView<Template> ledgerView, String marketSetupCid, List<String> signatories)
      throws InvocationTargetException, IllegalAccessException {
    ledgerView.addActiveContract(
        MarketSetupSignatureCreator.TEMPLATE_ID,
        marketSetupCid,
        new MarketSetupSignatureCreator(
            OPERATOR,
            "regulator",
            "auctionAgent",
            BANK1,
            "bank2",
            "bank3",
            "CSD",
            "issuer",
            "centralBank",
            signatories));
  }

  @Test
  public void testBotSendsInCommand() throws InvocationTargetException, IllegalAccessException {
    marketSetupBot.startMarketSetup();
    assertEquals(1, sentIn.size());
    List<Command> commands = sentIn.poll();
    assertEquals(1, commands.size());
    Command firstCommand = commands.get(0);
    assertTrue(firstCommand.asCreateCommand().isPresent());
    assertEquals(
        "MarketSetupSignatureCreator",
        firstCommand.asCreateCommand().get().getTemplateId().getEntityName());
  }

  @Test
  public void testMarketSetupCompletes() throws InvocationTargetException, IllegalAccessException {
    MarketSetupSignerBot signerBot = new MarketSetupSignerBot(APP_ID, BANK1);

    marketSetupBot.startMarketSetup();
    assertEquals(1, sentIn.size());

    LedgerTestView<Template> ledgerView = new LedgerTestView<>();
    String marketSetupCid = "marketSetupCid";
    addActiveMarketSetupSignatureCreatorContract(
        ledgerView, marketSetupCid, Collections.singletonList(OPERATOR));

    try {
      marketSetupBot.calculateCommands(ledgerView.getRealLedgerView()).blockingFirst();
      fail("No commands should have been generated by Market Setup bot at this point.");
    } catch (NoSuchElementException e) {
    }
    ;
    signerBot.calculateCommands(ledgerView.getRealLedgerView()).blockingFirst();

    ledgerView = new LedgerTestView<>();
    marketSetupCid = "marketSetupCid2";
    addActiveMarketSetupSignatureCreatorContract(
        ledgerView, marketSetupCid, Arrays.asList(OPERATOR));
    for (int i = 0; i < 9; i++) {
      String party = "Party-" + i;
      ledgerView.addActiveContract(
          MarketSetupSignature.TEMPLATE_ID,
          "someSignatureCid" + party,
          new MarketSetupSignature(OPERATOR, party));
    }
    CommandsAndPendingSet cmds =
        marketSetupBot.calculateCommands(ledgerView.getRealLedgerView()).blockingFirst();

    assertHasSingleExercise(cmds, marketSetupCid, "MarketSetupSignatureCreator_SetupMarket");
  }

  @Test
  public void testBotSigns() throws InvocationTargetException, IllegalAccessException {
    MarketSetupSignerBot bot2 = new MarketSetupSignerBot(APP_ID, BANK1);
    LedgerTestView<Template> ledgerView = new LedgerTestView<>();

    String marketSetupCid = "marketSetupCid";
    addActiveMarketSetupSignatureCreatorContract(
        ledgerView, marketSetupCid, Collections.singletonList(OPERATOR));

    CommandsAndPendingSet cmds =
        bot2.calculateCommands(ledgerView.getRealLedgerView()).blockingFirst();

    assertHasSingleExercise(cmds, marketSetupCid, "MarketSetupSignatureCreator_CreateSignature");
  }

  @Test(expected = NoSuchElementException.class)
  public void testBotSignsOnlyOnce() throws InvocationTargetException, IllegalAccessException {
    MarketSetupSignerBot bot2 = new MarketSetupSignerBot(APP_ID, BANK1);
    LedgerTestView<Template> ledgerView = new LedgerTestView<>();

    String marketSetupCid = "marketSetupCid";
    addActiveMarketSetupSignatureCreatorContract(
        ledgerView, marketSetupCid, Arrays.asList(OPERATOR, BANK1));
    ledgerView.addActiveContract(
        MarketSetupSignature.TEMPLATE_ID,
        "someSignatureCid1",
        new MarketSetupSignature(OPERATOR, BANK1));

    bot2.calculateCommands(ledgerView.getRealLedgerView()).blockingFirst();
  }
}
