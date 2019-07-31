/**
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import com.daml.ledger.javaapi.data.Party;
import com.digitalasset.testing.junit4.Sandbox;
import com.digitalasset.testing.utils.ContractWithId;
import da.finance.fact.asset.AssetDeposit;
import da.refapps.bond.auction.*;
import da.refapps.bond.fixedratebond.FixedRateBondFact;
import da.refapps.bond.lock.AuctionLockedCash;
import da.refapps.bond.redemption.RedemptionRequest;
import da.refapps.bond.roles.issuerrole.IssuanceRequest;
import da.refapps.bond.roles.issuerrole.IssuerRole;
import da.refapps.bond.settlement.AuctionSettleRequest;
import java.math.BigDecimal;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import org.junit.*;
import org.junit.rules.ExternalResource;

public class BondIssuanceIT {
  private static final Path RELATIVE_DAR_PATH = Paths.get("./target/bond-issuance.dar");
  private static final Integer sandboxPort = 6865;
  private static final int WAIT_TIMEOUT = 20;
  private static final String TEST_MODULE = "DA.RefApps.Bond.Test.MarketSetup";
  private static final String TEST_SCENARIO = "testMarketSetup";

  private static final Party ISSUER_PARTY = new Party("Issuer");
  private static final Party CSD_PARTY = new Party("CSD");
  private static final Party AGENT_PARTY = new Party("AuctionAgent");
  private static final Party BANK1_PARTY = new Party("Bank1");
  private static final Party BANK2_PARTY = new Party("Bank2");
  private static final Party BANK3_PARTY = new Party("Bank3");
  private static final Party CENTRALBANK_PARTY = new Party("CentralBank");

  private static Sandbox sandboxC =
      Sandbox.builder()
          .dar(RELATIVE_DAR_PATH)
          .projectDir(Paths.get("."))
          .module(TEST_MODULE)
          .scenario(TEST_SCENARIO)
          .parties(
              BANK1_PARTY.getValue(),
              BANK2_PARTY.getValue(),
              BANK3_PARTY.getValue(),
              AGENT_PARTY.getValue(),
              CENTRALBANK_PARTY.getValue(),
              ISSUER_PARTY.getValue(),
              CSD_PARTY.getValue())
          .setupAppCallback(Main::runBots)
          .build();

  @ClassRule public static ExternalResource compile = sandboxC.compilation();
  @Rule public Sandbox.Process sandbox = sandboxC.process();

  @Test
  public void testFullWorkflow() {
    // Issuance of a bond
    LocalDate now = LocalDate.now();
    LocalDate maturityDate = now.plusDays(365);
    BigDecimal couponRate = BigDecimal.valueOf(0.1);
    BigDecimal denomination = BigDecimal.valueOf(40.1);
    String currency = "USD";
    List<LocalDate> couponDates = Arrays.asList();

    IssuerRole.ContractId issuerRoleCid =
        sandbox.getCreatedContractId(
            ISSUER_PARTY, IssuerRole.TEMPLATE_ID, IssuerRole.ContractId::new);
    sandbox
        .getLedgerAdapter()
        .exerciseChoice(
            ISSUER_PARTY,
            issuerRoleCid.exerciseIssuerRole_Issuance(
                3000000L, now, currency, denomination, maturityDate, couponRate, couponDates));
    String bondIsin = "BOND-007";
    IssuanceRequest.ContractId issuanceRequest =
        sandbox.getCreatedContractId(
            CSD_PARTY, IssuanceRequest.TEMPLATE_ID, IssuanceRequest.ContractId::new);
    sandbox
        .getLedgerAdapter()
        .exerciseChoice(CSD_PARTY, issuanceRequest.exerciseIssuanceRequest_Accept(bondIsin));

    // Auction commission
    AssetDeposit.ContractId assetDeposit = findBondAssetDeposit(bondIsin);
    LocalDate auctionStartDate = now.plusDays(10);
    LocalDate auctionEndDate = auctionStartDate.plusDays(10);
    BigDecimal minPrize = BigDecimal.valueOf(40.0);
    Long size = 1000000L;
    sandbox
        .getLedgerAdapter()
        .exerciseChoice(
            ISSUER_PARTY,
            issuerRoleCid.exerciseIssuerRole_CommissionAuction(
                assetDeposit, auctionStartDate, auctionEndDate, minPrize, size));

    // Commission, by bot.
    // Acceptance of invitation
    AuctionInvitation.ContractId auctionInvitation =
        sandbox.getCreatedContractId(
            AGENT_PARTY, AuctionInvitation.TEMPLATE_ID, AuctionInvitation.ContractId::new);
    sandbox
        .getLedgerAdapter()
        .exerciseChoice(
            AGENT_PARTY, auctionInvitation.exerciseAuctionInvitation_Accept("testAuction"));

    Auction.ContractId auction1 =
        sandbox.getCreatedContractId(AGENT_PARTY, Auction.TEMPLATE_ID, Auction.ContractId::new);
    sandbox
        .getLedgerAdapter()
        .exerciseChoice(
            AGENT_PARTY,
            auction1.exerciseAuction_InviteBidders(
                Arrays.asList(
                    BANK1_PARTY.getValue(), BANK2_PARTY.getValue(), BANK3_PARTY.getValue())));

    sandbox
        .getLedgerAdapter()
        .setCurrentTime(Instant.ofEpochSecond(auctionEndDate.toEpochDay() * 24 * 60 * 60));

    // Bidding
    BidderParticipation.ContractId bidderParticipationBank1 =
        sandbox.getCreatedContractId(
            BANK1_PARTY, BidderParticipation.TEMPLATE_ID, BidderParticipation.ContractId::new);
    sandbox
        .getLedgerAdapter()
        .exerciseChoice(
            BANK1_PARTY,
            bidderParticipationBank1.exerciseBidderParticipation_PlaceBid(
                BigDecimal.valueOf(42.0), 200000L));

    BidderParticipation.ContractId bidderParticipationBank2 =
        sandbox.getCreatedContractId(
            BANK2_PARTY, BidderParticipation.TEMPLATE_ID, BidderParticipation.ContractId::new);
    sandbox
        .getLedgerAdapter()
        .exerciseChoice(
            BANK2_PARTY,
            bidderParticipationBank2.exerciseBidderParticipation_PlaceBid(
                BigDecimal.valueOf(25.0), 800000L));

    BidderParticipation.ContractId bidderParticipationBank3 =
        sandbox.getCreatedContractId(
            BANK3_PARTY, BidderParticipation.TEMPLATE_ID, BidderParticipation.ContractId::new);
    sandbox
        .getLedgerAdapter()
        .exerciseChoice(
            BANK3_PARTY,
            bidderParticipationBank3.exerciseBidderParticipation_PlaceBid(
                BigDecimal.valueOf(10.0), 800000L));

    AuctionBid.ContractId bid =
        sandbox.getCreatedContractId(
            BANK3_PARTY, AuctionBid.TEMPLATE_ID, AuctionBid.ContractId::new);
    AuctionLockedCash.ContractId lockedCash =
        sandbox.getCreatedContractId(
            BANK3_PARTY, AuctionLockedCash.TEMPLATE_ID, AuctionLockedCash.ContractId::new);

    sandbox
        .getLedgerAdapter()
        .exerciseChoice(
            BANK3_PARTY,
            bidderParticipationBank3.exerciseAuctionBidderParticipantion_RevokeLockedBid(
                bid, lockedCash));

    // Finalizing auction
    Auction.ContractId auction2 =
        sandbox.getCreatedContractId(AGENT_PARTY, Auction.TEMPLATE_ID, Auction.ContractId::new);
    sandbox.getLedgerAdapter().exerciseChoice(AGENT_PARTY, auction2.exerciseAuction_Finalize());

    // Sanity checks
    ContractWithId<AuctionSettleRequest.ContractId> settleReq1 =
        sandbox.getMatchedContract(
            BANK1_PARTY, AuctionSettleRequest.TEMPLATE_ID, AuctionSettleRequest.ContractId::new);
    assertEquals(
        42L * 200000L,
        AuctionSettleRequest.fromValue(settleReq1.record)
            .cashAmountToPay
            .toBigInteger()
            .longValue());

    AuctionParticipantSettleRequest.ContractId apSettleReq1 =
        sandbox.getCreatedContractId(
            BANK1_PARTY,
            AuctionParticipantSettleRequest.TEMPLATE_ID,
            AuctionParticipantSettleRequest.ContractId::new);
    sandbox
        .getLedgerAdapter()
        .exerciseChoice(BANK1_PARTY, apSettleReq1.exerciseAuctionParticipantSettleRequest_Settle());

    ContractWithId<AuctionParticipantSettleRequest.ContractId> apSettleReq2 =
            sandbox.getMatchedContract(
                    BANK2_PARTY,
                    AuctionParticipantSettleRequest.TEMPLATE_ID,
                    AuctionParticipantSettleRequest.ContractId::new);
    assertTrue(
            AuctionParticipantSettleRequest.fromValue(apSettleReq2.record).settleRequestCids.isEmpty());
    sandbox
        .getLedgerAdapter()
        .exerciseChoice(BANK2_PARTY, apSettleReq2.contractId.exerciseAuctionParticipantSettleRequest_Settle());

    // Requesting redemption at CSD
    sandbox
        .getLedgerAdapter()
        .setCurrentTime(Instant.ofEpochSecond(maturityDate.toEpochDay() * 24 * 60 * 60));
    FixedRateBondFact.ContractId fixedRateBondFact =
        sandbox.getCreatedContractId(
            ISSUER_PARTY, FixedRateBondFact.TEMPLATE_ID, FixedRateBondFact.ContractId::new);
    sandbox
        .getLedgerAdapter()
        .exerciseChoice(ISSUER_PARTY, issuerRoleCid.exerciseIssuerRole_Redeem(fixedRateBondFact));

    RedemptionRequest.ContractId redemptionRequest =
        sandbox.getCreatedContractId(
            CSD_PARTY, RedemptionRequest.TEMPLATE_ID, RedemptionRequest.ContractId::new);
    sandbox
        .getLedgerAdapter()
        .exerciseChoice(CSD_PARTY, redemptionRequest.exerciseRedemptionRequest_Accept());

    ContractWithId<AssetDeposit.ContractId> assetDepositFinal1 =
        sandbox.getMatchedContract(
            BANK1_PARTY, AssetDeposit.TEMPLATE_ID, AssetDeposit.ContractId::new);
    assertEquals(
        50000000L,
        AssetDeposit.fromValue(assetDepositFinal1.record)
            .asset
            .quantity
            .toBigInteger()
            .longValue());
    ContractWithId<AssetDeposit.ContractId> assetDepositFinal2 =
        sandbox.getMatchedContract(
            BANK1_PARTY, AssetDeposit.TEMPLATE_ID, AssetDeposit.ContractId::new);
    assertEquals(
            8400000L,
        AssetDeposit.fromValue(assetDepositFinal2.record)
            .asset
            .quantity
            .toBigInteger()
            .longValue());
  }

  AssetDeposit.ContractId findBondAssetDeposit(String expectedLabel) {
    while (true) {
      // This will fail, after there are no more asset deposit contracts
      ContractWithId<AssetDeposit.ContractId> assetDeposit =
          sandbox.getMatchedContract(
              ISSUER_PARTY, AssetDeposit.TEMPLATE_ID, AssetDeposit.ContractId::new);
      if (AssetDeposit.fromValue(assetDeposit.record).asset.id.label.equals(expectedLabel)) {
        return assetDeposit.contractId;
      }
    }
  }
}
