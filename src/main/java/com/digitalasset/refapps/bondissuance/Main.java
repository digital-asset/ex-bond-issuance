/**
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance;

import com.daml.ledger.rxjava.DamlLedgerClient;
import com.daml.ledger.rxjava.components.Bot;
import com.digitalasset.refapps.bondissuance.bot.AuctionFinalizeBot;
import com.digitalasset.refapps.bondissuance.bot.InvestorSettlementBot;
import com.digitalasset.refapps.bondissuance.bot.PlaceBidBot;
import com.digitalasset.refapps.bondissuance.bot.CommissionBot;
import com.digitalasset.refapps.bondissuance.bot.RedemptionFinalizeBot;
import com.digitalasset.refapps.bondissuance.bot.RedemptionCalculationBot;
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

      AuctionFinalizeBot auctionFinalizeBot =
          new AuctionFinalizeBot(timeManager, applicationId, auctionAgent);

      CommissionBot commissionBot = new CommissionBot(timeManager, applicationId, issuer);

      RedemptionCalculationBot redemptionCalculationBot =
          new RedemptionCalculationBot(timeManager, applicationId, csd);

      RedemptionFinalizeBot redemptionFinalizeBot =
          new RedemptionFinalizeBot(timeManager, applicationId, issuer);

      InvestorSettlementBot investorSettlementBot1 =
          new InvestorSettlementBot(timeManager, applicationId, bank1);
      InvestorSettlementBot investorSettlementBot2 =
          new InvestorSettlementBot(timeManager, applicationId, bank2);
      InvestorSettlementBot investorSettlementBot3 =
          new InvestorSettlementBot(timeManager, applicationId, bank3);

      PlaceBidBot placeBidBot1 = new PlaceBidBot(timeManager, applicationId, bank1);
      PlaceBidBot placeBidBot2 = new PlaceBidBot(timeManager, applicationId, bank2);
      PlaceBidBot placeBidBot3 = new PlaceBidBot(timeManager, applicationId, bank3);

      Bot.wire(
          applicationId,
          client,
          auctionFinalizeBot.transactionFilter,
          auctionFinalizeBot::calculateCommands,
          auctionFinalizeBot::getContractInfo);

      Bot.wire(
          applicationId,
          client,
          commissionBot.transactionFilter,
          commissionBot::calculateCommands,
          commissionBot::getContractInfo);

      Bot.wire(
          applicationId,
          client,
          redemptionCalculationBot.transactionFilter,
          redemptionCalculationBot::calculateCommands,
          redemptionCalculationBot::getContractInfo);

      Bot.wire(
          applicationId,
          client,
          redemptionFinalizeBot.transactionFilter,
          redemptionFinalizeBot::calculateCommands,
          redemptionFinalizeBot::getContractInfo);

      Bot.wire(
          applicationId,
          client,
          investorSettlementBot1.transactionFilter,
          investorSettlementBot1::calculateCommands,
          investorSettlementBot1::getContractInfo);

      Bot.wire(
          applicationId,
          client,
          investorSettlementBot2.transactionFilter,
          investorSettlementBot2::calculateCommands,
          investorSettlementBot2::getContractInfo);

      Bot.wire(
          applicationId,
          client,
          investorSettlementBot3.transactionFilter,
          investorSettlementBot3::calculateCommands,
          investorSettlementBot3::getContractInfo);

      Bot.wire(
          applicationId,
          client,
          placeBidBot1.transactionFilter,
          placeBidBot1::calculateCommands,
          placeBidBot1::getContractInfo);

      Bot.wire(
          applicationId,
          client,
          placeBidBot2.transactionFilter,
          placeBidBot2::calculateCommands,
          placeBidBot2::getContractInfo);

      Bot.wire(
          applicationId,
          client,
          placeBidBot3.transactionFilter,
          placeBidBot3::calculateCommands,
          placeBidBot3::getContractInfo);

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
