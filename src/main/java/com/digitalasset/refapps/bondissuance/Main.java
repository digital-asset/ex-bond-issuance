/**
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance;

import static com.digitalasset.refapps.bondissuance.util.TimeManager.getTimeClientBasedTimeManager;

import com.daml.ledger.rxjava.DamlLedgerClient;
import com.daml.ledger.rxjava.components.Bot;
import com.digitalasset.refapps.bondissuance.bot.*;
import com.digitalasset.refapps.bondissuance.bot.marketsetup.MarketSetupSignerBot;
import com.digitalasset.refapps.bondissuance.bot.marketsetup.MarketSetupStarterBot;
import com.digitalasset.refapps.bondissuance.bot.marketsetup.data.MarketParties;
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

  public static final String APPLICATION_ID = "bond-issuance";

  public static final String AUCTION_AGENT = "AuctionAgent";
  public static final String ISSUER = "Issuer";
  public static final String CSD = "CSD";
  public static final String BANK_1 = "Bank1";
  public static final String BANK_2 = "Bank2";
  public static final String BANK_3 = "Bank3";
  public static final String OPERATOR = "Operator";
  public static final String REGULATOR = "Regulator";
  public static final String CENTRAL_BANK = "CentralBank";

  public static void main(String[] args) {
    CliOptions options = CliOptions.parseArgs(args);
    DamlLedgerClient client =
        DamlLedgerClient.forHostWithLedgerIdDiscovery(
            options.getSandboxHost(), options.getSandboxPort(), Optional.empty());
    System.out.println(
        String.format(
            "Connected to Sandbox at %s:%s", options.getSandboxHost(), options.getSandboxPort()));
    waitForSandbox(client);
    System.out.println("Connected to Sandbox.");
    try {
      runBots(client);

      logger.info("Welcome to Bond Issuance Application!");
      logger.info("Press Ctrl+C to shut down the program.");

      Thread.currentThread().join();
      client.close();

      logger.info("Program terminated.");
    } catch (Exception e) {
      logger.warn("Is Sandbox running? ", e);
    }
  }

  public static void runBots(DamlLedgerClient client) {
    StringBuilder sb = new StringBuilder("Listing packages:");
    client.getPackageClient().listPackages().forEach(id -> sb.append(id).append("\n"));
    logger.info(sb.toString());

    TimeManager timeManager = getTimeClientBasedTimeManager(client.getTimeClient());

    AuctionFinalizeBot auctionFinalizeBot =
        new AuctionFinalizeBot(timeManager, APPLICATION_ID, AUCTION_AGENT);

    CommissionBot commissionBot = new CommissionBot(timeManager, APPLICATION_ID, ISSUER);

    RedemptionCalculationBot redemptionCalculationBot =
        new RedemptionCalculationBot(timeManager, APPLICATION_ID, CSD);

    RedemptionFinalizeBot redemptionFinalizeBot =
        new RedemptionFinalizeBot(timeManager, APPLICATION_ID, ISSUER);

    InvestorSettlementBot investorSettlementBot1 =
        new InvestorSettlementBot(timeManager, APPLICATION_ID, BANK_1);
    InvestorSettlementBot investorSettlementBot2 =
        new InvestorSettlementBot(timeManager, APPLICATION_ID, BANK_2);
    InvestorSettlementBot investorSettlementBot3 =
        new InvestorSettlementBot(timeManager, APPLICATION_ID, BANK_3);

    PlaceBidBot placeBidBot1 = new PlaceBidBot(timeManager, APPLICATION_ID, BANK_1);
    PlaceBidBot placeBidBot2 = new PlaceBidBot(timeManager, APPLICATION_ID, BANK_2);
    PlaceBidBot placeBidBot3 = new PlaceBidBot(timeManager, APPLICATION_ID, BANK_3);

    MarketParties marketParties =
        new MarketParties(
            OPERATOR, REGULATOR, AUCTION_AGENT, BANK_1, BANK_2, BANK_3, CSD, ISSUER, CENTRAL_BANK);
    MarketSetupStarterBot marketSetupStarterBot =
        new MarketSetupStarterBot(
            timeManager,
            client.getCommandSubmissionClient(),
            APPLICATION_ID,
            OPERATOR,
            marketParties);
    MarketSetupSignerBot signer1 = marketSetupStarterBot.addNextSignerBot(BANK_1);
    MarketSetupSignerBot signer2 = marketSetupStarterBot.addNextSignerBot(BANK_2);
    MarketSetupSignerBot signer3 = marketSetupStarterBot.addNextSignerBot(BANK_3);
    MarketSetupSignerBot signerIssuer = marketSetupStarterBot.addNextSignerBot(ISSUER);
    MarketSetupSignerBot signerCsd = marketSetupStarterBot.addNextSignerBot(CSD);
    MarketSetupSignerBot signerAuctionA = marketSetupStarterBot.addNextSignerBot(AUCTION_AGENT);
    MarketSetupSignerBot signerOp = marketSetupStarterBot.addNextSignerBot(OPERATOR);
    MarketSetupSignerBot signerReg = marketSetupStarterBot.addNextSignerBot(REGULATOR);
    MarketSetupSignerBot signerCentral = marketSetupStarterBot.addNextSignerBot(CENTRAL_BANK);

    Bot.wire(
        APPLICATION_ID,
        client,
        signer1.transactionFilter,
        signer1::calculateCommands,
        signer1::getContractInfo);
    Bot.wire(
        APPLICATION_ID,
        client,
        signer2.transactionFilter,
        signer2::calculateCommands,
        signer2::getContractInfo);
    Bot.wire(
        APPLICATION_ID,
        client,
        signer3.transactionFilter,
        signer3::calculateCommands,
        signer3::getContractInfo);
    Bot.wire(
        APPLICATION_ID,
        client,
        signerIssuer.transactionFilter,
        signerIssuer::calculateCommands,
        signerIssuer::getContractInfo);
    Bot.wire(
        APPLICATION_ID,
        client,
        signerCsd.transactionFilter,
        signerCsd::calculateCommands,
        signerCsd::getContractInfo);
    Bot.wire(
        APPLICATION_ID,
        client,
        signerAuctionA.transactionFilter,
        signerAuctionA::calculateCommands,
        signerAuctionA::getContractInfo);
    Bot.wire(
        APPLICATION_ID,
        client,
        signerOp.transactionFilter,
        signerOp::calculateCommands,
        signerOp::getContractInfo);
    Bot.wire(
        APPLICATION_ID,
        client,
        signerReg.transactionFilter,
        signerReg::calculateCommands,
        signerReg::getContractInfo);
    Bot.wire(
        APPLICATION_ID,
        client,
        signerCentral.transactionFilter,
        signerCentral::calculateCommands,
        signerCentral::getContractInfo);
    Bot.wire(
        APPLICATION_ID,
        client,
        marketSetupStarterBot.transactionFilter,
        marketSetupStarterBot::calculateCommands,
        marketSetupStarterBot::getContractInfo);
    marketSetupStarterBot.startMarketSetup();

    Bot.wire(
        APPLICATION_ID,
        client,
        auctionFinalizeBot.transactionFilter,
        auctionFinalizeBot::calculateCommands,
        auctionFinalizeBot::getContractInfo);

    Bot.wire(
        APPLICATION_ID,
        client,
        commissionBot.transactionFilter,
        commissionBot::calculateCommands,
        commissionBot::getContractInfo);

    Bot.wire(
        APPLICATION_ID,
        client,
        redemptionCalculationBot.transactionFilter,
        redemptionCalculationBot::calculateCommands,
        redemptionCalculationBot::getContractInfo);

    Bot.wire(
        APPLICATION_ID,
        client,
        redemptionFinalizeBot.transactionFilter,
        redemptionFinalizeBot::calculateCommands,
        redemptionFinalizeBot::getContractInfo);

    Bot.wire(
        APPLICATION_ID,
        client,
        investorSettlementBot1.transactionFilter,
        investorSettlementBot1::calculateCommands,
        investorSettlementBot1::getContractInfo);

    Bot.wire(
        APPLICATION_ID,
        client,
        investorSettlementBot2.transactionFilter,
        investorSettlementBot2::calculateCommands,
        investorSettlementBot2::getContractInfo);

    Bot.wire(
        APPLICATION_ID,
        client,
        investorSettlementBot3.transactionFilter,
        investorSettlementBot3::calculateCommands,
        investorSettlementBot3::getContractInfo);

    Bot.wire(
        APPLICATION_ID,
        client,
        placeBidBot1.transactionFilter,
        placeBidBot1::calculateCommands,
        placeBidBot1::getContractInfo);

    Bot.wire(
        APPLICATION_ID,
        client,
        placeBidBot2.transactionFilter,
        placeBidBot2::calculateCommands,
        placeBidBot2::getContractInfo);

    Bot.wire(
        APPLICATION_ID,
        client,
        placeBidBot3.transactionFilter,
        placeBidBot3::calculateCommands,
        placeBidBot3::getContractInfo);
  }

  private static void waitForSandbox(DamlLedgerClient client) {
    boolean connected = false;
    while (!connected) {
      try {
        client.connect();
        connected = true;
      } catch (Exception ignored) {
        System.out.println("Connecting to sandbox...");
        try {
          Thread.sleep(1000);
        } catch (InterruptedException ignored2) {
        }
      }
    }
  }
}
