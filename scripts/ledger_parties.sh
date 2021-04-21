#!/usr/bin/env bash
#
# Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
# SPDX-License-Identifier: Apache-2.0
#

(cd ui/src/utils/ && node gen-ledger-parties.js && mv ledger-parties.json ../../..)
