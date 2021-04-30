/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import { AuctionInvitation } from "@daml.js/bond-issuance-2.0.0/lib/DA/RefApps/Bond/Auction";
import { useLedger, useStreamQueries } from "@daml/react";
import React from "react";
import Contracts from "../../components/Contracts/Contracts";


export default function Report() {

  const ledger = useLedger();
  const invitations = useStreamQueries(AuctionInvitation);

  const doAccept = function(c: any, param: any) {
    ledger.exercise(AuctionInvitation.AuctionInvitation_Accept, c.contractId, { auctionName: param })
  }

  return (
    <Contracts
      contracts={invitations.contracts}
      columns={[
        {name: "Contract Id", path: "contractId"},
        {name: "Requestor", path: "payload.auction.issuer"},
        {name: "Asset", path: "payload.auction.bondBundleData.assetLabel"},
        {name: "Quantity", path: "payload.auction.size"}
      ]}
      dialogs={[]}
      actions={[
        {
          name: "Accept",
          handle: doAccept,
          paramName: "Auction name",
          shouldDisplay: () => true, //(c) => c.payload.xxxx === standardizePartyId(parties, party),
          items:[],
          values:[]}
      ]}
    />);
}
