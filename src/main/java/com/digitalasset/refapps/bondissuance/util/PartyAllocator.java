/**
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance.util;

import static com.digitalasset.ledger.api.v1.admin.PartyManagementServiceGrpc.PartyManagementServiceBlockingStub;
import static com.digitalasset.ledger.api.v1.admin.PartyManagementServiceGrpc.newBlockingStub;

import com.digitalasset.ledger.api.v1.admin.PartyManagementServiceOuterClass.AllocatePartyRequest;
import com.digitalasset.ledger.api.v1.admin.PartyManagementServiceOuterClass.AllocatePartyResponse;
import com.digitalasset.ledger.api.v1.admin.PartyManagementServiceOuterClass.ListKnownPartiesRequest;
import com.digitalasset.ledger.api.v1.admin.PartyManagementServiceOuterClass.ListKnownPartiesResponse;
import com.digitalasset.ledger.api.v1.admin.PartyManagementServiceOuterClass.PartyDetails;
import io.grpc.ManagedChannel;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class PartyAllocator {

  private static final String AUCTION_AGENT = "AuctionAgent";
  private static final String ISSUER = "Issuer";
  private static final String CSD = "CSD";
  private static final String BANK1 = "Bank1";
  private static final String BANK2 = "Bank2";
  private static final String BANK3 = "Bank3";
  private static final String OPERATOR = "Operator";
  private static final String REGULATOR = "Regulator";
  private static final String CENTRAL_BANK = "CentralBank";

  static final String[] ALL_PARTIES =
      new String[] {
        AUCTION_AGENT, BANK1, BANK2, BANK3, CENTRAL_BANK, CSD, ISSUER, OPERATOR, REGULATOR
      };

  private final PartyManagementServiceBlockingStub partyManagement;

  public PartyAllocator(ManagedChannel channel) {
    partyManagement = newBlockingStub(channel);
  }

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
      this.parties = new HashSet<>(Arrays.asList(parties));
    }

    private final Set<String> parties;
  }

  public static class AllParties {
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

    private final Map<String, String> parties;

    public AllParties(Map<String, String> parties) {
      this.parties = parties;
    }

    @Override
    public String toString() {
      return parties.toString();
    }
  }

  public AllParties getAllPartyIDs(AppParties partiesToAllocate) throws InterruptedException {
    Map<String, String> parties = allocate(partiesToAllocate);
    waitAndAddOtherParties(parties);
    return new AllParties(parties);
  }

  private Map<String, String> allocate(AppParties partiesToAllocate) {
    Stream<PartyDetails> partyDetails =
        partiesToAllocate.parties.stream()
            .map(PartyAllocator::createAllocationRequestFor)
            .map(partyManagement::allocateParty)
            .map(AllocatePartyResponse::getPartyDetails);
    return toByNameMap(partyDetails);
  }

  private void waitAndAddOtherParties(Map<String, String> parties) throws InterruptedException {
    while (existsMissingParty(parties)) {
      ListKnownPartiesResponse knownPartiesResponse = listKnownParties();
      Map<String, String> knownParties =
          toByNameMap(knownPartiesResponse.getPartyDetailsList().stream());
      parties.putAll(knownParties);
      if (existsMissingParty(parties)) {
        Thread.sleep(1000);
      }
    }
  }

  private Map<String, String> toByNameMap(Stream<PartyDetails> partyDetails) {
    return partyDetails.collect(
        Collectors.toMap(PartyDetails::getDisplayName, PartyDetails::getParty));
  }

  private ListKnownPartiesResponse listKnownParties() {
    return partyManagement.listKnownParties(ListKnownPartiesRequest.newBuilder().build());
  }

  private static boolean existsMissingParty(Map<String, String> parties) {
    return !parties.keySet().containsAll(Arrays.asList(ALL_PARTIES));
  }

  private static AllocatePartyRequest createAllocationRequestFor(String party) {
    return AllocatePartyRequest.newBuilder().setDisplayName(party).setPartyIdHint(party).build();
  }
}
