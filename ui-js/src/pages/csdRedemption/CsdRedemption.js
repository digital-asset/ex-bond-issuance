/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import React from "react";
import Contracts from "../../components/Contracts/Contracts";
import { useQuery, useLedger } from "@daml/react";

import { RedemptionRequest } from "@daml.js/bond-issuance-2.0.0/lib/DA/RefApps/Bond/Redemption";

export default function Report() {

  const ledger = useLedger();
  const reviews = useQuery(RedemptionRequest);

  const doAccept = function(c) {
    ledger.exercise(RedemptionRequest.RedemptionRequest_Accept, c.contractId, {})
  }

  return (<Contracts contracts={reviews.contracts}
    columns={[["Contract Id", "contractId"],

    ["Issuer", "payload.issuer"],
    ["Isin", "payload.isin"],
    ]}

    actions={[
      ["Accept", doAccept]
    ]}
  />);
}
