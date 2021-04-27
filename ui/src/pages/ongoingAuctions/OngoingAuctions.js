/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import React from "react";
import Contracts from "../../components/Contracts/Contracts";
import { field } from "../../components/Contracts/Contracts";
import { useLedger, useStreamQueries } from "@daml/react";
import { Auction } from "@daml.js/bond-issuance-2.0.0/lib/DA/RefApps/Bond/Auction";
import { standardizePartyId } from "../../components/Util";
import { getParties, useSortedPartyNames } from "../login/Login";

export default function Report() {
  const sortedPartyNames = useSortedPartyNames();
  const parties = getParties(sortedPartyNames);

  const ledger = useLedger()
  const ongoingAuctions = useStreamQueries(Auction);

  const bidders = "Bidders (separated by commas)"
  const doInviteBidders = function(contract, params) {
    const bidderList = params[bidders].split(",").map(i => standardizePartyId(parties, i.trim()));
    const payload = {
      bidders: bidderList
    }
    ledger.exercise(Auction.Auction_InviteBidders, contract.contractId, payload);
  };

  const doFinalize = function(c) {
    ledger.exercise(Auction.Auction_Finalize, c.contractId, {})
  }

  return (<Contracts contracts={ongoingAuctions.contracts}
    columns={[["Contract Id", "contractId"],
    ["Auction Name", "payload.auctionName"],
    ["Issuer", "payload.issuer"],
    ["Asset", "payload.bondBundleData.assetLabel"],
    ["Size", "payload.size"],
    ["From", "payload.startDate"],
    ["To", "payload.endDate"],
    ["Min Price", "payload.minPrice"],
    ["Auction Agent", "payload.auctionAgent"],
    ]}
    actions={[
      ["Finalize", doFinalize]
    ]}
    dialogs={[
      ["Invite bidders",
        [field(bidders, "text")],
         doInviteBidders
      ]
    ]}
  />);
}
