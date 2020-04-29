import React from "react";
import Contracts from "../../components/Contracts/Contracts";
import { useQuery} from "@daml/react";
import {Grid} from '@material-ui/core';

import { AssetDeposit } from "@daml2ts/finlib-1.0.0/lib/DA/Finance/Fact/Asset";
export default function Report() {

  const deposits = useQuery(AssetDeposit);

  return (
    <>
     <Grid item></Grid>
     {/* <Contracts contracts={deposits.contracts}/> */}
      <Contracts
        contracts={deposits.contracts}
        columns={[
          ["Owner", "payload.account.owner"],
          ["Account", "payload.account.id.label"],
          ["Account Provider", "payload.account.provider"],
          ["Quantity", "payload.asset.quantity"],
          ["Asset Id", "payload.asset.id.label"]
        ]} />
        </>
      );
    }