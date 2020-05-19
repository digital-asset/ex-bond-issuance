/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import React from "react";
import Contracts from "../../components/Contracts/Contracts";
import { useQuery, useLedger } from "@daml/react";

import { AuctionInvitation } from "@daml.js/bond-issuance-2.0.0/lib/DA/RefApps/Bond/Auction";

export default function Report() {

  const ledger = useLedger();
  const invitations = useQuery(AuctionInvitation);

  const doAccept = function(c, param) {
    ledger.exercise(AuctionInvitation.AuctionInvitation_Accept, c.contractId, { auctionName: param })
  }

  return (
    <Contracts
      contracts={invitations.contracts}
      columns={[["Contract Id", "contractId"],

      ["Requestor", "payload.auction.issuer"],
      ["Asset", "payload.auction.bondBundleData.assetLabel"],
      ["Quantity", "payload.auction.size"],
      ]}
      actions={[
        ["Accept", doAccept, "Auction name"]
      ]}
    />);
}
