/**
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance.bot;

import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.APP_ID;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.AUCTION_AGENT;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.AUCTION_NAME;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.BOND_ID;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.CASH_ID;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.CENTRAL_BANK;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.INVESTOR;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.ISSUER;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.OPERATOR;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.TIME_MANAGER;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.assertHasSingleExercise;

import com.daml.ledger.javaapi.data.Template;
import com.daml.ledger.rxjava.components.helpers.CommandsAndPendingSet;
import com.digitalasset.refapps.bondissuance.LedgerTestView;
import da.finance.fact.asset.AssetDeposit;
import da.finance.rule.asset.AssetFungible;
import da.finance.rule.asset.AssetSettlement;
import da.finance.types.Id;
import da.refapps.bond.auction.AuctionBid;
import da.refapps.bond.auction.AuctionFinalizeBotTrigger;
import da.refapps.bond.auction.BidData;
import da.refapps.bond.auction.BidderParticipation;
import da.refapps.bond.fixedratebond.FixedRateBondFact;
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
public class AuctionFinalizeBotTest {

  private AuctionFinalizeBot bot;

  @Before
  public void setupTests() {
    bot = new AuctionFinalizeBot(APP_ID, AUCTION_AGENT);
  }

  @Test
  public void testTrigger() throws InvocationTargetException, IllegalAccessException {
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
            BOND_ID,
            Collections.emptyList(),
            isin,
            CASH_ID,
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
            regulators,
            startDate,
            endDate,
            size,
            fixedRateBondFact,
            CASH_ID,
            CENTRAL_BANK,
            AUCTION_NAME));

    BidData bidData = new BidData(BigDecimal.valueOf(1), 100L, TIME_MANAGER.getTime());
    AssetSettlement.ContractId assetSettlementCid =
        new AssetSettlement.ContractId("assetSettlementCid");

    ledgerView.addActiveContract(
        AuctionBid.TEMPLATE_ID,
        "auctionBidCid",
        new AuctionBid(
            INVESTOR,
            AUCTION_AGENT,
            ISSUER,
            bidData,
            AUCTION_NAME,
            BOND_ID,
            assetSettlementCid,
            regulators));

    String auctionFinalizeBotTriggerCid = "auctionFinalizeBotTriggerCid";
    BigDecimal minPrice = BigDecimal.valueOf(0.98);
    AssetDeposit.ContractId assetDepositCid = new AssetDeposit.ContractId("assetDepositCid");
    AssetFungible.ContractId assetFungibleCid = new AssetFungible.ContractId("assetFungibleCid");
    AssetSettlement.ContractId bondSettlementCid =
        new AssetSettlement.ContractId("bondSettlementCid");
    AssetSettlement.ContractId cashSettlementCid =
        new AssetSettlement.ContractId("cashSettlementCid");
    String assetLabel = "asset-label";

    BondBundleData bondBundleData =
        new BondBundleData(
            assetDepositCid, assetFungibleCid, bondSettlementCid, cashSettlementCid, assetLabel);
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
            CENTRAL_BANK,
            bondBundleData,
            new Id(new da.next.set.Set(Collections.emptyMap()), "USD", 1L),
            invitedBidders,
            AUCTION_NAME));

    CommandsAndPendingSet cmds =
        bot.calculateCommands(ledgerView.getRealLedgerView()).blockingFirst();

    assertHasSingleExercise(
        cmds, auctionFinalizeBotTriggerCid, "AuctionFinalizeBotTrigger_AllocateBond");
  }
}
