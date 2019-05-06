/**
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
import da.finance.fact.trade.dvp.Dvp;
import da.finance.rule.asset.AssetSettlement;
import da.finance.rule.trade.dvp.DvpSettlement_Process_Result;
import da.refapps.bond.fixedratebond.FixedRateBondFact;
import da.refapps.bond.redemption.RedemptionCalculationBotTrigger;
import da.refapps.bond.redemption.RedemptionPayoutInfo;
import java.lang.reflect.InvocationTargetException;
import java.util.Collections;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

@RunWith(JUnit4.class)
public class RedemptionCalculationBotTest {

  private RedemptionCalculationBot bot;

  @Before
  public void setupTests() {
    bot = new RedemptionCalculationBot(TIME_MANAGER, APP_ID, CSD);
  }

  @Test
  public void testTrigger() throws InvocationTargetException, IllegalAccessException {
    LedgerTestView<Template> ledgerView = new LedgerTestView<>();
    AssetSettlement.ContractId assetSettlementCid = new AssetSettlement.ContractId("cid-1");
    Dvp.ContractId dvpCid = new Dvp.ContractId("cid-2");
    
    ledgerView.addActiveContract(
        RedemptionPayoutInfo.TEMPLATE_ID,
        "redemptionPayoutInfoCid",
        new RedemptionPayoutInfo(
            ISSUER,
            INVESTOR,
            BOND_ID,
            CSD,
            INVESTOR_CASH_ACCOUNT,
            new DvpSettlement_Process_Result(dvpCid, Collections.emptyList(), Collections.emptyList()),
            assetSettlementCid,
            Collections.emptyList()));

    ledgerView.addActiveContract(
        AssetDeposit.TEMPLATE_ID,
        "assetDepositCid",
        new AssetDeposit(ISSUER_CASH_ACCOUNT, CASH_ASSET, null));

    String redemptionCalculationBotTriggerCid = "redemptionCalculationBotTriggerCid";
    FixedRateBondFact.ContractId fixedRateBondFactCid = new FixedRateBondFact.ContractId("cid-3");
    ledgerView.addActiveContract(
        RedemptionCalculationBotTrigger.TEMPLATE_ID,
        redemptionCalculationBotTriggerCid,
        new RedemptionCalculationBotTrigger(
            ISSUER, CSD, fixedRateBondFactCid, BOND_ID, CASH_ID, Collections.emptyList()));

    CommandsAndPendingSet cmds =
        bot.calculateCommands(ledgerView.getRealLedgerView()).blockingFirst();

    assertHasSingleExercise(
        cmds, redemptionCalculationBotTriggerCid, "RedemptionCalculationBotTrigger_Start");
  }
}
