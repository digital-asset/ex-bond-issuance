/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import React from "react";
import Contracts from "../../components/Contracts/Contracts";
import { useQuery } from "@daml/react";

import { InvalidBidNotification } from "@daml.js/bond-issuance-2.0.0/lib/DA/RefApps/Bond/Auction";

export default function Report() {

  const reviews = useQuery(InvalidBidNotification);
  // const exerciseGive = useExercise(Asset.Give);

  return (<Contracts contracts={reviews.contracts}

    columns={[["Contract Id", "contractId"],

    ["Auction Agent", "payload.bid.auctionAgent"],
    ["Auction Name", "payload.bid.auctionName"],
    ["Price", "payload.bid.bidData.price"],
    ["Quantity", "payload.bid.bidData.quantity"],
    ["Reason", "payload.reason"],
    ]} />);
}	
