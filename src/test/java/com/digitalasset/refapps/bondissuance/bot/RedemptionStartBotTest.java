/**
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance.bot;

import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.APP_ID;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.BOND_INSTRUMENT_ID;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.CENTRAL_BANK;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.CSD;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.INVESTOR;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.ISSUER;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.TIME_MANAGER;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.addUsdIntoNewAccount;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.assertHasSingleExercise;

import com.daml.ledger.javaapi.data.Template;
import com.daml.ledger.rxjava.components.helpers.CommandsAndPendingSet;
import com.digitalasset.refapps.bondissuance.LedgerTestView;
import da.finance.account.fact.AccountFact;
import da.finance.asset.fact.AssetFact;
import da.finance.asset.lock.AssetLockedFact;
import da.finance.instruments.fixedratebond.FixedRateBondFact;
import da.refapps.bond.redemption.RedemptionCalculationBotTrigger;
import da.refapps.bond.redemption.RedemptionPayoutInfo;
import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.util.Collections;
import java.util.Optional;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

@RunWith(JUnit4.class)
public class RedemptionStartBotTest {

  private RedemptionStartBot bot;

  @Before
  public void setupTests() {
    bot = new RedemptionStartBot(TIME_MANAGER, APP_ID, CSD);
  }

  @Test
  public void testInviteAgentTrigger() throws InvocationTargetException, IllegalAccessException {
    LedgerTestView<Template> ledgerView = new LedgerTestView<>();
    AccountFact.ContractId cashAccountCid = new AccountFact.ContractId("cid-1");
    AssetFact.ContractId bondAssetFactCid = new AssetFact.ContractId("cid-2");
    ledgerView.addActiveContract(
        RedemptionPayoutInfo.TEMPLATE_ID,
        "redemptionPayoutInfoCid",
        new RedemptionPayoutInfo(
            ISSUER,
            INVESTOR,
            CSD,
            CENTRAL_BANK,
            BOND_INSTRUMENT_ID,
            cashAccountCid,
            bondAssetFactCid,
            Collections.emptyList()));

    AssetFact assetFact =
        addUsdIntoNewAccount(new BigDecimal(10000000), ISSUER, "IssuerCashAccount");
    ledgerView.addActiveContract(AssetFact.TEMPLATE_ID, "assetFactCid", assetFact);

    ledgerView.addActiveContract(
        AssetLockedFact.TEMPLATE_ID,
        "assetLockedFactCid",
        new AssetLockedFact(assetFact, Optional.empty(), INVESTOR, Collections.emptyList()));

    String redemptionCalculationBotTriggerCid = "redemptionCalculationBotTriggerCid";
    FixedRateBondFact.ContractId fixedRateBondFactCid = new FixedRateBondFact.ContractId("cid-3");
    ledgerView.addActiveContract(
        RedemptionCalculationBotTrigger.TEMPLATE_ID,
        redemptionCalculationBotTriggerCid,
        new RedemptionCalculationBotTrigger(
            ISSUER, CSD, fixedRateBondFactCid, BOND_INSTRUMENT_ID, Collections.emptyList()));

    CommandsAndPendingSet cmds =
        bot.calculateCommands(ledgerView.getRealLedgerView()).blockingFirst();

    assertHasSingleExercise(
        cmds, redemptionCalculationBotTriggerCid, "RedemptionCalculationBotTrigger_Start");
  }
}
