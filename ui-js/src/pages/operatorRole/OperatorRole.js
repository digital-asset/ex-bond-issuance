import React from "react";
import Contracts from "../../components/Contracts/Contracts";
import { useQuery} from "@daml/react";

import { OperatorRole } from "@daml2ts/bond-issuance-2.0.0/lib/DA/RefApps/Bond/Roles/OperatorRole";

export default function Report() {

  const reviews = useQuery(OperatorRole);
  // const exerciseGive = useExercise(Asset.Give);

  return (<Contracts contracts={reviews.contracts}/>);
}