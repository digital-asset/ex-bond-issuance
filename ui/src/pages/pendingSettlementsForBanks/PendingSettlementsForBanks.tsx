/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import { AuctionParticipantSettleRequest } from "@daml.js/bond-issuance-2.0.0/lib/DA/RefApps/Bond/Auction";
import { useLedger, useStreamQueries } from "@daml/react";
import React from "react";
import Contracts from "../../components/Contracts/Contracts";

export default function Report() {

  const ledger = useLedger();
  const settlementRequests = useStreamQueries(AuctionParticipantSettleRequest);

  const doSettle = function(c: any) {
    ledger.exercise(AuctionParticipantSettleRequest.AuctionParticipantSettleRequest_Settle, c.contractId, {})
  }

  return (<Contracts contracts={settlementRequests.contracts}
    columns={[
    {name: "Contract Id", path: "contractId"},
    {name: "Seller", path: "payload.issuer"},
    {name: "Auction Name", path: "payload.auctionName"},
    ]}
    dialogs={[]}
    actions={[
    {
      name: "Settle",
      handle: doSettle,
      shouldDisplay: () => true, //(c) => c.payload.verifier === standardizePartyId(parties, party),
      paramName: "",
      items:[],
      values:[]
  }
    ]}
  />);
}
