import React from "react";
import Contracts from "../../components/Contracts/Contracts";
import { useQuery } from "@daml/react";

import { AuctionAgentRole } from "@daml.js/bond-issuance-2.0.0/lib/DA/RefApps/Bond/Roles/AuctionAgentRole";

export default function Report() {

  const roles = useQuery(AuctionAgentRole);
  return (
    <Contracts
      contracts={roles.contracts}
      columns={[["Contract Id", "contractId"],

      ["Auction Agent", "payload.auctionAgent"],
      ["Regulators", "payload.regulators"],
      ]} />);
}	