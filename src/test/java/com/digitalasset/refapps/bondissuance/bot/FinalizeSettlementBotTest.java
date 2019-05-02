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
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.assertHasSingleExercise;

import com.daml.ledger.javaapi.data.Template;
import com.daml.ledger.rxjava.components.helpers.CommandsAndPendingSet;
import com.digitalasset.refapps.bondissuance.LedgerTestView;
import da.refapps.bond.lock.AuctionLockedCash;
import da.refapps.bond.settlement.AuctionSettleRequest;
import da.refapps.bond.settlement.InvestorSettlementBotTrigger;
import java.lang.reflect.InvocationTargetException;
import java.util.Collections;
import java.util.List;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

@RunWith(JUnit4.class)
public class FinalizeSettlementBotTest {
//
//  private FinalizeSettlementBot bot;
//
//  @Before
//  public void setupTests() {
//    bot = new FinalizeSettlementBot(TIME_MANAGER, APP_ID, INVESTOR);
//  }
//
  @Test
  public void testInviteAgentTrigger() throws InvocationTargetException, IllegalAccessException {
//    LedgerTestView<Template> ledgerView = new LedgerTestView<>();
//    AssetLockedFact.ContractId lockedCashAssetCid = new AssetLockedFact.ContractId("cid-1");
//    String investorSettlementBotTriggerCid = "investorSettlementBotTriggerCid";
//    List<AuctionSettleRequest.ContractId> settleRequestCids = Collections.emptyList();
//
//    ledgerView.addActiveContract(
//        AccountFact.TEMPLATE_ID,
//        "assetAcountFactCid",
//        new AccountFact(new AccountId(CSD, "acct1", INVESTOR), Collections.emptyList()));
//    ledgerView.addActiveContract(
//        AccountFact.TEMPLATE_ID,
//        "cashAccountFactCid",
//        new AccountFact(new AccountId(CENTRAL_BANK, "acct2", INVESTOR), Collections.emptyList()));
//
//    ledgerView.addActiveContract(
//        AuctionLockedCash.TEMPLATE_ID,
//        "auctionLockedCashCid",
//        new AuctionLockedCash(
//            INVESTOR, AUCTION_AGENT, AUCTION_NAME, lockedCashAssetCid, Collections.emptyList()));
//    ledgerView.addActiveContract(
//        AssetTransferRule.TEMPLATE_ID,
//        "assetTransferRuleCid",
//        new AssetTransferRule(CENTRAL_BANK, INVESTOR, Collections.emptyList()));
//    ledgerView.addActiveContract(
//        AssetSplitAndMergeRule.TEMPLATE_ID,
//        "assetSplitAndMergeRuleCid",
//        new AssetSplitAndMergeRule(CENTRAL_BANK, INVESTOR, Collections.emptyList()));
//
//    ledgerView.addActiveContract(
//        InvestorSettlementBotTrigger.TEMPLATE_ID,
//        investorSettlementBotTriggerCid,
//        new InvestorSettlementBotTrigger(
//            INVESTOR,
//            ISSUER,
//            CSD,
//            AUCTION_AGENT,
//            AUCTION_NAME,
//            settleRequestCids,
//            CENTRAL_BANK,
//            BOND_ID,
//            Collections.emptyList()));
//
//    CommandsAndPendingSet cmds =
//        bot.calculateCommands(ledgerView.getRealLedgerView()).blockingFirst();
//    assertHasSingleExercise(
//        cmds, investorSettlementBotTriggerCid, "InvestorSettlementBotTrigger_Finalize");
  }
}
