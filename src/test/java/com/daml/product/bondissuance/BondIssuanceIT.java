/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.daml.product.bondissuance;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import com.daml.extensions.testing.junit4.Sandbox;
import com.daml.extensions.testing.ledger.DefaultLedgerAdapter;
import com.daml.extensions.testing.utils.ContractWithId;
import com.daml.ledger.javaapi.data.Party;
import da.finance.asset.AssetDeposit;
import da.refapps.bond.auction.Auction;
import da.refapps.bond.auction.AuctionBid;
import da.refapps.bond.auction.AuctionInvitation;
import da.refapps.bond.auction.AuctionParticipantSettleRequest;
import da.refapps.bond.auction.BidderParticipation;
import da.refapps.bond.fixedratebond.FixedRateBondFact;
import da.refapps.bond.lock.AuctionLockedCash;
import da.refapps.bond.redemption.RedemptionPayoutInfo;
import da.refapps.bond.redemption.RedemptionRequest;
import da.refapps.bond.roles.issuerrole.IssuanceRequest;
import da.refapps.bond.roles.issuerrole.IssuerRole;
import da.refapps.bond.settlement.AuctionSettleRequest;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Duration;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import org.junit.ClassRule;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExternalResource;
import org.junit.rules.RuleChain;
import org.junit.rules.TestRule;

public class BondIssuanceIT {
  private static final Path RELATIVE_DAR_PATH = Paths.get("./target/bond-issuance.dar");
  private static final Path RELATIVE_TRIGGER_DAR_PATH =
      Paths.get("./target/bond-issuance-triggers.dar");

  private static final Party ISSUER_PARTY = new Party("Issuer");
  private static final Party CSD_PARTY = new Party("Csd");
  private static final Party AGENT_PARTY = new Party("AuctionAgent");
  private static final Party BANK1_PARTY = new Party("Bank1");
  private static final Party BANK2_PARTY = new Party("Bank2");
  private static final Party BANK3_PARTY = new Party("Bank3");
  private static final Party CENTRALBANK_PARTY = new Party("CentralBank");

  private static final Sandbox sandbox =
      Sandbox.builder()
          .dar(RELATIVE_DAR_PATH)
          .parties(
              BANK1_PARTY.getValue(),
              BANK2_PARTY.getValue(),
              BANK3_PARTY.getValue(),
              AGENT_PARTY.getValue(),
              CENTRALBANK_PARTY.getValue(),
              ISSUER_PARTY.getValue(),
              CSD_PARTY.getValue())
          .useWallclockTime()
          .observationTimeout(Duration.ofMinutes(5L))
          .moduleAndScript("DA.RefApps.Bond.MarketSetup.MarketSetupScript", "setupMarket")
          .build();

  @ClassRule public static ExternalResource sandboxClassRule = sandbox.getClassRule();

  @Rule
  public TestRule sandboxWithTriggers =
      RuleChain.outerRule(sandbox.getRule()).around(new Automation(sandbox::getSandboxPort));

