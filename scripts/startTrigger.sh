#!/usr/bin/env bash
#
# Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
# SPDX-License-Identifier: Apache-2.0
#

run_trigger() {
  local ledger_host="${LEDGER_HOST:?Ledger host must be set.}"
  local ledger_port="${LEDGER_PORT:?Ledger port must be set.}"
  local dar_file="${DAR_FILE:?DAR file must be set.}"
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

run_trigger "$1" "$2"
