#!/usr/bin/env bash
#
# Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
# SPDX-License-Identifier: Apache-2.0
#

require() {
  local variable="$1"
  local message="$2"
  if [[ -z "$variable" ]]; then
    echo "$message"
    exit 1
  fi
}

run_trigger() {
  local trigger_name="$1"
  local party="$2"
  daml trigger \
    --wall-clock-time \
    --dar "${DAR_FILE}" \
    --ledger-host "${LEDGER_HOST}" \
    --ledger-port "${LEDGER_PORT}" \
    --trigger-name "$trigger_name" \
    --ledger-party "$party"
}

require "${LEDGER_HOST}" "LEDGER_HOST must be set."
require "${LEDGER_PORT}" "LEDGER_PORT must be set."
require "${DAR_FILE}" "DAR_FILE must be set."

trigger_name="$1"
party="$2"

require "$trigger_name" "Trigger name must be set as first argument."
require "$party" "Party name must be set as second argument."

run_trigger "$trigger_name" "$party"
