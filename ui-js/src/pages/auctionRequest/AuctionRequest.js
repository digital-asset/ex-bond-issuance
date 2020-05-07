/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import React from "react";
import Contracts from "../../components/Contracts/Contracts";
import { useQuery } from "@daml/react";

import { AuctionInvition } from "@daml.js/bond-issuance-2.0.0/lib/DA/RefApps/Bond/Roles/AuctionAgentRole";

export default function Report() {

  const invitations = useQuery(AuctionInvition);
  // const exerciseGive = useExercise(Asset.Give);
  return (
    <Contracts
      contracts={invitations.contracts}
      columns={[["Contract Id", "contractId"],

      ["Requestor", "payload.auction.issuer"],
      ["Asset", "payload.auction.bondBundleData.assetLabel"],
      ["Quantity", "payload.auction.size"],
      ]} />);
}	