#!/usr/bin/env bash
#
# Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
# SPDX-License-Identifier: Apache-2.0
#

set -e

cleanup() {
    pids=$(jobs -p)
    echo Killing $pids
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

daml trigger \
    --wall-clock-time \
    --dar "${DAR_FILE}" \
    --trigger-name DA.RefApps.Bond.Triggers.InvestorSettlementTrigger:investorSettlementTrigger \
    --ledger-host ${SANDBOX_HOST} \
    --ledger-port ${SANDBOX_PORT} \
    --ledger-party Bank1 &

daml trigger \
    --wall-clock-time \
    --dar "${DAR_FILE}" \
    --trigger-name DA.RefApps.Bond.Triggers.PlaceBidTrigger:placeBidTrigger \
    --ledger-host ${SANDBOX_HOST} \
    --ledger-port ${SANDBOX_PORT} \
    --ledger-party Bank1 &

daml trigger \
    --wall-clock-time \
    --dar "${DAR_FILE}" \
    --trigger-name DA.RefApps.Bond.Triggers.InvestorSettlementTrigger:investorSettlementTrigger \
    --ledger-host ${SANDBOX_HOST} \
    --ledger-port ${SANDBOX_PORT} \
    --ledger-party Bank2 &

daml trigger \
    --wall-clock-time \
    --dar "${DAR_FILE}" \
    --trigger-name DA.RefApps.Bond.Triggers.PlaceBidTrigger:placeBidTrigger \
    --ledger-host ${SANDBOX_HOST} \
    --ledger-port ${SANDBOX_PORT} \
    --ledger-party Bank2 &

daml trigger \
    --wall-clock-time \
    --dar "${DAR_FILE}" \
    --trigger-name DA.RefApps.Bond.Triggers.InvestorSettlementTrigger:investorSettlementTrigger \
    --ledger-host ${SANDBOX_HOST} \
    --ledger-port ${SANDBOX_PORT} \
    --ledger-party Bank3 &

daml trigger \
    --wall-clock-time \
    --dar "${DAR_FILE}" \
    --trigger-name DA.RefApps.Bond.Triggers.PlaceBidTrigger:placeBidTrigger \
    --ledger-host ${SANDBOX_HOST} \
    --ledger-port ${SANDBOX_PORT} \
    --ledger-party Bank3 &

daml trigger \
    --wall-clock-time \
    --dar "${DAR_FILE}" \
    --trigger-name DA.RefApps.Bond.Triggers.CommissionTrigger:commissionTrigger \
    --ledger-host ${SANDBOX_HOST} \
    --ledger-port ${SANDBOX_PORT} \
    --ledger-party Issuer &

daml trigger \
    --wall-clock-time \
    --dar "${DAR_FILE}" \
    --trigger-name DA.RefApps.Bond.Triggers.RedemptionFinalizeTrigger:redemptionFinalizeTrigger \
    --ledger-host ${SANDBOX_HOST} \
    --ledger-port ${SANDBOX_PORT} \
    --ledger-party Issuer &

daml trigger \
    --wall-clock-time \
    --dar "${DAR_FILE}" \
    --trigger-name DA.RefApps.Bond.Triggers.AuctionFinalizeTrigger:auctionFinalizeTrigger \
    --ledger-host ${SANDBOX_HOST} \
    --ledger-port ${SANDBOX_PORT} \
    --ledger-party AuctionAgent &

daml trigger \
    --wall-clock-time \
    --dar "${DAR_FILE}" \
    --trigger-name DA.RefApps.Bond.Triggers.RedemptionCalculationTrigger:redemptionCalculationTrigger \
    --ledger-host ${SANDBOX_HOST} \
    --ledger-port ${SANDBOX_PORT} \
    --ledger-party CSD &

sleep 2
pids=$(jobs -p)
echo Waiting for $pids
wait $pids