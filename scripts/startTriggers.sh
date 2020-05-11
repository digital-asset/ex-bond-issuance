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

if [ $# -lt 2 ]; then
    echo "${0} SANDBOX_HOST SANDBOX_PORT [DAR_FILE]"
    exit 1
fi

SANDBOX_HOST="${1}"
SANDBOX_PORT="${2}"
DAR_FILE="${3:-/home/daml/bond-issuance.dar}"

run_trigger() {
  local trigger_name="$1"
  local party="$2"
  daml trigger \
      --wall-clock-time \
      --dar "${DAR_FILE}" \
      --trigger-name "$trigger_name" \
      --ledger-host "${SANDBOX_HOST}" \
      --ledger-port "${SANDBOX_PORT}" \
      --ledger-party "$party"
}

run_trigger DA.RefApps.Bond.Triggers.MergedTriggers:bankTrigger Bank1 &
run_trigger DA.RefApps.Bond.Triggers.MergedTriggers:bankTrigger Bank2 &
run_trigger DA.RefApps.Bond.Triggers.MergedTriggers:bankTrigger Bank3 &
run_trigger DA.RefApps.Bond.Triggers.MergedTriggers:issuerTrigger Issuer &
run_trigger DA.RefApps.Bond.Triggers.AuctionFinalizeTrigger:auctionFinalizeTrigger AuctionAgent &
run_trigger DA.RefApps.Bond.Triggers.RedemptionCalculationTrigger:redemptionCalculationTrigger CSD &

sleep 2
pids=$(jobs -p)
echo Waiting for $pids
wait $pids
