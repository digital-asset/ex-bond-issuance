/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import React from "react";
import Contracts from "../../components/Contracts/Contracts";
import { useQuery } from "@daml/react";

import { AssetDeposit } from "@daml2ts/finlib-1.0.0/lib/DA/Finance/Fact/Asset";
export default function Report() {

  const deposits = useQuery(AssetDeposit);

  return (
    <Contracts
      contracts={deposits.contracts}
      columns={[["Contract Id", "contractId"],
      ["Owner", "payload.account.owner"],
      ["Account", "payload.account.id.label"],
      ["Account Provider", "payload.account.provider"],
      ["Quantity", "payload.asset.quantity"],
      ["Asset Id", "payload.asset.id.label"]
      ]} />);
}