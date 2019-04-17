/**
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance.bot;

import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.APP_ID;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.AUCTION_AGENT;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.AUCTION_NAME;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.BOND_INSTRUMENT_ID;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.CENTRAL_BANK;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.CSD;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.INVESTOR;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.ISSUER;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.OPERATOR;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.TIME_MANAGER;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.USD_INSTRUMENT_ID;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.USD_INSTRUMENT_KEY;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.assertHasSingleExercise;

import com.daml.ledger.javaapi.data.Template;
import com.daml.ledger.rxjava.components.helpers.CommandsAndPendingSet;
import com.digitalasset.refapps.bondissuance.LedgerTestView;
import da.finance.account.fact.AccountFact;
import da.finance.asset.fact.AssetFact;
import da.finance.asset.lock.AssetLockRule;
import da.finance.asset.splitandmerge.AssetSplitAndMergeRule;
import da.finance.asset.transfer.bilateral.AssetTransferRule;
import da.finance.instruments.fixedratebond.FixedRateBondFact;
import da.refapps.bond.auction.AuctionBid;
import da.refapps.bond.auction.AuctionFinalizeBotTrigger;
import da.refapps.bond.auction.BidData;
import da.refapps.bond.auction.BidderParticipation;
import da.refapps.bond.util.BondBundleData;
import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

@RunWith(JUnit4.class)
public class AuctionAllocateBondBotTest {

  private AuctionAllocateBondBot bot;

  @Before
  public void setupTests() {
    bot = new AuctionAllocateBondBot(TIME_MANAGER, APP_ID, AUCTION_AGENT);
  }

  @Test
  public void testInviteAgentTrigger() throws InvocationTargetException, IllegalAccessException {
    List<String> regulators = Collections.emptyList();
    LocalDate startDate = TIME_MANAGER.getLocalDate();
    LocalDate endDate = TIME_MANAGER.getLocalDate();
    Long size = 1000L;

    String isin = "CH0000000012";
    BigDecimal denomination = BigDecimal.valueOf(100);
    BigDecimal rate = BigDecimal.valueOf(0.02);
    Long paymentLag = 1L;
    List<LocalDate> couponDates = Collections.emptyList();
    List<LocalDate> couponDatesTriggered = Collections.emptyList();
    LocalDate issueDate = TIME_MANAGER.getLocalDate();
    LocalDate maturityDate = TIME_MANAGER.getLocalDate();

    FixedRateBondFact fixedRateBondFact =
        new FixedRateBondFact(
            CENTRAL_BANK,
            BOND_INSTRUMENT_ID,
            Collections.emptyList(),
            isin,
            USD_INSTRUMENT_ID,
            denomination,
            rate,
            paymentLag,
            couponDates,
            couponDatesTriggered,
            issueDate,
            maturityDate);

    LedgerTestView<Template> ledgerView = new LedgerTestView<>();
    ledgerView.addActiveContract(
        BidderParticipation.TEMPLATE_ID,
        "participationCid",
        new BidderParticipation(
            INVESTOR,
            AUCTION_AGENT,
            ISSUER,
            OPERATOR,
            CSD,
            regulators,
            startDate,
            endDate,
            size,
            fixedRateBondFact,
            USD_INSTRUMENT_KEY,
            AUCTION_NAME));

    BidData bidData = new BidData(BigDecimal.valueOf(1), 100L, TIME_MANAGER.getTime());
    ledgerView.addActiveContract(
        AuctionBid.TEMPLATE_ID,
        "auctionBidCid",
        new AuctionBid(
            INVESTOR,
            AUCTION_AGENT,
            ISSUER,
            CSD,
            bidData,
            AUCTION_NAME,
            BOND_INSTRUMENT_ID,
            regulators));

    String auctionFinalizeBotTriggerCid = "auctionFinalizeBotTriggerCid";
    BigDecimal minPrice = BigDecimal.valueOf(0.98);
    AccountFact.ContractId issuerCashAccountCid = new AccountFact.ContractId("cid-1");
    AssetFact.ContractId assetFactCid = new AssetFact.ContractId("cid-2");
    AssetSplitAndMergeRule.ContractId assetSplitAndMergeRuleCid =
        new AssetSplitAndMergeRule.ContractId("cid-3");
    AssetTransferRule.ContractId assetTransferRuleCid = new AssetTransferRule.ContractId("cid-4");
    AssetLockRule.ContractId assetLockRuleCid = new AssetLockRule.ContractId("cid-5");
    String assetLabel = "asset-label";

    BondBundleData bondBundleData =
        new BondBundleData(
            assetFactCid,
            assetSplitAndMergeRuleCid,
            assetLockRuleCid,
            assetTransferRuleCid,
            assetLabel);
    List<String> invitedBidders = Collections.singletonList(INVESTOR);
    ledgerView.addActiveContract(
        AuctionFinalizeBotTrigger.TEMPLATE_ID,
        auctionFinalizeBotTriggerCid,
        new AuctionFinalizeBotTrigger(
            AUCTION_AGENT,
            ISSUER,
            regulators,
            minPrice,
            size,
            USD_INSTRUMENT_KEY,
            issuerCashAccountCid,
            bondBundleData,
            invitedBidders,
            AUCTION_NAME));

    CommandsAndPendingSet cmds =
        bot.calculateCommands(ledgerView.getRealLedgerView()).blockingFirst();

    assertHasSingleExercise(
        cmds, auctionFinalizeBotTriggerCid, "AuctionFinalizeBotTrigger_AllocateBond");
  }
}
