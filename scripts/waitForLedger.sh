#!/usr/bin/env bash
#
# Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
# SPDX-License-Identifier: Apache-2.0
#

wait_for_ledger() {
  local host="${1:?Ledger host must be specified.}"
  local port="${2:?Ledger port must be specified.}"
  echo "Ledger URL: http://$host:$port"
  until nc -z "$host" "$port"; do
    echo "Waiting for ledger..."
    sleep 1
  done
  echo "Connected to ledger."
}

wait_for_ledger "$1" "$2"
