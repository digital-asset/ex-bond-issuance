/**
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance.bot;

import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.APP_ID;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.AUCTION_AGENT;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.AUCTION_NAME;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.CASH_ASSET;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.CENTRAL_BANK;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.INVESTOR;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.INVESTOR_CASH_ACCOUNT;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.ISSUER;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.TIME_MANAGER;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.assertHasSingleExercise;

import com.daml.ledger.javaapi.data.Template;
import com.daml.ledger.rxjava.components.helpers.CommandsAndPendingSet;
import com.digitalasset.refapps.bondissuance.LedgerTestView;
import da.finance.fact.asset.AssetDeposit;
import da.finance.rule.asset.AssetFungible;
import da.finance.rule.asset.AssetSettlement;
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
public class InvestorSettlementBotTest {

  private InvestorSettlementBot bot;

  @Before
  public void setupTests() {
    bot = new InvestorSettlementBot(APP_ID, INVESTOR);
  }

  @Test
  public void testTrigger() throws InvocationTargetException, IllegalAccessException {
    LedgerTestView<Template> ledgerView = new LedgerTestView<>();
    String investorSettlementBotTriggerCid = "investorSettlementBotTriggerCid";
    List<AuctionSettleRequest.ContractId> settleRequestCids = Collections.emptyList();

    ledgerView.addActiveContract(
        AuctionLockedCash.TEMPLATE_ID,
        "auctionLockedCashCid",
        new AuctionLockedCash(
            INVESTOR,
            AUCTION_AGENT,
            AUCTION_NAME,
            new AssetDeposit(INVESTOR_CASH_ACCOUNT, CASH_ASSET, null),
            INVESTOR_CASH_ACCOUNT,
            Collections.emptyList()));

    ledgerView.addActiveContract(
        AssetFungible.TEMPLATE_ID,
        "assetFungibleCid",
        new AssetFungible(INVESTOR_CASH_ACCOUNT, null));

    ledgerView.addActiveContract(
        AssetSettlement.TEMPLATE_ID,
        "assetSettlementCid",
        new AssetSettlement(INVESTOR_CASH_ACCOUNT, null));

    ledgerView.addActiveContract(
        InvestorSettlementBotTrigger.TEMPLATE_ID,
        investorSettlementBotTriggerCid,
        new InvestorSettlementBotTrigger(
            INVESTOR,
            ISSUER,
            AUCTION_AGENT,
            AUCTION_NAME,
            settleRequestCids,
            CENTRAL_BANK,
            Collections.emptyList()));

    CommandsAndPendingSet cmds =
        bot.calculateCommands(ledgerView.getRealLedgerView()).blockingFirst();
    assertHasSingleExercise(
        cmds, investorSettlementBotTriggerCid, "InvestorSettlementBotTrigger_Finalize");
  }
}
