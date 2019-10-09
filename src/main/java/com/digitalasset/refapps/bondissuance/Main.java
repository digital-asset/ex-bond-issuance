/**
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance;

import static com.digitalasset.refapps.bondissuance.util.TimeManager.getWallclockTimeManager;

import com.daml.ledger.rxjava.DamlLedgerClient;
import com.daml.ledger.rxjava.components.Bot;
import com.digitalasset.refapps.bondissuance.bot.*;
import com.digitalasset.refapps.bondissuance.bot.marketsetup.MarketSetupSignerBot;
import com.digitalasset.refapps.bondissuance.bot.marketsetup.MarketSetupStarterBot;
import com.digitalasset.refapps.bondissuance.util.CliOptions;
import com.digitalasset.refapps.bondissuance.util.PartyAllocator;
import com.digitalasset.refapps.bondissuance.util.TimeManager;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import java.util.Optional;
import java.util.function.BiConsumer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Entry point of the application. It obtains a LedgerClient which is used to communicate with the
 * ledger and sets up the bots to react to the events on the ledger.
 */
public class Main {
  private static final Logger logger = LoggerFactory.getLogger(Main.class);

  public static final String APPLICATION_ID = "bond-issuance";

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
      ManagedChannel channel =
          ManagedChannelBuilder.forAddress(options.getSandboxHost(), options.getSandboxPort())
              .usePlaintext()
              .maxInboundMessageSize(Integer.MAX_VALUE)
              .build();
      runBotsWithAllocation(client, channel);

      logger.info("Welcome to Bond Issuance Application!");
      logger.info("Press Ctrl+C to shut down the program.");

      Thread.currentThread().join();
      client.close();

      logger.info("Program terminated.");
    } catch (Exception e) {
      logger.warn("Is Sandbox running? ", e);
    }
  }

  public static void runBotsWithAllocation(DamlLedgerClient client, ManagedChannel channel) {
    final PartyAllocator.AllocatedParties parties = PartyAllocator.allocate(channel);
    runBots(parties, getWallclockTimeManager()).accept(client, channel);
  }

  public static BiConsumer<DamlLedgerClient, ManagedChannel> runBots(
      PartyAllocator.AllocatedParties parties, TimeManager timeManager) {
    return (DamlLedgerClient client, ManagedChannel channel) -> {
      logPackages(client);

      AuctionFinalizeBot auctionFinalizeBot =
          new AuctionFinalizeBot(timeManager, APPLICATION_ID, parties.getAuctionAgent());

      CommissionBot commissionBot =
          new CommissionBot(timeManager, APPLICATION_ID, parties.getIssuer());

      RedemptionCalculationBot redemptionCalculationBot =
          new RedemptionCalculationBot(timeManager, APPLICATION_ID, parties.getCSD());

      RedemptionFinalizeBot redemptionFinalizeBot =
          new RedemptionFinalizeBot(timeManager, APPLICATION_ID, parties.getIssuer());

      InvestorSettlementBot investorSettlementBot1 =
          new InvestorSettlementBot(timeManager, APPLICATION_ID, parties.getBank1());
      InvestorSettlementBot investorSettlementBot2 =
          new InvestorSettlementBot(timeManager, APPLICATION_ID, parties.getBank2());
      InvestorSettlementBot investorSettlementBot3 =
          new InvestorSettlementBot(timeManager, APPLICATION_ID, parties.getBank3());

      PlaceBidBot placeBidBot1 = new PlaceBidBot(timeManager, APPLICATION_ID, parties.getBank1());
      PlaceBidBot placeBidBot2 = new PlaceBidBot(timeManager, APPLICATION_ID, parties.getBank2());
      PlaceBidBot placeBidBot3 = new PlaceBidBot(timeManager, APPLICATION_ID, parties.getBank3());

      MarketSetupStarterBot marketSetupStarterBot =
          new MarketSetupStarterBot(
              timeManager,
              client.getCommandSubmissionClient(),
              APPLICATION_ID,
              parties.getOperator(),
              parties);
      MarketSetupSignerBot signer1 =
          new MarketSetupSignerBot(timeManager, APPLICATION_ID, parties.getBank1());
      MarketSetupSignerBot signer2 =
          new MarketSetupSignerBot(timeManager, APPLICATION_ID, parties.getBank2());
      MarketSetupSignerBot signer3 =
          new MarketSetupSignerBot(timeManager, APPLICATION_ID, parties.getBank3());
      MarketSetupSignerBot signerIssuer =
          new MarketSetupSignerBot(timeManager, APPLICATION_ID, parties.getIssuer());
      MarketSetupSignerBot signerCsd =
          new MarketSetupSignerBot(timeManager, APPLICATION_ID, parties.getCSD());
      MarketSetupSignerBot signerAuctionA =
          new MarketSetupSignerBot(timeManager, APPLICATION_ID, parties.getAuctionAgent());
      MarketSetupSignerBot signerOp =
          new MarketSetupSignerBot(timeManager, APPLICATION_ID, parties.getOperator());
      MarketSetupSignerBot signerReg =
          new MarketSetupSignerBot(timeManager, APPLICATION_ID, parties.getRegulator());
      MarketSetupSignerBot signerCentral =
          new MarketSetupSignerBot(timeManager, APPLICATION_ID, parties.getCentralBank());

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
    };
  }

  private static void logPackages(DamlLedgerClient client) {
    StringBuilder sb = new StringBuilder("Listing packages:");
    client.getPackageClient().listPackages().forEach(id -> sb.append(id).append("\n"));
    logger.info(sb.toString());
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
