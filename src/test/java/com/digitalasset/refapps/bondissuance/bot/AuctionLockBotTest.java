/**
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance.bot;

import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.APP_ID;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.AUCTION_AGENT;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.AUCTION_NAME;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.BOND_ID;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.CENTRAL_BANK;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.CSD;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.INVESTOR;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.ISSUER;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.TIME_MANAGER;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.USD_INSTRUMENT_KEY;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.addUsdIntoNewAccount;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.assertHasSingleExercise;

import com.daml.ledger.javaapi.data.Template;
import com.daml.ledger.rxjava.components.helpers.CommandsAndPendingSet;
import com.digitalasset.refapps.bondissuance.LedgerTestView;
import da.finance.asset.fact.AssetFact;
import da.finance.asset.lock.AssetLockRule;
import da.finance.asset.splitandmerge.AssetSplitAndMergeRule;
import da.refapps.bond.auction.AuctionBid;
import da.refapps.bond.auction.BidData;
import da.refapps.bond.auction.PlaceBidBotTrigger;
import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Collections;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

@RunWith(JUnit4.class)
public class AuctionLockBotTest {
//
//  private AuctionLockBot bot;
//
//  @Before
//  public void setupTests() {
//    bot = new AuctionLockBot(TIME_MANAGER, APP_ID, INVESTOR);
//  }
//
  @Test
  public void testInviteAgentTrigger() throws InvocationTargetException, IllegalAccessException {
//    LedgerTestView<Template> ledgerView = new LedgerTestView<>();
//    ledgerView.addActiveContract(
//        AssetFact.TEMPLATE_ID,
//        "assetFactCid",
//        addUsdIntoNewAccount(new BigDecimal(10000000), INVESTOR, "InvestorCashAccount"));
//
//    ledgerView.addActiveContract(
//        AssetLockRule.TEMPLATE_ID,
//        "assetLockRuleCid",
//        new AssetLockRule(CENTRAL_BANK, INVESTOR, Collections.emptyList()));
//    ledgerView.addActiveContract(
//        AssetSplitAndMergeRule.TEMPLATE_ID,
//        "assetSplitAndMergeRuleCid",
//        new AssetSplitAndMergeRule(CENTRAL_BANK, INVESTOR, Collections.emptyList()));
//    String placeBidBotTriggerCid = "placeBidBotTriggerCid";
//    BidData bidData = new BidData(BigDecimal.valueOf(0.98), 100L, Instant.now());
//    ledgerView.addActiveContract(
//        PlaceBidBotTrigger.TEMPLATE_ID,
//        placeBidBotTriggerCid,
//        new PlaceBidBotTrigger(
//            new AuctionBid(
//                INVESTOR,
//                AUCTION_AGENT,
//                ISSUER,
//                CSD,
//                bidData,
//                AUCTION_NAME,
//                BOND_ID,
//                Collections.emptyList()),
//            USD_INSTRUMENT_KEY,
//            Collections.emptyList()));
//
//    CommandsAndPendingSet cmds =
//        bot.calculateCommands(ledgerView.getRealLedgerView()).blockingFirst();
//
//    assertHasSingleExercise(cmds, placeBidBotTriggerCid, "PlaceBidBotTrigger_LockCash");
  }
}
