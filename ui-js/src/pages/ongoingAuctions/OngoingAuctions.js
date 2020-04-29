import React from "react";
import Contracts from "../../components/Contracts/Contracts";
import { useQuery} from "@daml/react";

import { Auction } from "@daml2ts/bond-issuance-2.0.0/lib/DA/RefApps/Bond/Auction";

export default function Report() {

  const reviews = useQuery(Auction);

  return (<Contracts contracts={reviews.contracts}/>);
}