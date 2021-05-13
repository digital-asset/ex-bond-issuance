/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import { Auction } from "@daml.js/bond-issuance-2.0.0/lib/DA/RefApps/Bond/Auction";
import { useLedger, useParty, useStreamQueries } from "@daml/react";
import React from "react";
import Contracts, { field, text } from "../../components/Contracts/Contracts";
import { standardizePartyId } from "../../components/Util";
import { useSortedPartyNames } from "../login/Login";

export default function Report() {

  const party = useParty();
  const parties = useSortedPartyNames();
  const ledger = useLedger();
  const ongoingAuctions = useStreamQueries(Auction);

  const bidders = "Bidders (separated by commas)"
  const doInviteBidders = function(contract: any, params: any) {
    const bidderList = params[bidders].split(",").map((i : string) => standardizePartyId(parties, i.trim()));
    const payload = {
      bidders: bidderList
    }
    ledger.exercise(Auction.Auction_InviteBidders, contract.contractId, payload);
  };

  const doFinalize = function(c: any) {
    ledger.exercise(Auction.Auction_Finalize, c.contractId, {})
  }

  return (<Contracts contracts={ongoingAuctions.contracts}
    columns={[
    {name: "Contract Id", path: "contractId"},
    {name: "Auction Name", path: "payload.auctionName"},
    {name: "Issuer", path: "payload.issuer"},
    {name: "Asset", path: "payload.bondBundleData.assetLabel"},
    {name: "Size", path: "payload.size"},
    {name: "From", path: "payload.startDate"},
    {name: "To", path: "payload.endDate"},
    {name: "Min Price", path: "payload.minPrice"},
    {name: "Auction Agent", path: "payload.auctionAgent"},
    ]}
    actions={[
      {
        name: "Finalize",
        handle: doFinalize,
        shouldDisplay: () => true,
        paramName:"",
        items:[],
        values:[]
      }
    ]}
    dialogs={[
      {
        name: "Invite Bidders",
        dialogFields:[
          field(bidders, text)],
          action: doInviteBidders,
          shouldDisplay: () => party === 'AuctionAgent'
    }
    ]}
  />);
}
