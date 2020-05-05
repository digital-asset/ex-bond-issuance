/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance.bot;

import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.*;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.assertHasSingleExercise;

import com.daml.ledger.javaapi.data.Template;
import com.daml.ledger.rxjava.components.helpers.CommandsAndPendingSet;
import com.digitalasset.refapps.bondissuance.LedgerTestView;
import da.finance.fact.asset.AssetDeposit;
import da.finance.rule.asset.AssetFungible;
import da.finance.rule.asset.AssetSettlement;
import da.refapps.bond.auction.BidData;
import da.refapps.bond.auction.PlaceBidBotTrigger;
import da.refapps.bond.lock.AssetLockRule;
import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Collections;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

@RunWith(JUnit4.class)
public class PlaceBidBotTest {

  private PlaceBidBot bot;

  @Before
  public void setupTests() {
    bot = new PlaceBidBot(APP_ID, INVESTOR);
  }

  @Test
  public void testTrigger() throws InvocationTargetException, IllegalAccessException {
    LedgerTestView<Template> ledgerView = new LedgerTestView<>();

    ledgerView.addActiveContract(
        AssetDeposit.TEMPLATE_ID,
        "assetDepositCid",
        new AssetDeposit(INVESTOR_CASH_ACCOUNT, CASH_ASSET, null));

    ledgerView.addActiveContract(
        AssetLockRule.TEMPLATE_ID,
        "assetLockRuleCid",
        new AssetLockRule(INVESTOR_CASH_ACCOUNT, null));

    ledgerView.addActiveContract(
        AssetFungible.TEMPLATE_ID,
        "assetFungibleCid",
        new AssetFungible(INVESTOR_CASH_ACCOUNT, null));

    ledgerView.addActiveContract(
        AssetSettlement.TEMPLATE_ID,
        "assetSettlementCid",
        new AssetSettlement(INVESTOR_BOND_ACCOUNT, null));

    String placeBidBotTriggerCid = "placeBidBotTriggerCid";
    BidData bidData = new BidData(BigDecimal.valueOf(0.98), 100L, Instant.now());
    ledgerView.addActiveContract(
        PlaceBidBotTrigger.TEMPLATE_ID,
        placeBidBotTriggerCid,
        new PlaceBidBotTrigger(
            CASH_ID,
            CENTRAL_BANK,
            CSD,
            INVESTOR,
            AUCTION_AGENT,
            ISSUER,
            bidData,
            AUCTION_NAME,
            BOND_ID,
            Collections.emptyList()));

    CommandsAndPendingSet cmds =
        bot.calculateCommands(ledgerView.getRealLedgerView()).blockingFirst();

    assertHasSingleExercise(cmds, placeBidBotTriggerCid, "PlaceBidBotTrigger_LockCash");
  }
}
