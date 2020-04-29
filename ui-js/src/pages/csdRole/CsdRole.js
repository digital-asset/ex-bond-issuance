import React from "react";
import Contracts from "../../components/Contracts/Contracts";
import { useQuery} from "@daml/react";

import { CsdRole } from "@daml2ts/bond-issuance-2.0.0/lib/DA/RefApps/Bond/Roles/CsdRole";

export default function Report() {

  const reviews = useQuery(CsdRole);
  // const exerciseGive = useExercise(Asset.Give);

  return (<Contracts contracts={reviews.contracts}/>);
}