  @Test
  public void testFullWorkflow() throws IOException, InterruptedException {
    DefaultLedgerAdapter ledgerAdapter = sandbox.getLedgerAdapter();

    // Issuance of a bond
    LocalDate now = LocalDate.now().plusDays(1);
    LocalDate maturityDate = now.plusDays(365);
    BigDecimal couponRate = BigDecimal.valueOf(0.1);
    BigDecimal denomination = BigDecimal.valueOf(40.1);
    String currency = "USD";
    List<LocalDate> couponDates = Collections.emptyList();

    IssuerRole.ContractId issuerRoleCid =
        ledgerAdapter.getCreatedContractId(
            ISSUER_PARTY, IssuerRole.TEMPLATE_ID, IssuerRole.ContractId::new);
    ledgerAdapter.exerciseChoice(
        ISSUER_PARTY,
        issuerRoleCid.exerciseIssuerRole_Issuance(
            3000000L, now, currency, denomination, maturityDate, couponRate, couponDates));
    String bondIsin = "BOND-007";
    IssuanceRequest.ContractId issuanceRequest =
        ledgerAdapter.getCreatedContractId(
            CSD_PARTY, IssuanceRequest.TEMPLATE_ID, IssuanceRequest.ContractId::new);
    ledgerAdapter.exerciseChoice(
        CSD_PARTY, issuanceRequest.exerciseIssuanceRequest_Accept(bondIsin));

    // Auction commission
    AssetDeposit.ContractId assetDeposit = findBondAssetDeposit(bondIsin);
    LocalDate auctionStartDate = now.plusDays(10);
    LocalDate auctionEndDate = auctionStartDate.plusDays(10);
    BigDecimal minPrize = BigDecimal.valueOf(40.0);
    Long size = 1000000L;
    ledgerAdapter.exerciseChoice(
        ISSUER_PARTY,
        issuerRoleCid.exerciseIssuerRole_CommissionAuction(
            assetDeposit, auctionStartDate, auctionEndDate, minPrize, size));

    //    System.in.read();
    // Commission, by bot.
    // Acceptance of invitation
    AuctionInvitation.ContractId auctionInvitation =
        ledgerAdapter.getCreatedContractId(
            AGENT_PARTY, AuctionInvitation.TEMPLATE_ID, AuctionInvitation.ContractId::new);
    ledgerAdapter.exerciseChoice(
        AGENT_PARTY, auctionInvitation.exerciseAuctionInvitation_Accept("testAuction"));

    Auction.ContractId auction1 =
        ledgerAdapter.getCreatedContractId(
            AGENT_PARTY, Auction.TEMPLATE_ID, Auction.ContractId::new);
    ledgerAdapter.exerciseChoice(
        AGENT_PARTY,
        auction1.exerciseAuction_InviteBidders(
            Arrays.asList(BANK1_PARTY.getValue(), BANK2_PARTY.getValue(), BANK3_PARTY.getValue())));

    // Bidding
    BidderParticipation.ContractId bidderParticipationBank1 =
        ledgerAdapter.getCreatedContractId(
            BANK1_PARTY, BidderParticipation.TEMPLATE_ID, BidderParticipation.ContractId::new);
    ledgerAdapter.exerciseChoice(
        BANK1_PARTY,
        bidderParticipationBank1.exerciseBidderParticipation_PlaceBid(
            BigDecimal.valueOf(42.0), 200000L));

    BidderParticipation.ContractId bidderParticipationBank2 =
        ledgerAdapter.getCreatedContractId(
            BANK2_PARTY, BidderParticipation.TEMPLATE_ID, BidderParticipation.ContractId::new);
    ledgerAdapter.exerciseChoice(
        BANK2_PARTY,
        bidderParticipationBank2.exerciseBidderParticipation_PlaceBid(
            BigDecimal.valueOf(25.0), 800000L));

    BidderParticipation.ContractId bidderParticipationBank3 =
        ledgerAdapter.getCreatedContractId(
            BANK3_PARTY, BidderParticipation.TEMPLATE_ID, BidderParticipation.ContractId::new);
    ledgerAdapter.exerciseChoice(
        BANK3_PARTY,
        bidderParticipationBank3.exerciseBidderParticipation_PlaceBid(
            BigDecimal.valueOf(10.0), 800000L));

    AuctionBid.ContractId bid =
        ledgerAdapter.getCreatedContractId(
            BANK3_PARTY, AuctionBid.TEMPLATE_ID, AuctionBid.ContractId::new);
    AuctionLockedCash.ContractId lockedCash =
        ledgerAdapter.getCreatedContractId(
            BANK3_PARTY, AuctionLockedCash.TEMPLATE_ID, AuctionLockedCash.ContractId::new);

    ledgerAdapter.exerciseChoice(
        BANK3_PARTY,
        bidderParticipationBank3.exerciseAuctionBidderParticipantion_RevokeLockedBid(
            bid, lockedCash));

    // Finalizing auction
    Auction.ContractId auction2 =
        ledgerAdapter.getCreatedContractId(
            AGENT_PARTY, Auction.TEMPLATE_ID, Auction.ContractId::new);
    ledgerAdapter.exerciseChoice(AGENT_PARTY, auction2.exerciseAuction_Finalize());

    // Sanity checks
    ContractWithId<AuctionSettleRequest.ContractId> settleReq1 =
        ledgerAdapter.getMatchedContract(
            BANK1_PARTY, AuctionSettleRequest.TEMPLATE_ID, AuctionSettleRequest.ContractId::new);
    assertEquals(
        42L * 200000L,
        AuctionSettleRequest.fromValue(settleReq1.record)
            .cashAmountToPay
            .toBigInteger()
            .longValue());

    AuctionParticipantSettleRequest.ContractId apSettleReq1 =
        ledgerAdapter.getCreatedContractId(
            BANK1_PARTY,
            AuctionParticipantSettleRequest.TEMPLATE_ID,
            AuctionParticipantSettleRequest.ContractId::new);
    ledgerAdapter.exerciseChoice(
        BANK1_PARTY, apSettleReq1.exerciseAuctionParticipantSettleRequest_Settle());

    ContractWithId<AuctionParticipantSettleRequest.ContractId> apSettleReq2 =
        ledgerAdapter.getMatchedContract(
            BANK2_PARTY,
            AuctionParticipantSettleRequest.TEMPLATE_ID,
            AuctionParticipantSettleRequest.ContractId::new);
    assertTrue(
        AuctionParticipantSettleRequest.fromValue(apSettleReq2.record).settleRequestCids.isEmpty());
    ledgerAdapter.exerciseChoice(
        BANK2_PARTY, apSettleReq2.contractId.exerciseAuctionParticipantSettleRequest_Settle());

    ledgerAdapter.getCreatedContractId(
        BANK1_PARTY, RedemptionPayoutInfo.TEMPLATE_ID, RedemptionPayoutInfo.ContractId::new);

    // Requesting redemption at CSD
    FixedRateBondFact.ContractId fixedRateBondFact =
        ledgerAdapter.getCreatedContractId(
            ISSUER_PARTY, FixedRateBondFact.TEMPLATE_ID, FixedRateBondFact.ContractId::new);
    ledgerAdapter.exerciseChoice(
        ISSUER_PARTY, issuerRoleCid.exerciseIssuerRole_Redeem(fixedRateBondFact));

    RedemptionRequest.ContractId redemptionRequest =
        ledgerAdapter.getCreatedContractId(
            CSD_PARTY, RedemptionRequest.TEMPLATE_ID, RedemptionRequest.ContractId::new);

    ledgerAdapter.exerciseChoice(CSD_PARTY, redemptionRequest.exerciseRedemptionRequest_Accept());

    Thread.sleep(120_000);
    assertTrue(
        ledgerAdapter.observeMatchingContracts(
            BANK1_PARTY,
            AssetDeposit.TEMPLATE_ID,
            AssetDeposit::fromValue,
            false,
            assetDepositFinal -> // 50 000 000 - (42 * 200 000)
            assetDepositFinal.asset.quantity.compareTo(BigDecimal.valueOf(41_600_000L)) == 0,
            assetDepositFinal -> // Redemption value (with coupon): 40.1 * 200 000 * 1.1
            assetDepositFinal.asset.quantity.compareTo(BigDecimal.valueOf(8_822_000L)) == 0));
  }

  private AssetDeposit.ContractId findBondAssetDeposit(String expectedLabel) {
    while (true) {
      // This will fail, after there are no more asset deposit contracts
      ContractWithId<AssetDeposit.ContractId> assetDeposit =
          sandbox
              .getLedgerAdapter()
              .getMatchedContract(
                  ISSUER_PARTY, AssetDeposit.TEMPLATE_ID, AssetDeposit.ContractId::new);
      if (AssetDeposit.fromValue(assetDeposit.record).asset.id.label.equals(expectedLabel)) {
        return assetDeposit.contractId;
      }
    }
  }
}
