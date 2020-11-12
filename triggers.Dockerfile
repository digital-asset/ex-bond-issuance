#
# Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
# SPDX-License-Identifier: Apache-2.0
#

ARG sdk_vsn=1.7.0

FROM digitalasset/daml-sdk:${sdk_vsn}

USER root
RUN apt-get update || apt-get update
RUN apt-get -y install netcat-openbsd
USER daml

WORKDIR /home/daml

COPY --chown=daml target/bond-issuance.dar /home/daml/
COPY --chown=daml scripts/ /home/daml/scripts/

ENV JAVA_TOOL_OPTIONS -Xmx128m

CMD ~/scripts/waitForSandbox.sh ${SANDBOX_HOST} ${SANDBOX_PORT} && \
    ~/scripts/startTriggers.sh "${SANDBOX_HOST}" "${SANDBOX_PORT}"
