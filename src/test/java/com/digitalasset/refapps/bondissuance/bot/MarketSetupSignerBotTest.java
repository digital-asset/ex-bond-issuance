/**
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance.bot;

import com.daml.ledger.javaapi.data.Template;
import com.daml.ledger.rxjava.components.helpers.CommandsAndPendingSet;
import com.digitalasset.refapps.bondissuance.LedgerTestView;
import da.finance.fact.asset.AssetDeposit;
import da.finance.rule.asset.AssetFungible;
import da.finance.rule.asset.AssetSettlement;
import da.refapps.bond.auction.BidData;
import da.refapps.bond.auction.PlaceBidBotTrigger;
import da.refapps.bond.lock.AssetLockRule;
import da.refapps.bond.test.marketsetup.MarketSetup;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Collections;
import java.util.NoSuchElementException;

import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.*;

@RunWith(JUnit4.class)
public class MarketSetupSignerBotTest {

  private MarketSetupSignerBot bot;
  private final String BANK1 = "bank1";

  @Before
  public void setupTests() {
    bot = new MarketSetupSignerBot(TIME_MANAGER, APP_ID, BANK1);
  }

  @Test
  public void testBotSigns() throws InvocationTargetException, IllegalAccessException {
    LedgerTestView<Template> ledgerView = new LedgerTestView<>();

    String marketSetupCid = "marketSetupCid";
    ledgerView.addActiveContract(
        MarketSetup.TEMPLATE_ID,
        marketSetupCid,
        new MarketSetup("operator", "regulator", "auctionAgent", BANK1,
                  "bank2", "bank3", "csd", "issuer", "centralBank",
                        Collections.emptyList()));

    CommandsAndPendingSet cmds =
        bot.calculateCommands(ledgerView.getRealLedgerView()).blockingFirst();

    assertHasSingleExercise(cmds, marketSetupCid, "MarketSetup_Sign");
  }

  @Test(expected = NoSuchElementException.class)
  public void testBotSignsOnlyOnce() throws InvocationTargetException, IllegalAccessException {
    LedgerTestView<Template> ledgerView = new LedgerTestView<>();

    String marketSetupCid = "marketSetupCid";
    ledgerView.addActiveContract(
            MarketSetup.TEMPLATE_ID,
            marketSetupCid,
            new MarketSetup("operator", "regulator", "auctionAgent", BANK1,
                    "bank2", "bank3", "csd", "issuer", "centralBank",
                    Collections.singletonList(BANK1)));

    bot.calculateCommands(ledgerView.getRealLedgerView()).blockingFirst();
  }
}
