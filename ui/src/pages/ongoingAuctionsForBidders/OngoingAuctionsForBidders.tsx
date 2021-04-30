/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import { AuctionBid, BidderParticipation } from "@daml.js/bond-issuance-2.0.0/lib/DA/RefApps/Bond/Auction";
import { AuctionLockedCash } from "@daml.js/bond-issuance-2.0.0/lib/DA/RefApps/Bond/Lock";
import { useLedger, useStreamQueries } from "@daml/react";
import React from "react";
import Contracts, { field, menu, number } from "../../components/Contracts/Contracts";


export default function Report() {

  const ledger = useLedger();
  const reviews = useStreamQueries(BidderParticipation);

  const price = "Price"
  const quantity = "Quantity"
  const doPlaceBid = function(c: any, params: any) {
    const payload = {
      price: params[price],
      quantity: params[quantity]
    }
    ledger.exercise(BidderParticipation.BidderParticipation_PlaceBid, c.contractId, payload)
  }

  const lockedBid = useStreamQueries(AuctionBid);
  const lockedCash = useStreamQueries(AuctionLockedCash);

  const auctionBidCid = "Bid"
  const auctionLockedCashCid = "Locked cash"
  const doRevokeBid = function(c: any, params: any) {
    const payload = {
      auctionBidCid: params[auctionBidCid],
      auctionLockedCashCid: params[auctionLockedCashCid]
    }
    ledger.exercise(BidderParticipation.AuctionBidderParticipantion_RevokeLockedBid, c.contractId, payload)
  }

  function bidDataToText(bidData: any) {
    return `${bidData.submissionTime}: ${bidData.price} (Quantity: ${bidData.quantity})`
  }

  return (<Contracts contracts={reviews.contracts}
    columns={[
      {name: "Contract Id", path: "contractId"},
      {name: "Auction Agent", path: "payload.auctionAgent"},
      {name: "Auction Name", path: "payload.auctionName"},
      {name: "Bidder", path: "payload.bidder"},
      {name: "Issuer", path: "payload.issuer"},
      {name: "Size", path: "payload.size"},
      {name: "Start Date", path: "payload.startDate"},
      {name: "End Date", path: "payload.endDate"},
      {name: "Bond Name", path: "payload.fixedRateBondFact.instrumentId.label"},
      {name: "Denomination", path: "payload.fixedRateBondFact.denomination"},
      {name: "Rate", path: "payload.fixedRateBondFact.rate"},
      {name: "Maturity Date", path: "payload.fixedRateBondFact.maturityDate"},
    ]}
    dialogs={[
      {
        name: "Place bid",
        dialogFields:[
          field(price, number),
          field(quantity, number)],
        action: doPlaceBid
        },
      {
        name: "Revoke locked bid",
        dialogFields:[
          field(auctionBidCid, menu(lockedBid.contracts.map(c => bidDataToText(c.payload.bidData)), lockedBid.contracts.map(c => c.contractId))),
          field(auctionLockedCashCid, menu(lockedCash.contracts.map(c => c.payload.account.id.label), lockedCash.contracts.map(c => c.contractId)))
        ],
         action: doRevokeBid
        }
    ]}
    actions={[]}
  />);
}
