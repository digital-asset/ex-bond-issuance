/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import React from "react";
import Contracts from "../../components/Contracts/Contracts";
import { useStreamQuery } from "@daml/react";

import { IssuanceRequest } from "@daml.js/bond-issuance-2.0.0/lib/DA/RefApps/Bond/Roles/IssuerRole";

export default function Report() {

  const requests = useStreamQuery(IssuanceRequest);

  return (<Contracts contracts={requests.contracts}
    columns={[["Contract Id", "contractId"],

    ["Issuer", "payload.issuer"],
    ["Issuesize", "payload.issueSize"],
    ]}
  />);
}
