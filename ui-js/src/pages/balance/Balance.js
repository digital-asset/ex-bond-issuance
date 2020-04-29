import React from "react";
import Contracts from "../../components/Contracts/Contracts";
import { useQuery} from "@daml/react";

import { AssetDeposit } from "@daml2ts/finlib-1.0.0/lib/DA/Finance/Fact/Asset";
export default function Report() {

  const reviews = useQuery(AssetDeposit);
  // const exerciseGive = useExercise(Asset.Give);

  return (<Contracts contracts={reviews.contracts}/>);
}