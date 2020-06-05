/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useMemo } from "react";
import Contracts from "../../components/Contracts/Contracts";
import { field } from "../../components/Contracts/Contracts";
import { useStreamQuery, useLedger } from "@daml/react";

import { IssuerRole } from "@daml.js/bond-issuance-2.0.0/lib/DA/RefApps/Bond/Roles/IssuerRole";
import { FixedRateBondFact } from "@daml.js/bond-issuance-2.0.0/lib/DA/RefApps/Bond/FixedRateBond";
import { AssetDeposit } from "@daml.js/finlib-1.0.0/lib/DA/Finance/Fact/Asset";

export default function Report() {

  const ledger = useLedger();
  const roles = useStreamQuery(IssuerRole);

  const fixedRateBondFacts = useStreamQuery(FixedRateBondFact);

  const issueSize = "Issue size"
  const issueDate = "Issue date"
  const currency = "Currency"
  const denomination = "Denomination"
  const maturityDate = "Maturity date"
  const couponRate = "Coupon rate"
  const doIssue = function (contract, params) {
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

  const assetDeposits = useStreamQuery(AssetDeposit);

  const bondAssetDepositCid = "Bond asset deposit"
  const startDate = "Start date"
  const endDate = "End date"
  const minPrice = "Minimum price"
  const size = "Size"
  const doStartAuction = function (contract, params) {
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
  const doRedeem = function (contract, params) {
    const payload = {
      fixedRateBondFactCid: params[fixedRateBondFactCid]
    }
    ledger.exercise(IssuerRole.IssuerRole_Redeem, contract.contractId, payload);
  };

  const filteredAssets = useMemo(
    () => filterByFixedRateBondFact(assetDeposits.contracts, fixedRateBondFacts.contracts),
    [assetDeposits, fixedRateBondFacts]
  );
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
        [field(bondAssetDepositCid, "menu", filteredAssets.map(c => c.contractId), filteredAssets.map(displayAssetDeposit)),
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

function hasSameIsin(assetDeposit, fixedRateBondFact) {
  return fixedRateBondFact.payload.isin === assetDeposit.payload.asset.id.label;
}

function isinExistsIn(assetDeposit, fixedRateBondFacts) {
  return fixedRateBondFacts.some(fixedRateBondFact => hasSameIsin(assetDeposit, fixedRateBondFact));
}

function filterByFixedRateBondFact(assetDeposits, fixedRateBondFacts) {
  console.log(`Asset deposits: ${JSON.stringify(assetDeposits)}`);
  console.log(`Fixed rate bond facts: ${JSON.stringify(fixedRateBondFacts)}`);
  return assetDeposits.filter(x => isinExistsIn(x, fixedRateBondFacts));
}

function displayAssetDeposit(assetDeposit) {
  return `${assetDeposit.payload.asset.id.label} (Quantity: ${assetDeposit.payload.asset.quantity})`;
}
