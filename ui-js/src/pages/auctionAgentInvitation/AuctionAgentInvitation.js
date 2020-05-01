import React from "react";
import Contracts from "../../components/Contracts/Contracts";
import { useQuery } from "@daml/react";

import { AuctionAgentRoleInvitation } from "@daml2ts/bond-issuance-2.0.0/lib/DA/RefApps/Bond/Roles/AuctionAgentRole";

export default function Report() {

  const invitations = useQuery(AuctionAgentRoleInvitation);
  // const exerciseGive = useExercise(Asset.Give);

  return (
    <Contracts
      contracts={invitations.contracts}
      columns={[["Contract Id", "contractId"],
      ["Auction Agent", "payload.auctionAgent"],
      ["Regulators", "payload.regulators"],
      ]} />);
}	