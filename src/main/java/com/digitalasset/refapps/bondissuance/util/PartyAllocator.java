/**
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance.util;

import com.digitalasset.ledger.api.v1.admin.PartyManagementServiceGrpc;
import com.digitalasset.ledger.api.v1.admin.PartyManagementServiceOuterClass;
import io.grpc.ManagedChannel;

public class PartyAllocator {

  public static class AllocatedParties {
    public String getAuctionAgent() {
      return auctionAgent;
    }

    public String getIssuer() {
      return issuer;
    }

    public String getCSD() {
      return CSD;
    }

    public String getBank1() {
      return bank1;
    }

    public String getBank2() {
      return bank2;
    }

    public String getBank3() {
      return bank3;
    }

    public String getOperator() {
      return operator;
    }

    public String getRegulator() {
      return regulator;
    }

    public String getCentralBank() {
      return centralBank;
    }

    private String auctionAgent;
    private String issuer;
    private String CSD;
    private String bank1;
    private String bank2;
    private String bank3;
    private String operator;
    private String regulator;
    private String centralBank;

    public AllocatedParties(
        String auctionAgent,
        String bank1,
        String bank2,
        String bank3,
        String centralBank,
        String csd,
        String issuer,
        String operator,
        String regulator) {
      this.auctionAgent = auctionAgent;
      this.issuer = issuer;
      this.CSD = csd;
      this.bank1 = bank1;
      this.bank2 = bank2;
      this.bank3 = bank3;
      this.operator = operator;
      this.regulator = regulator;
      this.centralBank = centralBank;
    }
  }

  public static AllocatedParties allocate(ManagedChannel channel) {
    final PartyManagementServiceGrpc.PartyManagementServiceBlockingStub stub =
        PartyManagementServiceGrpc.newBlockingStub(channel);
    return new AllocatedParties(
        allocateParty(stub, "AuctionAgent"),
        allocateParty(stub, "Bank1"),
        allocateParty(stub, "Bank2"),
        allocateParty(stub, "Bank3"),
        allocateParty(stub, "CentralBank"),
        allocateParty(stub, "CSD"),
        allocateParty(stub, "Issuer"),
        allocateParty(stub, "Operator"),
        allocateParty(stub, "Regulator"));
  }

  private static String allocateParty(
      PartyManagementServiceGrpc.PartyManagementServiceBlockingStub stub, String party) {
    PartyManagementServiceOuterClass.AllocatePartyResponse response =
        stub.allocateParty(
            PartyManagementServiceOuterClass.AllocatePartyRequest.newBuilder()
                .setDisplayName(party)
                .setPartyIdHint(party)
                .build());
    return response.getPartyDetails().getParty();
  }
}
