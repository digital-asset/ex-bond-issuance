/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import { IssuanceRequest } from "@daml.js/bond-issuance-2.0.0/lib/DA/RefApps/Bond/Roles/IssuerRole";
import { useLedger, useStreamQueries } from "@daml/react";
import React from "react";
import Contracts from "../../components/Contracts/Contracts";


export default function Report() {

  const ledger = useLedger();
  const requests = useStreamQueries(IssuanceRequest);

  const doAccept = function(c: any, param: any) {
    ledger.exercise(IssuanceRequest.IssuanceRequest_Accept, c.contractId, { isin: param })
  }

  return (<Contracts contracts={requests.contracts}
    columns={[
      {name: "Contract Id", path: "contractId"},
      {name: "Issuer", path: "payload.issuer"},
      {name: "Issuesize", path: "payload.issueSize"},
    ]}
    actions={[
      {
        name: "Accept",
        handle: doAccept,
        shouldDisplay: () => true,
        paramName: "ISIN",
        items:[],
        values:[]
      }
    ]}
    dialogs={[]}
  />);
}
