import React from "react";
import Contracts from "../../components/Contracts/Contracts";
import { useQuery} from "@daml/react";

import { BidderParticipation } from "@daml2ts/bond-issuance-2.0.0/src/DA/RefApps/Bond/Auction.ts";

export default function Report() {

  const reviews = useQuery(BidderParticipation);
  // const exerciseGive = useExercise(Asset.Give);

  return (<Contracts contracts={reviews.contracts}/>);
}