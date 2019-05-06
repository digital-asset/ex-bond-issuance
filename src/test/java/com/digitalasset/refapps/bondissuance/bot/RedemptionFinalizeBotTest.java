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
import da.finance.rule.asset.AssetFungible;
import da.finance.rule.asset.AssetSettlement;
import da.refapps.bond.redemption.RedemptionFinalizeBotTrigger;
import da.refapps.bond.redemption.RedemptionInstruction;
import java.lang.reflect.InvocationTargetException;
import java.util.Collections;
import java.util.List;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

@RunWith(JUnit4.class)
public class RedemptionFinalizeBotTest {

  private RedemptionFinalizeBot bot;

  @Before
  public void setupTests() {
    bot = new RedemptionFinalizeBot(TIME_MANAGER, APP_ID, ISSUER);
  }

  @Test
  public void testTrigger() throws InvocationTargetException, IllegalAccessException {
    LedgerTestView<Template> ledgerView = new LedgerTestView<>();
    
    ledgerView.addActiveContract(
        AssetDeposit.TEMPLATE_ID,
        "assetDepositCid",
        new AssetDeposit(ISSUER_CASH_ACCOUNT, CASH_ASSET, null));
    ledgerView.addActiveContract(
        AssetSettlement.TEMPLATE_ID,
        "assetSettlementCid",
        new AssetSettlement(ISSUER_CASH_ACCOUNT, null));
    ledgerView.addActiveContract(
        AssetFungible.TEMPLATE_ID,
        "assetFungibleCid",
        new AssetFungible(ISSUER_CASH_ACCOUNT, null));
    String redemptionFinalizeBotTriggerCid = "redemptionFinalizeBotTriggerCid";
    List<RedemptionInstruction> instructions = Collections.emptyList();
    ledgerView.addActiveContract(
        RedemptionFinalizeBotTrigger.TEMPLATE_ID,
        redemptionFinalizeBotTriggerCid,
        new RedemptionFinalizeBotTrigger(
            ISSUER, CSD, instructions, CENTRAL_BANK, CASH_ID, Collections.emptyList()));

    CommandsAndPendingSet cmds =
        bot.calculateCommands(ledgerView.getRealLedgerView())
            .blockingFirst();

    assertHasSingleExercise(
        cmds, redemptionFinalizeBotTriggerCid, "RedemptionFinalizeBotTrigger_Finalize");
  }
}
