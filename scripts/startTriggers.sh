#!/usr/bin/env bash
#
# Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
# SPDX-License-Identifier: Apache-2.0
#

set -eE

cleanup() {
    pids=$(jobs -p)
    echo Killing "$pids"
    # shellcheck disable=SC2086
    [ -n "$pids" ] && kill $pids
}

trap "cleanup" INT QUIT TERM ERR

if [ $# -lt 2 ]; then
    echo "${0} SANDBOX_HOST SANDBOX_PORT [DAR_FILE]"
    exit 1
fi

SANDBOX_HOST="${1}"
SANDBOX_PORT="${2}"
DAR_FILE="${3:-/home/daml/bond-issuance-triggers.dar}"
DEFAULT_SERVICE_PORT="8088"

start_trigger() {
  local pkg_id="$1"
  local trigger_name="$2"
  local party="$3"
  curl  \
     -X POST \
      localhost:${DEFAULT_SERVICE_PORT}/v1/triggers \
     -H "Content-type: application/json" \
     -H "Accept: application/json" \
     -d '{"triggerName":"'"${pkg_id}:${trigger_name}"'", "party": "'"$party"'"}'
  echo
}

wait_for_service() {
  local host="$1"
  local port="$2"
  until nc -z "$host" "$port"; do
    echo "Waiting for service..."
    sleep 3
  done
}

echo "Starting trigger service."
daml trigger-service \
    --ledger-host "${SANDBOX_HOST}" \
    --ledger-port "${SANDBOX_PORT}" \
    --wall-clock-time \
    --dar "$DAR_FILE" &

wait_for_service "$SANDBOX_HOST" ${DEFAULT_SERVICE_PORT}

echo "Starting triggers."

PACKAGE_ID=$(daml damlc inspect-dar --json "${DAR_FILE}" | jq --raw-output .main_package_id)
echo PACKAGE_ID="$PACKAGE_ID"

print_parties_with_triggers() {
  cat << THE_END
Bank1        DA.RefApps.Bond.Triggers.InvestorSettlementTrigger:investorSettlementTrigger
Bank1        DA.RefApps.Bond.Triggers.PlaceBidTrigger:placeBidTrigger
Bank2        DA.RefApps.Bond.Triggers.InvestorSettlementTrigger:investorSettlementTrigger
Bank2        DA.RefApps.Bond.Triggers.PlaceBidTrigger:placeBidTrigger
Bank3        DA.RefApps.Bond.Triggers.InvestorSettlementTrigger:investorSettlementTrigger
Bank3        DA.RefApps.Bond.Triggers.PlaceBidTrigger:placeBidTrigger
Issuer       DA.RefApps.Bond.Triggers.CommissionTrigger:commissionTrigger
Issuer       DA.RefApps.Bond.Triggers.RedemptionFinalizeTrigger:redemptionFinalizeTrigger
AuctionAgent DA.RefApps.Bond.Triggers.AuctionFinalizeTrigger:auctionFinalizeTrigger
CSD          DA.RefApps.Bond.Triggers.RedemptionCalculationTrigger:redemptionCalculationTrigger
THE_END
}

print_parties_with_triggers \
  | while read -r party trigger
do
  start_trigger "$PACKAGE_ID" "$trigger" "$party"
done

sleep 2
pids=$(jobs -p)
echo Waiting for "$pids"
# shellcheck disable=SC2086
wait $pids
