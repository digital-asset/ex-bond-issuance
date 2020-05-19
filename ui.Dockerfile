#
# Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
# SPDX-License-Identifier: Apache-2.0
#

FROM node:alpine

# install node dependencies
RUN npm install -g react-scripts express express-http-proxy

WORKDIR /home/daml

COPY ./daml2js/ daml2js/
COPY ./ui-js/ ui-js/
COPY package.json package.json

USER root

WORKDIR /home/daml

RUN yarn install --silent

WORKDIR /home/daml/ui-js/

EXPOSE 3000

ENTRYPOINT node rename-proxy.js && yarn start
