/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import React from "react";
import Contracts from "../../components/Contracts/Contracts";
import { field } from "../../components/Contracts/Contracts";
import { useQuery, useLedger } from "@daml/react";

import { IssuerRole } from "@daml.js/bond-issuance-2.0.0/lib/DA/RefApps/Bond/Roles/IssuerRole";
import { FixedRateBondFact } from "@daml.js/bond-issuance-2.0.0/lib/DA/RefApps/Bond/FixedRateBond";
import { AssetDeposit } from "@daml.js/finlib-1.0.0/lib/DA/Finance/Fact/Asset";

export default function Report() {

  const ledger = useLedger();
  const roles = useQuery(IssuerRole);

  const fixedRateBondFacts = useQuery(FixedRateBondFact);

  const issueSize = "Issue size"
  const issueDate = "Issue date"
  const currency = "Currency"
  const denomination = "Denomination"
  const maturityDate = "Maturity date"
  const couponRate = "Coupon rate"
  const doIssue = function(contract, params) {
    const payload = {
      issueSize: params[issueSize],
      issueDate: params[issueDate],
      currency: params[currency],
      denomination: params[denomination],
      maturityDate: params[maturityDate],
      couponRate: params[couponRate],
      couponDates: []
    }
    ledger.exercise(IssuerRole.IssuerRole_Issuance, contract.contractId, payload);
  };

  const assetDeposits = useQuery(AssetDeposit);

  const bondAssetDepositCid = "Bond asset deposit"
  const startDate = "Start date"
  const endDate = "End date"
  const minPrice = "Minimum price"
  const size = "Size"
  const doStartAuction = function(contract, params) {
    const payload = {
      bondAssetDepositCid: params[bondAssetDepositCid],
      startDate: params[startDate],
      endDate: params[endDate],
      minPrice: params[minPrice],
      size: params[size]
    }
    ledger.exercise(IssuerRole.IssuerRole_CommissionAuction, contract.contractId, payload);
  };

  const fixedRateBondFactCid = "Fixed rate bond"
  const doRedeem = function(contract, params) {
    const payload = {
      fixedRateBondFactCid: params[fixedRateBondFactCid]
    }
    ledger.exercise(IssuerRole.IssuerRole_Redeem, contract.contractId, payload);
  };

  return (<Contracts contracts={roles.contracts}
    columns={[["Contract Id", "contractId"],

    ["Issuer", "payload.issuer"],
    ["Regulators", "payload.regulators"],
    ]}
    dialogs={[
      ["Issue bond",
        [field(issueSize, "number"),
         field(issueDate, "date"),
         field(currency, "menu", ["USD"]),
         field(denomination, "number"),
         field(maturityDate, "date"),
         field(couponRate, "number")],
         doIssue
      ],
      ["Commission auction",
        [field(bondAssetDepositCid, "menu", assetDeposits.contracts.map(c => c.contractId), assetDeposits.contracts.map(c => c.payload.asset.id.label)),
         field(startDate, "date"),
         field(endDate, "date"),
         field(minPrice, "number"),
         field(size, "number")],
         doStartAuction
      ],
      ["Redeem",
        [field(fixedRateBondFactCid, "menu", fixedRateBondFacts.contracts.map(c => c.contractId), fixedRateBondFacts.contracts.map(c => c.payload.isin))],
         doRedeem
      ]
    ]}
  />);
}
