#!/usr/bin/env bash
#
# Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
# SPDX-License-Identifier: Apache-2.0
#

grep -r --include "*.daml" "module$(cat daml.yaml | grep '^init-script' | cut -d':' -f2) where" .