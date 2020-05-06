import React from "react";
import Contracts from "../../components/Contracts/Contracts";
import { useQuery } from "@daml/react";

import { OperatorRole } from "@daml.js/bond-issuance-2.0.0/lib/DA/RefApps/Bond/Roles/OperatorRole";

export default function Report() {

  const reviews = useQuery(OperatorRole);
  // const exerciseGive = useExercise(Asset.Give);

  return (<Contracts contracts={reviews.contracts}
    columns={[["Contract Id", "contractId"],

    ["Operator", "payload.operator"],
    ["Regulators", "payload.regulators"],
    ]} />);
}