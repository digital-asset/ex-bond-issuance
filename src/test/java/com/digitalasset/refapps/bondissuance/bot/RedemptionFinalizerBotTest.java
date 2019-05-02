/**
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance.bot;

import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.APP_ID;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.BOND_ID;
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
import da.finance.asset.splitandmerge.AssetSplitAndMergeRule;
import da.finance.asset.transfer.bilateral.AssetTransferRule;
import da.refapps.bond.redemption.RedemptionFinalizeBotTrigger;
import da.refapps.bond.redemption.RedemptionInstruction;
import da.refapps.bond.redemption.RedemptionPayoutInfo;
import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

@RunWith(JUnit4.class)
public class RedemptionFinalizerBotTest {
//
//  private RedemptionFinalizerBot bot;
//
//  @Before
//  public void setupTests() {
//    bot = new RedemptionFinalizerBot(TIME_MANAGER, APP_ID, ISSUER);
//  }
//
  @Test
  public void testInviteAgentTrigger() throws InvocationTargetException, IllegalAccessException {
//    LedgerTestView<Template> ledgerView = new LedgerTestView<>();
//    AccountFact.ContractId cashAccountCid = new AccountFact.ContractId("cid-1");
//    AssetFact.ContractId bondAssetFactCid = new AssetFact.ContractId("cid-2");
//    ledgerView.addActiveContract(
//        RedemptionPayoutInfo.TEMPLATE_ID,
//        "redemptionPayoutInfoCid",
//        new RedemptionPayoutInfo(
//            ISSUER,
//            INVESTOR,
//            CSD,
//            CENTRAL_BANK,
//            BOND_ID,
//            cashAccountCid,
//            bondAssetFactCid,
//            Collections.emptyList()));
//    ledgerView.addActiveContract(
//        AssetFact.TEMPLATE_ID,
//        "assetFactCid",
//        addUsdIntoNewAccount(new BigDecimal(1000000), ISSUER, "IssuerCashAccount"));
//    ledgerView.addActiveContract(
//        AssetTransferRule.TEMPLATE_ID,
//        "assetTransferRuleCid",
//        new AssetTransferRule(CENTRAL_BANK, ISSUER, Collections.emptyList()));
//    ledgerView.addActiveContract(
//        AssetSplitAndMergeRule.TEMPLATE_ID,
//        "assetSplitAndMergeRuleCid",
//        new AssetSplitAndMergeRule(CENTRAL_BANK, ISSUER, Collections.emptyList()));
//    String redemptionFinalizeBotTriggerCid = "redemptionFinalizeBotTriggerCid";
//    List<RedemptionInstruction> instructions = Collections.emptyList();
//    ledgerView.addActiveContract(
//        RedemptionFinalizeBotTrigger.TEMPLATE_ID,
//        redemptionFinalizeBotTriggerCid,
//        new RedemptionFinalizeBotTrigger(
//            ISSUER, CSD, instructions, USD_INSTRUMENT_ID, CENTRAL_BANK, Collections.emptyList()));
//
//    CommandsAndPendingSet cmds =
//        bot.calculateCommands(ledgerView.getRealLedgerView()).blockingFirst();
//
//    assertHasSingleExercise(
//        cmds, redemptionFinalizeBotTriggerCid, "RedemptionFinalizeBotTrigger_Finalize");
  }
}
