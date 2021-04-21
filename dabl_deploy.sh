#!/usr/bin/env bash
#
# Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
# SPDX-License-Identifier: Apache-2.0
#


# Terminate on any failure
set -ex

STAMP=$(date "+%H%M%S")
PROJECT_NAME=BondIssuance$STAMP

LEDGER_NAME=bondissuance
# The 'jq -r' removes the superfluous quotes for our variables.

PROJECT_ID=`dablc -j project ensure ${PROJECT_NAME} | jq -r '.project_id'`
LEDGER_ID=`dablc -j ledger create ${PROJECT_ID} ${LEDGER_NAME} | jq -r '.ledger_id'`

echo $LEDGER_ID

# Create Users on ledger.
for name in  AuctionAgent Csd Bank1 Bank2 Bank3 Issuer CentralBank Regulator Operator
do
  dablc -j ledger party ${LEDGER_ID} $name > /dev/null
done

# Get a participants.json
dablc -j ledger pps ${LEDGER_ID} > participants.json
cp participants.json ui/src/

# Rebuild the UI so that it contains the right JWTs to login.
make package

# Upload files to workspaces
for file in `ls target/`
do
  dablc -j workspace upload target/$file
done

# From workspace to ledger
BI_DAR_SHA=`dablc -j workspace install bond-issuance.dar ${LEDGER_ID} | jq -r '.artifact_hash'`
BI_UI_SHA=`dablc -j workspace install bondui.zip ${LEDGER_ID}| jq -r '.artifact_hash'`
BI_TRIGGER_HASH=`dablc -j workspace install bond-issuance-triggers.dar ${LEDGER_ID} | jq -r '.artifact_hash'`

# Dar deploy.
dablc -j ledger dar ${LEDGER_ID} ${BI_DAR_SHA}

# UI deploy.
dablc -j ledger ui ${LEDGER_ID} ${BI_UI_SHA}

sleep 90

# Initialize the ledger contract data.
# This will create a ledger-parties suitable for the Daml script.
make dabl-script

# Grab users
USER_TEMP_FILENAME=`mktemp dabl_deploy.XXX`
dablc -j ledger users ${LEDGER_ID} > ${USER_TEMP_FILENAME}

BANK1_USER_ID=`jq -r '.parties | .[] |  select( .partyName == "Bank1") | .party' ${USER_TEMP_FILENAME}`
BANK2_USER_ID=`jq -r '.parties | .[] |  select( .partyName == "Bank2") | .party' ${USER_TEMP_FILENAME}`
BANK3_USER_ID=`jq -r '.parties | .[] |  select( .partyName == "Bank3") | .party' ${USER_TEMP_FILENAME}`
ISSUER_USER_ID=`jq -r '.parties | .[] |  select( .partyName == "Issuer") | .party' ${USER_TEMP_FILENAME}`
AUCTIONAGENT_USER_ID=`jq -r '.parties | .[] |  select( .partyName == "AuctionAgent") | .party' ${USER_TEMP_FILENAME}`
CSD_USER_ID=`jq -r '.parties | .[] |  select( .partyName == "CSD") | .party' ${USER_TEMP_FILENAME}`

rm ${USER_TEMP_FILENAME}

# Deploy triggers to ledger
dablc -j ledger trigger ${LEDGER_ID} ${BI_TRIGGER_HASH} "DA.RefApps.Bond.Triggers.InvestorSettlementTrigger:investorSettlementTrigger" ${BANK1_USER_ID} "Bank1 finalizes settlement"
dablc -j ledger trigger ${LEDGER_ID} ${BI_TRIGGER_HASH} "DA.RefApps.Bond.Triggers.PlaceBidTrigger:placeBidTrigger" ${BANK1_USER_ID} "Bank1 responds to bid placing"

dablc -j ledger trigger ${LEDGER_ID} ${BI_TRIGGER_HASH} "DA.RefApps.Bond.Triggers.InvestorSettlementTrigger:investorSettlementTrigger" ${BANK2_USER_ID} "Bank2 finalizes settlement"
dablc -j ledger trigger ${LEDGER_ID} ${BI_TRIGGER_HASH} "DA.RefApps.Bond.Triggers.PlaceBidTrigger:placeBidTrigger" ${BANK2_USER_ID} "Bank2 responds to bid placing"

dablc -j ledger trigger ${LEDGER_ID} ${BI_TRIGGER_HASH} "DA.RefApps.Bond.Triggers.InvestorSettlementTrigger:investorSettlementTrigger" ${BANK3_USER_ID} "Bank3 finalizes settlement"
dablc -j ledger trigger ${LEDGER_ID} ${BI_TRIGGER_HASH} "DA.RefApps.Bond.Triggers.PlaceBidTrigger:placeBidTrigger" ${BANK3_USER_ID} "Bank3 responds to bid placing"

#Issuer
dablc -j ledger trigger ${LEDGER_ID} ${BI_TRIGGER_HASH} "DA.RefApps.Bond.Triggers.CommissionTrigger:commissionTrigger" ${ISSUER_USER_ID} "Issuer commission"
dablc -j ledger trigger ${LEDGER_ID} ${BI_TRIGGER_HASH} "DA.RefApps.Bond.Triggers.RedemptionFinalizeTrigger:redemptionFinalizeTrigger" ${ISSUER_USER_ID} "Issuer finalize redemption"

#auction agent
dablc -j ledger trigger ${LEDGER_ID} ${BI_TRIGGER_HASH} "DA.RefApps.Bond.Triggers.AuctionFinalizeTrigger:auctionFinalizeTrigger" ${AUCTIONAGENT_USER_ID} "AuctionAgent finalize"

#CSD
dablc -j ledger trigger ${LEDGER_ID} ${BI_TRIGGER_HASH} "DA.RefApps.Bond.Triggers.RedemptionCalculationTrigger:redemptionCalculationTrigger" ${CSD_USER_ID} "CSD calculate redemption"
