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
import da.finance.instruments.fixedratebond.FixedRateBondFact;
import da.finance.rule.asset.AssetFungible;
import da.finance.rule.asset.AssetSettlement;
import da.finance.types.Account;
import da.finance.types.Id;
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
    Account bondAccount = new Account(new Id(null, "IssuerBondAccount", 0L), CSD, ISSUER);

    ledgerView.addActiveContract(
        FixedRateBondFact.TEMPLATE_ID,
        "fixedRateBondCid",
        new FixedRateBondFact(
            CSD,
            BOND_ID,
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
        AssetSettlement.TEMPLATE_ID,
        "assetSettlementCid",
        new AssetSettlement(bondAccount, null));
    ledgerView.addActiveContract(
        AssetFungible.TEMPLATE_ID,
        "assetFungibleCid",
        new AssetFungible(bondAccount, null));
    String commissionBotTriggerCid = "commissionBotTriggerCid";
    AssetDeposit.ContractId bondAssetDepositCid = new AssetDeposit.ContractId("cid-1");
    BigDecimal minPrice = BigDecimal.valueOf(0.98);
    Account cashAccount = new Account(ISSUER_CASH_ACCOUNT_ID, CENTRAL_BANK, ISSUER);
    ledgerView.addActiveContract(
        CommissionBotTrigger.TEMPLATE_ID,
        commissionBotTriggerCid,
        new CommissionBotTrigger(
            ISSUER,
            OPERATOR,
            CSD,
            Collections.emptyList(),
            bondAssetDepositCid,
            BOND_ID,
            AUCTION_AGENT,
            startDate,
            endDate,
            minPrice,
            size,
            cashAccount,
            CASH_ID));

    CommandsAndPendingSet cmds =
        bot.calculateCommands(ledgerView.getRealLedgerView()).blockingFirst();

    assertHasSingleExercise(cmds, commissionBotTriggerCid, "CommissionBotTrigger_InviteAgent");
  }
}
