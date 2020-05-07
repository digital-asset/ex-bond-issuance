#
# Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
# SPDX-License-Identifier: Apache-2.0
#

ARG sdk_vsn=1.0.1

FROM digitalasset/daml-sdk:${sdk_vsn}

WORKDIR /home/daml

COPY --chown=daml target/bond-issuance.dar /home/daml/
COPY --chown=daml scripts/ /home/daml/scripts/

USER daml

ENV JAVA_TOOL_OPTIONS -Xmx128m
ENV DAR_FILE bond-issuance.dar

CMD ~/scripts/waitForLedger.sh ${LEDGER_HOST} ${LEDGER_PORT} && \
    scripts/startTrigger.sh DA.RefApps.Bond.Triggers.InvestorSettlementTrigger:investorSettlementTrigger Bank1 & \
    scripts/startTrigger.sh DA.RefApps.Bond.Triggers.PlaceBidTrigger:placeBidTrigger Bank1 & \
    scripts/startTrigger.sh DA.RefApps.Bond.Triggers.InvestorSettlementTrigger:investorSettlementTrigger Bank2 & \
    scripts/startTrigger.sh DA.RefApps.Bond.Triggers.PlaceBidTrigger:placeBidTrigger Bank2 & \
    scripts/startTrigger.sh DA.RefApps.Bond.Triggers.InvestorSettlementTrigger:investorSettlementTrigger Bank3 & \
    scripts/startTrigger.sh DA.RefApps.Bond.Triggers.PlaceBidTrigger:placeBidTrigger Bank3 & \
    scripts/startTrigger.sh DA.RefApps.Bond.Triggers.CommissionTrigger:commissionTrigger Issuer & \
    scripts/startTrigger.sh DA.RefApps.Bond.Triggers.RedemptionFinalizeTrigger:redemptionFinalizeTrigger Issuer & \
    scripts/startTrigger.sh DA.RefApps.Bond.Triggers.AuctionFinalizeTrigger:auctionFinalizeTrigger AuctionAgent & \
    scripts/startTrigger.sh DA.RefApps.Bond.Triggers.RedemptionCalculationTrigger:redemptionCalculationTrigger CSD
