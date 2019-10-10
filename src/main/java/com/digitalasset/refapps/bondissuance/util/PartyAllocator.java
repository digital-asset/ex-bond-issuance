/**
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance.util;

import com.digitalasset.ledger.api.v1.admin.PartyManagementServiceGrpc;
import com.digitalasset.ledger.api.v1.admin.PartyManagementServiceOuterClass;
import io.grpc.ManagedChannel;
import java.util.*;
import java.util.stream.Collectors;

public class PartyAllocator {

  public static final String AUCTION_AGENT = "AuctionAgent";
  public static final String ISSUER = "Issuer";
  public static final String CSD = "CSD";
  public static final String BANK1 = "Bank1";
  public static final String BANK2 = "Bank2";
  public static final String BANK3 = "Bank3";
  public static final String OPERATOR = "Operator";
  public static final String REGULATOR = "Regulator";
  public static final String CENTRAL_BANK = "CentralBank";

  public static final String[] ALL_PARTIES =
      new String[] {
        AUCTION_AGENT, BANK1, BANK2, BANK3, CENTRAL_BANK, CSD, ISSUER, OPERATOR, REGULATOR
      };

  public static class AppParties {

    public boolean hasAuctionAgent() {
      return parties.contains(AUCTION_AGENT);
    }

    public boolean hasIssuer() {
      return parties.contains(ISSUER);
    }

    public boolean hasCSD() {
      return parties.contains(CSD);
    }

    public boolean hasBank1() {
      return parties.contains(BANK1);
    }

    public boolean hasBank2() {
      return parties.contains(BANK2);
    }

    public boolean hasBank3() {
      return parties.contains(BANK3);
    }

    public boolean hasOperator() {
      return parties.contains(OPERATOR);
    }

    public boolean hasRegulator() {
      return parties.contains(REGULATOR);
    }

    public boolean hasCentralBank() {
      return parties.contains(CENTRAL_BANK);
    }

    public AppParties(String[] parties) {
      this.parties = new HashSet<String>(Arrays.asList(parties));
    }

    private Set<String> parties;
  }

  public static class AllocatedParties {
    public String getAuctionAgent() {
      return parties.get(AUCTION_AGENT);
    }

    public String getIssuer() {
      return parties.get(ISSUER);
    }

    public String getCSD() {
      return parties.get(CSD);
    }

    public String getBank1() {
      return parties.get(BANK1);
    }

    public String getBank2() {
      return parties.get(BANK2);
    }

    public String getBank3() {
      return parties.get(BANK3);
    }

    public String getOperator() {
      return parties.get(OPERATOR);
    }

    public String getRegulator() {
      return parties.get(REGULATOR);
    }

    public String getCentralBank() {
      return parties.get(CENTRAL_BANK);
    }

    private Map<String, String> parties;

    public AllocatedParties(Map<String, String> parties) {
      this.parties = parties;
    }

    @Override
    public String toString() {
      return parties.toString();
    }
  }

  public static AllocatedParties allocate(ManagedChannel channel) {
    final PartyManagementServiceGrpc.PartyManagementServiceBlockingStub stub =
        PartyManagementServiceGrpc.newBlockingStub(channel);
    Map<String, String> parties = new HashMap();
    Map<String, String> alreadyKnownParties = getKnownParties(stub);
    tryToAllocateParty(stub, alreadyKnownParties, parties, AUCTION_AGENT);
    tryToAllocateParty(stub, alreadyKnownParties, parties, BANK1);
    tryToAllocateParty(stub, alreadyKnownParties, parties, BANK2);
    tryToAllocateParty(stub, alreadyKnownParties, parties, BANK3);
    tryToAllocateParty(stub, alreadyKnownParties, parties, CENTRAL_BANK);
    tryToAllocateParty(stub, alreadyKnownParties, parties, CSD);
    tryToAllocateParty(stub, alreadyKnownParties, parties, ISSUER);
    tryToAllocateParty(stub, alreadyKnownParties, parties, OPERATOR);
    tryToAllocateParty(stub, alreadyKnownParties, parties, REGULATOR);
    return new AllocatedParties(parties);
  }

  private static Map<String, String> getKnownParties(
      PartyManagementServiceGrpc.PartyManagementServiceBlockingStub stub) {
    PartyManagementServiceOuterClass.ListKnownPartiesResponse knownPartiesResponse =
        stub.listKnownParties(
            PartyManagementServiceOuterClass.ListKnownPartiesRequest.newBuilder().build());
    return knownPartiesResponse.getPartyDetailsList().stream()
        .collect(
            Collectors.toMap(
                PartyManagementServiceOuterClass.PartyDetails::getDisplayName,
                PartyManagementServiceOuterClass.PartyDetails::getParty));
  }

  private static void tryToAllocateParty(
      PartyManagementServiceGrpc.PartyManagementServiceBlockingStub stub,
      Map<String, String> alreadyKnownParties,
      Map<String, String> parties,
      String party) {
    String maybePartyId = alreadyKnownParties.get(party);
    if (maybePartyId == null) {
      PartyManagementServiceOuterClass.AllocatePartyResponse allocatePartyResponse =
          stub.allocateParty(
              PartyManagementServiceOuterClass.AllocatePartyRequest.newBuilder()
                  .setDisplayName(party)
                  .setPartyIdHint(party)
                  .build());
      maybePartyId = allocatePartyResponse.getPartyDetails().getParty();
    }
    parties.put(party, maybePartyId);
  }
}
