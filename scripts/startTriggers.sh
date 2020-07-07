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
DEFAULT_SERVICE_PORT="8088"

start_trigger() {
  local pkg_id="$1"
  local trigger_name="$2"
  local party="$3"
  curl --user ${party}':secret' \
     -X POST localhost:8088/v1/start \
     -H "Content-type: application/json" -H "Accept: application/json" \
     -d '{"triggerName":"'${pkg_id}:${trigger_name}'"}'
}

wait_for_service() {
  local host="$1"
  local port="$2"
  until nc -z "$host" "$port"; do
    echo "Waiting for service..."
    sleep 3
  done
  echo "Connected to service."
}

# We grep package ID from damlc DAR inspection output
# It is line that starts with the DAR name and containts the package ID between quotation marks
DAR_FILE_BASENAME="${DAR_FILE##*/}"
DAR_NAME="${DAR_FILE_BASENAME%%.*}"
PACKAGE_ID=$(daml damlc inspect-dar "${DAR_FILE}" | grep "${DAR_NAME}" | grep "\".*\"" | cut -d'"' -f 2)
echo "Package ID: ${PACKAGE_ID}"

echo "Starting trigger service."
daml trigger-service \
    --ledger-host "${SANDBOX_HOST}" \
    --ledger-port "${SANDBOX_PORT}" \
    --wall-clock-time --no-secret-key --dar ${DAR_FILE} &

wait_for_service ${SANDBOX_HOST} ${DEFAULT_SERVICE_PORT}

echo "Starting triggers."
start_trigger ${PACKAGE_ID} DA.RefApps.Bond.Triggers.InvestorSettlementTrigger:investorSettlementTrigger Bank1 &
start_trigger ${PACKAGE_ID} DA.RefApps.Bond.Triggers.PlaceBidTrigger:placeBidTrigger Bank1 &
start_trigger ${PACKAGE_ID} DA.RefApps.Bond.Triggers.InvestorSettlementTrigger:investorSettlementTrigger Bank2 &
start_trigger ${PACKAGE_ID} DA.RefApps.Bond.Triggers.PlaceBidTrigger:placeBidTrigger Bank2 &
start_trigger ${PACKAGE_ID} DA.RefApps.Bond.Triggers.InvestorSettlementTrigger:investorSettlementTrigger Bank3 &
start_trigger ${PACKAGE_ID} DA.RefApps.Bond.Triggers.PlaceBidTrigger:placeBidTrigger Bank3 &
start_trigger ${PACKAGE_ID} DA.RefApps.Bond.Triggers.CommissionTrigger:commissionTrigger Issuer &
start_trigger ${PACKAGE_ID} DA.RefApps.Bond.Triggers.RedemptionFinalizeTrigger:redemptionFinalizeTrigger Issuer &
start_trigger ${PACKAGE_ID} DA.RefApps.Bond.Triggers.AuctionFinalizeTrigger:auctionFinalizeTrigger AuctionAgent &
start_trigger ${PACKAGE_ID} DA.RefApps.Bond.Triggers.RedemptionCalculationTrigger:redemptionCalculationTrigger CSD &

sleep 2
pids=$(jobs -p)
echo Waiting for $pids
wait $pids
