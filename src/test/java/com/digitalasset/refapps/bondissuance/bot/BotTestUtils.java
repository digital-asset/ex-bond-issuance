/**
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance.bot;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import com.daml.ledger.javaapi.data.Command;
import com.daml.ledger.javaapi.data.ExerciseCommand;
import com.daml.ledger.javaapi.data.Party;
import com.daml.ledger.javaapi.data.Value;
import com.daml.ledger.javaapi.data.Variant;
import com.daml.ledger.rxjava.components.helpers.CommandsAndPendingSet;
import com.digitalasset.refapps.bondissuance.util.TimeManager;
import da.finance.asset.fact.AssetFact;
import da.finance.oldtypes.AccountId;
import da.finance.oldtypes.AssetId;
import da.finance.oldtypes.InstrumentId;
import da.finance.oldtypes.InstrumentKey;
import da.finance.types.Id;
import da.set.Set;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

public class BotTestUtils {
  public static final String APP_ID = "appId";
  public static final TimeManager TIME_MANAGER =
      new TimeManager(Instant.EPOCH.plusSeconds(7).toEpochMilli());

  public static final String OPERATOR = "Operator";
  public static final String CENTRAL_BANK = "CentralBank";
  public static final String CSD = "CSD";
  public static final String ISSUER = "Issuer";
  public static final String INVESTOR = "Investor";
  public static final String AUCTION_AGENT = "AuctionAgent";

  public static final String AUCTION_NAME = "Bond Auction";

  public static final InstrumentId USD_INSTRUMENT_ID = new InstrumentId("USD", 0L);
  public static final InstrumentKey USD_INSTRUMENT_KEY =
      new InstrumentKey(CENTRAL_BANK, USD_INSTRUMENT_ID);
  public static final Id BOND_ID = new Id(null, "BOND-007", 0L);
  public static final Id CASH_ID = new Id(null, "USD", 0L);
  public static final Id ISSUER_BOND_ACCOUNT_ID = new Id(null, "IssuerBondAccount", 0L);
  public static final Id ISSUER_CASH_ACCOUNT_ID = new Id(null, "IssuerCashAccount", 0L);

  public static AssetFact addUsdIntoNewAccount(
      BigDecimal initialAmount, String accountOwnerName, String accountName) {
    return new AssetFact(
        new AssetId(CENTRAL_BANK, new InstrumentId("USD", 0L), 0L),
        initialAmount,
        new AccountId(CENTRAL_BANK, accountName, accountOwnerName),
        Collections.emptyList());
  }

  public static void assertHasSingleExercise(
      CommandsAndPendingSet cmds, String cid, String choiceName) {
    List<Command> actualCommands = cmds.getSubmitCommandsRequest().getCommands();
    assertEquals(1, actualCommands.size());
    actualCommands.forEach(
        cmd -> {
          Optional<ExerciseCommand> exerciseCommand = cmd.asExerciseCommand();
          assertTrue(exerciseCommand.isPresent());
          assertEquals(cid, exerciseCommand.get().getContractId());
          assertEquals(choiceName, exerciseCommand.get().getChoice());
        });
  }
}
