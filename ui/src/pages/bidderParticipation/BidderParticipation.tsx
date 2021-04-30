/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import { BidderParticipation } from "@daml.js/bond-issuance-2.0.0/lib/DA/RefApps/Bond/Auction";
import { useStreamQueries } from "@daml/react";
import React from "react";
import Contracts from "../../components/Contracts/Contracts";


export default function Report() {

  const reviews = useStreamQueries(BidderParticipation);

  return (<Contracts contracts={reviews.contracts}
    columns={[
      {name: "Contract Id", path: "contractId"},
      {name: "Auction Agent", path: "payload.auctionAgent"},
      {name: "Auction Name", path: "payload.auctionName"},
      {name: "Bidder", path: "payload.bidder"},
      {name: "Issuer", path: "payload.issuer"},
      {name: "Size", path: "payload.size"},
      {name: "Start Date", path: "payload.startDate"},
      {name: "End Date", path: "payload.endDate"}
    ]}
    dialogs={[]}
    actions={[]}
    />);
}
