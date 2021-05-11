/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import { RedemptionRequest } from "@daml.js/bond-issuance-2.0.0/lib/DA/RefApps/Bond/Redemption";
import { useLedger, useStreamQueries } from "@daml/react";
import React from "react";
import Contracts from "../../components/Contracts/Contracts";


export default function Report() {

  const ledger = useLedger();
  const reviews = useStreamQueries(RedemptionRequest);

  const doAccept = function(c: any) {
    ledger.exercise(RedemptionRequest.RedemptionRequest_Accept, c.contractId, {})
  }

  return (<Contracts contracts={reviews.contracts}
    columns={[
      {name: "Contract Id", path: "contractId"},
      {name: "Issuer", path: "payload.issuer"},
      {name: "Isin", path: "payload.isin"},
    ]}
    actions={[
      {
        name: "Accept",
        handle: doAccept,
        shouldDisplay: () => true,
        paramName: "",
        items:[],
        values:[]
      }
      ]}
      dialogs={[]}
  />);
}
