/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import { AuctionSettleRequest } from "@daml.js/bond-issuance-2.0.0/lib/DA/RefApps/Bond/Settlement";
import { useStreamQueries } from "@daml/react";
import React from "react";
import Contracts from "../../components/Contracts/Contracts";


export default function Report() {

  const reviews = useStreamQueries(AuctionSettleRequest);


  return (<Contracts contracts={reviews.contracts}
    columns={[
      {name: "Contract Id", path: "contractId"},
      {name: "Buyer",  path: "payload.investor"},
      {name: "Bond",  path: "payload.issuerBondAssetDeposit.asset.id.label"},
      {name: "Quantity",  path: "payload.issuerBondAssetDeposit.asset.quantity"},
      {name: "Price",  path: "payload.cashAmountToPay / payload.issuerBondAssetDeposit.asset.quantity"},
      {name: "Consideration",  path: "payload.cashAmountToPay"},
      {name: "Currency",  path: "payload.cashAssetId.label"}
    ]}
    dialogs={[]}
    actions={[]}
    />);
  }
