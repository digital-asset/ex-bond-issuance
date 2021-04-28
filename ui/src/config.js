/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import uuidv4 from "uuid/v4";
import * as jwt from "jsonwebtoken";
import participants from './participants.json';
import {lowerCaseFirst} from "./components/Util"

export const isLocalDev = process.env.NODE_ENV === 'development';

let host = window.location.host.split('.')

export const ledgerId = isLocalDev ? "bond-issuance" : host[0];
let apiUrl = host.slice(1)
apiUrl.unshift('api')

export const httpBaseUrl =
  isLocalDev
  ? 'http://localhost:3000/'
  : `https://api.projectdabl.com/data/${ledgerId}/`;

// Unfortunately, the development server of `create-react-app` does not proxy
// websockets properly. Thus, we need to bypass it and talk to the JSON API
// directly in development mode.
export const wsBaseUrl =
    isLocalDev
    ? 'ws://localhost:7575/'
    : undefined;

const applicationId = uuidv4();

export function createTokenAll(party) {
    if (isLocalDev) {
        const token = jwt.sign({ "https://daml.com/ledger-api": { ledgerId, applicationId, admin: true, actAs: [party], readAs: [party] } }, "secret");
        return token;
    } else {
        console.log(`Using token from parties.json file for ${party}`);
        return dablToken(party);
    }
}

function dablToken(username) {
    const participantInfo = participants.participants[lowerCaseFirst(username)];
    return participantInfo.access_token;
}

let loginUrl = host.slice(1)
loginUrl.unshift('login')

export const dablLoginUrl = loginUrl.join('.') + (window.location.port ? ':' + window.location.port : '') + '/auth/login?ledgerId=' + ledgerId;

export function capitalize(s) {
if (typeof s !== 'string') {
        return "";
    }
    return s.charAt(0).toUpperCase() + s.slice(1)
}
