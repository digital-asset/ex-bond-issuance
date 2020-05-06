/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import React from "react";
import Contracts from "../../components/Contracts/Contracts";
import { useQuery } from "@daml/react";

import { CsdRole } from "@daml2ts/bond-issuance-2.0.0/lib/DA/RefApps/Bond/Roles/CsdRole";

export default function Report() {

  const reviews = useQuery(CsdRole);
  // const exerciseGive = useExercise(Asset.Give);

  return (<Contracts contracts={reviews.contracts}
    columns={[["Contract Id", "contractId"],

    ["Csd", "payload.csd"],
    ["Regulators", "payload.regulators"],
    ]} />);
}	