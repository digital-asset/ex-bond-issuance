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
    scripts/startTriggers.sh ${LEDGER_HOST} ${LEDGER_PORT} ${DAR_FILE}
