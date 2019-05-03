/**
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance;

import com.daml.ledger.rxjava.DamlLedgerClient;
import com.daml.ledger.rxjava.components.Bot;
import com.digitalasset.refapps.bondissuance.bot.AuctionAllocateBondBot;
import com.digitalasset.refapps.bondissuance.bot.AuctionLockBot;
import com.digitalasset.refapps.bondissuance.bot.FinalizeSettlementBot;
import com.digitalasset.refapps.bondissuance.bot.InviteAgentBot;
import com.digitalasset.refapps.bondissuance.bot.RedemptionFinalizerBot;
import com.digitalasset.refapps.bondissuance.bot.RedemptionStartBot;
import com.digitalasset.refapps.bondissuance.util.CliOptions;
import com.digitalasset.refapps.bondissuance.util.TimeManager;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Entry point of the application. It obtains a LedgerClient which is used to communicate with the
 * ledger and sets up the bots to react to the events on the ledger.
 */
public class Main {
  private static final Logger logger = LoggerFactory.getLogger(Main.class);

  public static final String applicationId = "bond-issuance";

  public static final String auctionAgent = "AuctionAgent";
  public static final String issuer = "Issuer";
  public static final String csd = "CSD";
  public static final String bank1 = "Bank1";
  public static final String bank2 = "Bank2";
  public static final String bank3 = "Bank3";

  public static void main(String[] args) {
    CliOptions options = CliOptions.parseArgs(args);
    DamlLedgerClient client =
        DamlLedgerClient.forHostWithLedgerIdDiscovery(
            options.getSandboxHost(), options.getSandboxPort(), Optional.empty());
    waitForSandbox(options, client);

    try {
      StringBuilder sb = new StringBuilder("Listing packages:");
      client.getPackageClient().listPackages().forEach(id -> sb.append(id).append("\n"));
      logger.info(sb.toString());

      TimeManager timeManager = new TimeManager(client.getTimeClient());

      AuctionAllocateBondBot auctionAllocateBondBot =
          new AuctionAllocateBondBot(timeManager, applicationId, auctionAgent);

      InviteAgentBot inviteAgentBot = new InviteAgentBot(timeManager, applicationId, issuer);

      RedemptionStartBot redemptionStartBot =
          new RedemptionStartBot(timeManager, applicationId, csd);

      RedemptionFinalizerBot redemptionFinalizerBot =
          new RedemptionFinalizerBot(timeManager, applicationId, issuer);

      FinalizeSettlementBot finalizeSettlementBot1 =
          new FinalizeSettlementBot(timeManager, applicationId, bank1);
      FinalizeSettlementBot finalizeSettlementBot2 =
          new FinalizeSettlementBot(timeManager, applicationId, bank2);
      FinalizeSettlementBot finalizeSettlementBot3 =
          new FinalizeSettlementBot(timeManager, applicationId, bank3);

      AuctionLockBot auctionLockBot1 = new AuctionLockBot(timeManager, applicationId, bank1);
      AuctionLockBot auctionLockBot2 = new AuctionLockBot(timeManager, applicationId, bank2);
      AuctionLockBot auctionLockBot3 = new AuctionLockBot(timeManager, applicationId, bank3);

      Bot.wire(
          applicationId,
          client,
          auctionAllocateBondBot.transactionFilter,
          auctionAllocateBondBot::calculateCommands,
          auctionAllocateBondBot::getContractInfo);

      Bot.wire(
          applicationId,
          client,
          inviteAgentBot.transactionFilter,
          inviteAgentBot::calculateCommands,
          inviteAgentBot::getContractInfo);

      Bot.wire(
          applicationId,
          client,
          redemptionStartBot.transactionFilter,
          redemptionStartBot::calculateCommands,
          redemptionStartBot::getContractInfo);

      Bot.wire(
          applicationId,
          client,
          redemptionFinalizerBot.transactionFilter,
          redemptionFinalizerBot::calculateCommands,
          redemptionFinalizerBot::getContractInfo);

      Bot.wire(
          applicationId,
          client,
          finalizeSettlementBot1.transactionFilter,
          finalizeSettlementBot1::calculateCommands,
          finalizeSettlementBot1::getContractInfo);

      Bot.wire(
          applicationId,
          client,
          finalizeSettlementBot2.transactionFilter,
          finalizeSettlementBot2::calculateCommands,
          finalizeSettlementBot2::getContractInfo);

      Bot.wire(
          applicationId,
          client,
          finalizeSettlementBot3.transactionFilter,
          finalizeSettlementBot3::calculateCommands,
          finalizeSettlementBot3::getContractInfo);

      Bot.wire(
          applicationId,
          client,
          auctionLockBot1.transactionFilter,
          auctionLockBot1::calculateCommands,
          auctionLockBot1::getContractInfo);

      Bot.wire(
          applicationId,
          client,
          auctionLockBot2.transactionFilter,
          auctionLockBot2::calculateCommands,
          auctionLockBot2::getContractInfo);

      Bot.wire(
          applicationId,
          client,
          auctionLockBot3.transactionFilter,
          auctionLockBot3::calculateCommands,
          auctionLockBot3::getContractInfo);

      logger.info("Welcome to Bond Issuance Application!");
      logger.info("Press Ctrl+C to shut down the program.");

      Thread.currentThread().join();
      client.close();

      logger.info("Program terminated.");
    } catch (Exception e) {
      logger.warn("Is Sandbox running? ", e);
    }
  }

  private static void waitForSandbox(CliOptions options, DamlLedgerClient client) {
    boolean connected = false;
    while (!connected) {
      try {
        client.connect();
        connected = true;
      } catch (Exception ignored) {
        System.out.println(
            String.format(
                "Connecting to sandbox at %s:%s",
                options.getSandboxHost(), options.getSandboxPort()));
        try {
          Thread.sleep(1000);
        } catch (InterruptedException ignored2) {
        }
      }
    }
    System.out.println(
        String.format(
            "Connected to sandbox at %s:%s", options.getSandboxHost(), options.getSandboxPort()));
  }
}
