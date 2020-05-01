import React from "react";
import Contracts from "../../components/Contracts/Contracts";
import { useQuery } from "@daml/react";

import { AuctionBid } from "@daml2ts/bond-issuance-2.0.0/lib/DA/RefApps/Bond/Auction";

export default function Report() {

  const reviews = useQuery(AuctionBid);
  // const exerciseGive = useExercise(Asset.Give);

  return (<Contracts contracts={reviews.contracts}
    columns={[["Contract Id", "contractId"],

    ["Auction Agent", "payload.auctionAgent"],
    ["Auction Name", "payload.auctionName"],
    ["Bidder", "payload.bidder"],
    ["Price", "payload.bidData.price"],
    ["Quantity", "payload.bidData.quantity"],
    ]} />);
}	