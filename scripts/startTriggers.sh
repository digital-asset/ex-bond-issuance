#!/usr/bin/env bash
#
# Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
# SPDX-License-Identifier: Apache-2.0
#

set -e

cleanup() {
    pids=$(jobs -p)
    echo Killing "$pids"
    [ -n "$pids" ] && kill $pids
}

trap "cleanup" INT QUIT TERM

ledger_host="${1:?Ledger host must be set.}"
ledger_port="${2:?Ledger port must be set.}"
dar_file="${3:?DAR file must be set.}"

run_trigger() {
  local trigger_name="${1:?Trigger name must be set.}"
  local party="${2:?Party name must be set.}"

  daml trigger \
    --wall-clock-time \
    --dar "$dar_file" \
    --ledger-host "$ledger_host" \
    --ledger-port "$ledger_port" \
    --trigger-name "$trigger_name" \
    --ledger-party "$party"
}

run_trigger DA.RefApps.Bond.Triggers.InvestorSettlementTrigger:investorSettlementTrigger Bank1 &
run_trigger DA.RefApps.Bond.Triggers.PlaceBidTrigger:placeBidTrigger Bank1 &
run_trigger DA.RefApps.Bond.Triggers.InvestorSettlementTrigger:investorSettlementTrigger Bank2 &
run_trigger DA.RefApps.Bond.Triggers.PlaceBidTrigger:placeBidTrigger Bank2 &
run_trigger DA.RefApps.Bond.Triggers.InvestorSettlementTrigger:investorSettlementTrigger Bank3 &
run_trigger DA.RefApps.Bond.Triggers.PlaceBidTrigger:placeBidTrigger Bank3 &
run_trigger DA.RefApps.Bond.Triggers.CommissionTrigger:commissionTrigger Issuer &
run_trigger DA.RefApps.Bond.Triggers.RedemptionFinalizeTrigger:redemptionFinalizeTrigger Issuer &
run_trigger DA.RefApps.Bond.Triggers.AuctionFinalizeTrigger:auctionFinalizeTrigger AuctionAgent &
run_trigger DA.RefApps.Bond.Triggers.RedemptionCalculationTrigger:redemptionCalculationTrigger CSD &

sleep 2
pids=$(jobs -p)
echo Waiting for $pids
wait $pids
