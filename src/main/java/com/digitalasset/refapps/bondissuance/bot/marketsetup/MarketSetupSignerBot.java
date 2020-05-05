/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance.bot.marketsetup;

import com.daml.ledger.javaapi.data.Filter;
import com.daml.ledger.javaapi.data.FiltersByParty;
import com.daml.ledger.javaapi.data.InclusiveFilter;
import com.daml.ledger.javaapi.data.Template;
import com.daml.ledger.javaapi.data.TransactionFilter;
import com.daml.ledger.rxjava.components.LedgerViewFlowable;
import com.daml.ledger.rxjava.components.helpers.CommandsAndPendingSet;
import com.daml.ledger.rxjava.components.helpers.CreatedContract;
import com.daml.ledger.rxjava.components.helpers.TemplateUtils;
import com.digitalasset.refapps.bondissuance.util.*;
import com.google.common.collect.Sets;
import da.refapps.bond.test.marketsetup.MarketSetupSignature;
import da.refapps.bond.test.marketsetup.MarketSetupSignatureCreator;
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

  /*
   * A bot that signs market setup requests if it is the next who needs to (based on the order of the
   * corresponding signer group).
   */
  public MarketSetupSignerBot(String appId, String partyName) {
    String workflowId =
        "WORKFLOW-" + partyName + "-MarketSetupSignerBot-" + UUID.randomUUID().toString();
    logger = BotLogger.getLogger(MarketSetupSignerBot.class, workflowId);
    this.partyName = partyName;

    commandBuilder = new CommandsAndPendingSetBuilder(appId, partyName, workflowId);

    Filter messageFilter =
        new InclusiveFilter(
            Sets.newHashSet(
                MarketSetupSignature.TEMPLATE_ID, MarketSetupSignatureCreator.TEMPLATE_ID));

    this.transactionFilter = new FiltersByParty(Collections.singletonMap(partyName, messageFilter));

    logger.info("Startup completed");
  }

  public Flowable<CommandsAndPendingSet> calculateCommands(
      LedgerViewFlowable.LedgerView<Template> ledgerView) {
    Map<String, MarketSetupSignature> signatureMap =
        BotUtil.filterTemplates(
            MarketSetupSignature.class, ledgerView.getContracts(MarketSetupSignature.TEMPLATE_ID));

    CommandsAndPendingSetBuilder.Builder builder = commandBuilder.newBuilder();
    if (signatureMap.isEmpty()) {
      Map<String, MarketSetupSignatureCreator> signatureCreatorMap =
          BotUtil.filterTemplates(
              MarketSetupSignatureCreator.class,
              ledgerView.getContracts(MarketSetupSignatureCreator.TEMPLATE_ID));

      if (signatureCreatorMap.size() > 1) {
        throw new IllegalStateException(
            "More than one market setup signature creator contracts are visible.");
      }

      for (Map.Entry<String, MarketSetupSignatureCreator> signatureCreator :
          signatureCreatorMap.entrySet()) {
        MarketSetupSignatureCreator.ContractId signatureCreatorCid =
            new MarketSetupSignatureCreator.ContractId(signatureCreator.getKey());
        builder.addCommand(
            signatureCreatorCid.exerciseMarketSetupSignatureCreator_CreateSignature(partyName));
      }
    }
    return builder.buildFlowable();
  }

  public Template getContractInfo(CreatedContract createdContract) {
    //noinspection unchecked
    return TemplateUtils.contractTransformer(
            MarketSetupSignature.class, MarketSetupSignatureCreator.class)
        .apply(createdContract);
  }
}
