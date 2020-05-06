import React from "react";
import Contracts from "../../components/Contracts/Contracts";
import { useQuery } from "@daml/react";

import { CentralBankRole } from "@daml.js/bond-issuance-2.0.0/lib/DA/RefApps/Bond/Roles/CentralBankRole";

export default function Report() {

  const reviews = useQuery(CentralBankRole);
  // const exerciseGive = useExercise(Asset.Give);

  return (<Contracts contracts={reviews.contracts}
    columns={[["Contract Id", "contractId"],

    ["Central Bank", "payload.centralBank"],
    ["Regulators", "payload.regulators"],
    ]} />);
}