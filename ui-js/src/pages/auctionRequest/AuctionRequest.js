import React from "react";
import Contracts from "../../components/Contracts/Contracts";
import { useQuery} from "@daml/react";

import { AuctionInvition } from "@daml2ts/bond-issuance-2.0.0/lib/DA/RefApps/Bond/Roles/AuctionAgentRole";

export default function Report() {

  const reviews = useQuery(AuctionInvition);
  // const exerciseGive = useExercise(Asset.Give);

  return (<Contracts contracts={reviews.contracts}/>);
}