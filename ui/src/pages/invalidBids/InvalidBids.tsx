/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import { InvalidBidNotification } from "@daml.js/bond-issuance-2.0.0/lib/DA/RefApps/Bond/Auction";
import { useStreamQueries } from "@daml/react";
import React from "react";
import Contracts from "../../components/Contracts/Contracts";


export default function Report() {

  const reviews = useStreamQueries(InvalidBidNotification);

  return (<Contracts contracts={reviews.contracts}

    columns={[
      {name: "Contract Id", path: "contractId"},
      {name: "Auction Agent", path: "payload.bid.auctionAgent"},
      {name: "Auction Name", path: "payload.bid.auctionName"},
      {name: "Price",path:  "payload.bid.bidData.price"},
      {name: "Quantity", path: "payload.bid.bidData.quantity"},
      {name: "Reason", path: "payload.reason"}
    ]}
    dialogs={[]}
    actions={[]}
    />);
}
