/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import React from "react";
import Contracts from "../../components/Contracts/Contracts";
import { useStreamQuery } from "@daml/react";

import { OperatorRole } from "@daml.js/bond-issuance-2.0.0/lib/DA/RefApps/Bond/Roles/OperatorRole";

export default function Report() {

  const reviews = useStreamQuery(OperatorRole);

  return (<Contracts contracts={reviews.contracts}
    columns={[["Contract Id", "contractId"],

    ["Operator", "payload.operator"],
    ["Regulators", "payload.regulators"],
    ]} />);
}
