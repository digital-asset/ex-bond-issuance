/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import React from "react";
import Contracts from "../../components/Contracts/Contracts";
import { field } from "../../components/Contracts/Contracts";
import { useStreamQuery, useLedger } from "@daml/react";

import { BidderParticipation, AuctionBid } from "@daml.js/bond-issuance-2.0.0/lib/DA/RefApps/Bond/Auction";
import { AuctionLockedCash } from "@daml.js/bond-issuance-2.0.0/lib/DA/RefApps/Bond/Lock";

export default function Report() {

  const ledger = useLedger();
  const reviews = useStreamQuery(BidderParticipation);

  const price = "Price"
  const quantity = "Quantity"
  const doPlaceBid = function(c, params) {
    const payload = {
      price: params[price],
      quantity: params[quantity]
    }
    ledger.exercise(BidderParticipation.BidderParticipation_PlaceBid, c.contractId, payload)
  }

  const lockedBid = useStreamQuery(AuctionBid);
  const lockedCash = useStreamQuery(AuctionLockedCash);

  const auctionBidCid = "Bid"
  const auctionLockedCashCid = "Locked cash"
  const doRevokeBid = function(c, params) {
    const payload = {
      auctionBidCid: params[auctionBidCid],
      auctionLockedCashCid: params[auctionLockedCashCid]
    }
    ledger.exercise(BidderParticipation.AuctionBidderParticipantion_RevokeLockedBid, c.contractId, payload)
  }

  function bidDataToText(bidData) {
    return `${bidData.submissionTime}: ${bidData.price} (Quantity: ${bidData.quantity})`
  }

  return (<Contracts contracts={reviews.contracts}
    columns={[
      ["Contract Id", "contractId"],
      ["Auction Agent", "payload.auctionAgent"],
      ["Auction Name", "payload.auctionName"],
      ["Bidder", "payload.bidder"],
      ["Issuer", "payload.issuer"],
      ["Size", "payload.size"],
      ["Start Date", "payload.startDate"],
      ["End Date", "payload.endDate"],
      ["Bond Name", "payload.fixedRateBondFact.instrumentId.label"],
      ["Denomination", "payload.fixedRateBondFact.denomination"],
      ["Rate", "payload.fixedRateBondFact.rate"],
      ["Maturity Date", "payload.fixedRateBondFact.maturityDate"],
    ]}
    dialogs={[
      ["Place bid",
        [field(price, "number"),
         field(quantity, "number")],
         doPlaceBid
      ],
      ["Revoke locked bid",
        [field(auctionBidCid, "menu", lockedBid.contracts.map(c => c.contractId), lockedBid.contracts.map(c => bidDataToText(c.payload.bidData))),
         field(auctionLockedCashCid, "text", lockedCash.contracts.map(c => c.contractId), lockedCash.contracts.map(c => c.payload.account.id.label))],
         doRevokeBid
      ]
    ]}
  />);
}
