/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import React from "react";
import Contracts from "../../components/Contracts/Contracts";
import { useQuery } from "@daml/react";

import { Auction } from "@daml2ts/bond-issuance-2.0.0/lib/DA/RefApps/Bond/Auction";

export default function Report() {

  const reviews = useQuery(Auction);

  return (<Contracts contracts={reviews.contracts}
    columns={[["Contract Id", "contractId"],
    ["Auction Name", "payload.auctionName"],
    ["Issuer", "payload.issuer"],
    ["Asset", "payload.bondBundleData.assetLabel"],
    ["Size", "payload.size"],
    ["Auction Type", "payload.auctionType"],
    ["From", "payload.startDate"],
    ["To", "payload.endDate"],
    ["Min Price", "payload.minPrice"],
    ["Auction Agent", "payload.auctionAgent"],
    ]} />);
}	