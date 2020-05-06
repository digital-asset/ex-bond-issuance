import React from "react";
import Contracts from "../../components/Contracts/Contracts";
import { useQuery } from "@daml/react";

import { AuctionParticipantSettleRequest } from "@daml.js/bond-issuance-2.0.0/lib/DA/RefApps/Bond/Auction";

export default function Report() {

  const reviews = useQuery(AuctionParticipantSettleRequest);
  // const exerciseGive = useExercise(Asset.Give);

  return (<Contracts contracts={reviews.contracts}
    columns=
    {[["Contract Id", "contractId"],
    ["Seller", "payload.issuer"],
    ["Auction Name", "payload.auctionName"],
    ]} />);
}	