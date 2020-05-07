/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import React from "react";
import Contracts from "../../components/Contracts/Contracts";
import { useQuery } from "@daml/react";

import { BankRole } from "@daml.js/bond-issuance-2.0.0/lib/DA/RefApps/Bond/Roles/BankRole";

export default function Report() {

  const roles = useQuery(BankRole);
  return (
    <Contracts
      contracts={roles.contracts}

      // columns={[["ContractId", "contractId"], ["Bank", "payload.bank"], ["Regulators", "payload.regulators"], ]} /> ); }
      columns={[["Contract Id", "contractId"],

      ["Bank", "payload.bank"],
      ["Regulators", "payload.regulators"],
      ]} />);
}