/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import { FixedRateBondFact } from "@daml.js/bond-issuance-2.0.0/lib/DA/RefApps/Bond/FixedRateBond";
import { IssuerRole } from "@daml.js/bond-issuance-2.0.0/lib/DA/RefApps/Bond/Roles/IssuerRole";
import { AssetDeposit } from "@daml.js/finlib-1.0.0/lib/DA/Finance/Fact/Asset";
import { useLedger, useStreamQueries } from "@daml/react";
import React, { useMemo } from "react";
import Contracts, { date, field, menu, number } from "../../components/Contracts/Contracts";


export default function Report() {

  const ledger = useLedger();
  const roleContracts = useStreamQueries(IssuerRole).contracts;

  const fixedRateBondFacts = useStreamQueries(FixedRateBondFact);

  const issueSize = "Issue size"
  const issueDate = "Issue date"
  const currency = "Currency"
  const denomination = "Denomination"
  const maturityDate = "Maturity date"
  const couponRate = "Coupon rate"

  // TODO fix these
  const doIssue = function (contract: any, params: any) {
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

  const assetDeposits = useStreamQueries(AssetDeposit);
  const assetDepositContracts = assetDeposits.contracts;

  const bondAssetDepositCid = "Bond asset deposit"
  const startDate = "Start date"
  const endDate = "End date"
  const minPrice = "Minimum price"
  const size = "Size"
  const doStartAuction = function (contract: any, params: any) {
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
  const doRedeem = function (contract: any, params: any) {
    const payload = {
      fixedRateBondFactCid: params[fixedRateBondFactCid]
    }
    ledger.exercise(IssuerRole.IssuerRole_Redeem, contract.contractId, payload);
  };

  const filteredAssets = useMemo(
    () => filterByFixedRateBondFact(assetDepositContracts, fixedRateBondFacts.contracts),
    [fixedRateBondFacts, assetDepositContracts]
  );
  return (<Contracts contracts={roleContracts}
    columns={[
      {name: "Contract Id", path: "contractId"},
      {name: "Issuer", path: "payload.issuer"},
      {name: "Regulators", path: "payload.regulators"}
    ]}
    actions={[]}
    dialogs={[
      {
        name: "Issue bond",
        dialogFields:[
        field(issueSize, number),
        field(issueDate, date),
        field(currency, menu(["USD"])),
        field(denomination, number),
        field(maturityDate, date),
        field(couponRate, number)],
        action: doIssue
    },
      {name: "Commission auction",
      dialogFields:[
        field(bondAssetDepositCid, menu(filteredAssets.map(displayAssetDeposit), filteredAssets.map((c : any) => c.contractId))),
        field(startDate, date),
        field(endDate, date),
        field(minPrice, number),
        field(size, number)],
        action: doStartAuction
      },
      {name: "Redeem",
      dialogFields:[
        field(fixedRateBondFactCid, menu(fixedRateBondFacts.contracts.map(c => c.payload.isin), fixedRateBondFacts.contracts.map(c => c.contractId)))],
        action: doRedeem
    }
    ]}
  />
   );
}

function hasSameIsin(assetDeposit : any, fixedRateBondFact: any) {
  return fixedRateBondFact.payload.isin === assetDeposit.payload.asset.id.label;
}

function isinExistsIn(assetDeposit: any, fixedRateBondFacts: any) {
  return fixedRateBondFacts.some((fixedRateBondFact: any) => hasSameIsin(assetDeposit, fixedRateBondFact));
}

function filterByFixedRateBondFact(assetDeposits: any, fixedRateBondFacts: any) {
  console.log(`Asset deposits: ${JSON.stringify(assetDeposits)}`);
  console.log(`Fixed rate bond facts: ${JSON.stringify(fixedRateBondFacts)}`);
  return assetDeposits.filter((x: any) => isinExistsIn(x, fixedRateBondFacts));
}

function displayAssetDeposit(assetDeposit: any) {
  return `${assetDeposit.payload.asset.id.label} (Quantity: ${assetDeposit.payload.asset.quantity})`;
}
