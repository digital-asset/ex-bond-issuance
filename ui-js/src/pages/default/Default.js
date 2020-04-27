import React from "react";
import Contracts from "../../components/Contracts/Contracts";
import { useQuery } from "@daml/react";
// import { SharedOrder } from "@daml.js/bond-issuance-2.0.0/lib/Models/Order";

import { BankRole } from "@daml2ts/bond-issuance-2.0.0/lib/DA/RefApps/Bond/Roles/BankRole";


export default function Default() {

  const assets = useQuery(BankRole);

  return (<Contracts contracts={assets.contracts} />);
}
