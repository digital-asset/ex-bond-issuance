/**
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance.bot.marketsetup;

import com.daml.ledger.javaapi.data.Filter;
import com.daml.ledger.javaapi.data.FiltersByParty;
import com.daml.ledger.javaapi.data.InclusiveFilter;
import com.daml.ledger.javaapi.data.Template;
import com.daml.ledger.javaapi.data.TransactionFilter;
import com.daml.ledger.javaapi.data.Value;
import com.daml.ledger.rxjava.components.LedgerViewFlowable;
import com.daml.ledger.rxjava.components.helpers.CommandsAndPendingSet;
import com.daml.ledger.rxjava.components.helpers.CreatedContract;
import com.digitalasset.refapps.bondissuance.util.*;
import com.google.common.collect.Sets;
import da.refapps.bond.test.marketsetup.MarketSetup;
import io.reactivex.Flowable;
import java.util.Collections;
import java.util.Map;
import java.util.UUID;
import org.slf4j.Logger;

/** A bot that auto-signs market setup requests in a specific order. */
public class MarketSetupSignerBot {

  public final TransactionFilter transactionFilter;
  private final Logger logger;
  private final CommandsAndPendingSetBuilder commandBuilder;
  private final String partyName;
  private final int orderInSigningProcess;

  /* A class representing an ordered group of signer bots that need to sign the market setup contract one after
   * another.
   * There is an ordering between signatories and their corresponding Signer Bots in a Signer Bot Group.
   * E.g. operator is the first to sign (via its bot), then comes Bank1, then Bank2 and the order of signing
   * by Bank1 then Bank2 is FIXED, cannot be switched. So, Bank2's signer bot will wait for Bank1's bot to sign,
   * and Bank1's for operator.
   */
  public static class MarketSetupSignerBotGroup {
    private final TimeManager timeManager;
    private final String appId;
    private int botNumber = 0;

    MarketSetupSignerBotGroup(TimeManager timeManager, String appId, int initialBotNumber) {
      this.timeManager = timeManager;
      this.appId = appId;
      this.botNumber = initialBotNumber;
    }

    public MarketSetupSignerBot addNextSignerBot(String partyName) {
      botNumber++;
      return new MarketSetupSignerBot(timeManager, appId, partyName, botNumber);
    }

    public int getBotNumber() {
      return botNumber;
    }
  }

  /*
   * A bot that signs market setup requests if it is the next who needs to (based on the order of the
   * corresponding signer group).
   */
  private MarketSetupSignerBot(
      TimeManager timeManager, String appId, String partyName, int orderInSigningProcess) {
    String workflowId =
        "WORKFLOW-" + partyName + "-MarketSetupSignerBot-" + UUID.randomUUID().toString();
    logger = BotLogger.getLogger(MarketSetupSignerBot.class, workflowId);
    this.partyName = partyName;
    this.orderInSigningProcess = orderInSigningProcess;

    commandBuilder = new CommandsAndPendingSetBuilder(appId, partyName, workflowId, timeManager);

    Filter messageFilter = new InclusiveFilter(Sets.newHashSet(MarketSetup.TEMPLATE_ID));

    this.transactionFilter = new FiltersByParty(Collections.singletonMap(partyName, messageFilter));

    logger.info("Startup completed");
  }

  public Flowable<CommandsAndPendingSet> calculateCommands(
      LedgerViewFlowable.LedgerView<Template> ledgerView) {
    Map<String, MarketSetup> marketSetupMap =
        BotUtil.filterTemplates(
            MarketSetup.class, ledgerView.getContracts(MarketSetup.TEMPLATE_ID));

    if (marketSetupMap.size() > 1) {
      throw new IllegalStateException("More than one market setup contracts are visible.");
    }

    CommandsAndPendingSetBuilder.Builder builder = commandBuilder.newBuilder();
    for (Map.Entry<String, MarketSetup> marketSetup : marketSetupMap.entrySet()) {
      // Only send command if we are the next in the group, see the
      if (marketSetup.getValue().signatories.size() + 1 == orderInSigningProcess) {
        MarketSetup.ContractId marketSetupCid = new MarketSetup.ContractId(marketSetup.getKey());
        builder.addCommand(marketSetupCid.exerciseMarketSetup_Sign(partyName));
      }
    }
    return builder.buildFlowable();
  }

  public Template getContractInfo(CreatedContract createdContract) {
    Value args = createdContract.getCreateArguments();
    if (createdContract.getTemplateId().equals(MarketSetup.TEMPLATE_ID)) {
      return MarketSetup.fromValue(args);
    } else {
      String msg =
          "Market Setup Signer Bot encountered an unknown contract of type "
              + createdContract.getTemplateId();
      logger.error(msg);
      throw new IllegalStateException(msg);
    }
  }
}
