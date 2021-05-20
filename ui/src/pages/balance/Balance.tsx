/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import { AssetDeposit } from "@daml.js/finlib-2.0.0/lib/DA/Finance/Asset";
import { useStreamQueries } from "@daml/react";
import React from "react";
import Contracts from "../../components/Contracts/Contracts";

export default function Report() {

  const depositContracts = useStreamQueries(AssetDeposit).contracts;

  return (
    <Contracts
      contracts={depositContracts}
      columns={[
      {name: "Contract Id", path: "contractId"},
      {name: "Owner", path: "payload.account.owner"},
      {name: "Account", path: "payload.account.id.label"},
      {name: "Account Provider", path: "payload.account.provider"},
      {name: "Quantity", path: "payload.asset.quantity"},
      {name: "Asset Id", path: "payload.asset.id.label"}
      ]}
    actions={[]}
    dialogs={[]}
     />);
    }

