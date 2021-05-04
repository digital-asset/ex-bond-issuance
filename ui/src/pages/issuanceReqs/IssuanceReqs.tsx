/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import { IssuanceRequest } from "@daml.js/bond-issuance-2.0.0/lib/DA/RefApps/Bond/Roles/IssuerRole";
import { useStreamQueries } from "@daml/react";
import React from "react";
import Contracts from "../../components/Contracts/Contracts";


export default function Report() {

  const requests = useStreamQueries(IssuanceRequest);

  return (<Contracts contracts={requests.contracts}
    columns={[
      {name: "Contract Id", path: "contractId"},
      {name: "Issuer", path: "payload.issuer"},
      {name: "Issue Size", path: "payload.issueSize"}]}
      dialogs={[]}
      actions={[]}
      />);
    }
