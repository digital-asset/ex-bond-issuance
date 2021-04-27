#!/usr/bin/env bash
#
# Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
# SPDX-License-Identifier: Apache-2.0
#

daml script --participant-config participants.json --json-api --dar target/bond-issuance.dar  --script-name DA.RefApps.Bond.MarketSetup.MarketSetupScript:setupMarketWithParties --input-file ledger-parties.json
