/**
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance.bot;

import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.APP_ID;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.AUCTION_AGENT;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.BOND_INSTRUMENT_ID;
import static com.digitalasset.refapps.bondissuance.bot.BotTestUtils.CSD;
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
import da.refapps.bond.roles.issuerrole.CommissionBotTrigger;
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
public class InviteAgentBotTest {

  private InviteAgentBot bot;

  @Before
  public void setupTests() {
    bot = new InviteAgentBot(TIME_MANAGER, APP_ID, ISSUER);
  }

  @Test
  public void testInviteAgentTrigger() throws InvocationTargetException, IllegalAccessException {
    LedgerTestView<Template> ledgerView = new LedgerTestView<>();
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

    ledgerView.addActiveContract(
        FixedRateBondFact.TEMPLATE_ID,
        "fixedRateBondCid",
        new FixedRateBondFact(
            CSD,
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
            maturityDate));
    ledgerView.addActiveContract(
        AssetLockRule.TEMPLATE_ID,
        "assetLockRuleCid",
        new AssetLockRule(CSD, ISSUER, Collections.emptyList()));
    ledgerView.addActiveContract(
        AssetTransferRule.TEMPLATE_ID,
        "assetTransferRuleCid",
        new AssetTransferRule(CSD, ISSUER, Collections.emptyList()));
    ledgerView.addActiveContract(
        AssetSplitAndMergeRule.TEMPLATE_ID,
        "assetSplitAndMergeRuleCid",
        new AssetSplitAndMergeRule(CSD, ISSUER, Collections.emptyList()));
    String commissionBotTriggerCid = "commissionBotTriggerCid";
    AssetFact.ContractId bondAssetFactCid = new AssetFact.ContractId("cid-1");
    BigDecimal minPrice = BigDecimal.valueOf(0.98);
    AccountFact.ContractId cashAccount = new AccountFact.ContractId("cid-2");
    ledgerView.addActiveContract(
        CommissionBotTrigger.TEMPLATE_ID,
        commissionBotTriggerCid,
        new CommissionBotTrigger(
            ISSUER,
            OPERATOR,
            CSD,
            Collections.emptyList(),
            bondAssetFactCid,
            BOND_INSTRUMENT_ID,
            AUCTION_AGENT,
            startDate,
            endDate,
            minPrice,
            size,
            USD_INSTRUMENT_KEY,
            cashAccount));

    CommandsAndPendingSet cmds =
        bot.calculateCommands(ledgerView.getRealLedgerView()).blockingFirst();

    assertHasSingleExercise(cmds, commissionBotTriggerCid, "CommissionBotTrigger_InviteAgent");
  }
}
