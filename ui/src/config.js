/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import uuidv4 from "uuid/v4";
import * as jwt from "jsonwebtoken";
import participants from './participants.json';

export const isLocalDev = process.env.NODE_ENV === 'development';

let host = window.location.host.split('.')

export const ledgerId = isLocalDev ? "bond-issuance" : host[0];
let apiUrl = host.slice(1)
apiUrl.unshift('api')

export const httpBaseUrl =
  isLocalDev
  ? undefined
  : `https://api.projectdabl.com/data/${ledgerId}/`;

// Unfortunately, the development server of `create-react-app` does not proxy
// websockets properly. Thus, we need to bypass it and talk to the JSON API
// directly in development mode.
export const wsBaseUrl =
    isLocalDev
    ? 'ws://localhost:7575/'
    : undefined;

const applicationId = uuidv4();

export function createToken(party) {
    if (isLocalDev) {
        console.log("Using token generated token.");
        return jwt.sign({ "https://daml.com/ledger-api": { ledgerId, applicationId, admin: true, actAs: [party], readAs: [party] } }, "secret");
    } else {
        console.log("Using token from participant file.");
        const participantInfo = participants.participants[lowerCaseFirst(party)];
        return participantInfo.access_token;
    }
}

let loginUrl = host.slice(1)
loginUrl.unshift('login')

export const dablLoginUrl = loginUrl.join('.') + (window.location.port ? ':' + window.location.port : '') + '/auth/login?ledgerId=' + ledgerId;

function lowerCaseFirst(s) {
    return s[0].toLowerCase() + s.slice(1);
}

export function capitalize(s) {
if (typeof s !== 'string') {
        return "";
    }
    return s.charAt(0).toUpperCase() + s.slice(1)
}
