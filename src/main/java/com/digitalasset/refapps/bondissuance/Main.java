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
import java.time.Instant;
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
  public static final String operator = "Operator";
  public static final String regulator = "Regulator";
  public static final String centralBank = "CentralBank";

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
    client
        .getTimeClient()
        .setTime(timeManager.getTime(), Instant.parse("2019-03-21T10:00:00.00Z"))
        .blockingGet();

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

    MarketParties marketParties =
        new MarketParties(
            operator, regulator, auctionAgent, bank1, bank2, bank3, csd, issuer, centralBank);
    MarketSetupStarterBot marketSetupStarterBot =
        new MarketSetupStarterBot(
            timeManager,
            client.getCommandSubmissionClient(),
            applicationId,
            operator,
            marketParties);
    MarketSetupSignerBot signer1 = marketSetupStarterBot.addNextSignerBot(bank1);
    MarketSetupSignerBot signer2 = marketSetupStarterBot.addNextSignerBot(bank2);
    MarketSetupSignerBot signer3 = marketSetupStarterBot.addNextSignerBot(bank3);
    MarketSetupSignerBot signerIssuer = marketSetupStarterBot.addNextSignerBot(issuer);
    MarketSetupSignerBot signerCsd = marketSetupStarterBot.addNextSignerBot(csd);
    MarketSetupSignerBot signerAuctionA = marketSetupStarterBot.addNextSignerBot(auctionAgent);
    MarketSetupSignerBot signerOp = marketSetupStarterBot.addNextSignerBot(operator);
    MarketSetupSignerBot signerReg = marketSetupStarterBot.addNextSignerBot(regulator);
    MarketSetupSignerBot signerCentral = marketSetupStarterBot.addNextSignerBot(centralBank);

    Bot.wire(
        applicationId,
        client,
        signer1.transactionFilter,
        signer1::calculateCommands,
        signer1::getContractInfo);
    Bot.wire(
        applicationId,
        client,
        signer2.transactionFilter,
        signer2::calculateCommands,
        signer2::getContractInfo);
    Bot.wire(
        applicationId,
        client,
        signer3.transactionFilter,
        signer3::calculateCommands,
        signer3::getContractInfo);
    Bot.wire(
        applicationId,
        client,
        signerIssuer.transactionFilter,
        signerIssuer::calculateCommands,
        signerIssuer::getContractInfo);
    Bot.wire(
        applicationId,
        client,
        signerCsd.transactionFilter,
        signerCsd::calculateCommands,
        signerCsd::getContractInfo);
    Bot.wire(
        applicationId,
        client,
        signerAuctionA.transactionFilter,
        signerAuctionA::calculateCommands,
        signerAuctionA::getContractInfo);
    Bot.wire(
        applicationId,
        client,
        signerOp.transactionFilter,
        signerOp::calculateCommands,
        signerOp::getContractInfo);
    Bot.wire(
        applicationId,
        client,
        signerReg.transactionFilter,
        signerReg::calculateCommands,
        signerReg::getContractInfo);
    Bot.wire(
        applicationId,
        client,
        signerCentral.transactionFilter,
        signerCentral::calculateCommands,
        signerCentral::getContractInfo);
    Bot.wire(
        applicationId,
        client,
        marketSetupStarterBot.transactionFilter,
        marketSetupStarterBot::calculateCommands,
        marketSetupStarterBot::getContractInfo);
    marketSetupStarterBot.startMarketSetup();

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
