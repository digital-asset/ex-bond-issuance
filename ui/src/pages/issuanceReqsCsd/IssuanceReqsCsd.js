/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import React from "react";
import Contracts from "../../components/Contracts/Contracts";
import { useStreamQueries, useLedger } from "@daml/react";

import { IssuanceRequest } from "@daml.js/bond-issuance-2.0.0/lib/DA/RefApps/Bond/Roles/IssuerRole";

export default function Report() {

  const ledger = useLedger();
  const requests = useStreamQueries(IssuanceRequest);

  const doAccept = function(c, param) {
    ledger.exercise(IssuanceRequest.IssuanceRequest_Accept, c.contractId, { isin: param })
  }

  return (<Contracts contracts={requests.contracts}
    columns={[["Contract Id", "contractId"],

    ["Issuer", "payload.issuer"],
    ["Issuesize", "payload.issueSize"],
    ]}
    actions={[
      ["Accept", doAccept, "ISIN"]
    ]}
  />);
}
