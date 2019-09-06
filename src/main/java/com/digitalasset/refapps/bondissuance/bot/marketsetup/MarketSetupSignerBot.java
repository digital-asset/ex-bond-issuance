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

/**
 * A bot to auto-sign market setup requests.
 */
public class MarketSetupSignerBot {

  public final TransactionFilter transactionFilter;
  private final Logger logger;
  private final CommandsAndPendingSetBuilder commandBuilder;
  private final String partyName;
  private final int orderInSigningProcess;

  public static class MarketSetupSignerBotGroup {
    private final TimeManager timeManager;
    private final String appId;
    private int botNumber = 0;

    // There is an ordering between signatories
    MarketSetupSignerBotGroup(
        TimeManager timeManager, String appId, int initialBotNumber) {
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
      // Only send command if we are the next in the group
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
