/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import uuidv4 from "uuid/v4";
import * as jwt from "jsonwebtoken";
import { convertPartiesJson } from '@daml/dabl-react';

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
        const token = jwt.sign({ "https://daml.com/ledger-api": { ledgerId, applicationId, admin: true, actAs: [party], readAs: [party] } }, "secret");
        console.log(`Using generated token: ${token}`);
        return token;
    } else {
        console.log("Using token from parties.json file.");
        const parties = retrieveParties();
        const partyInfo = parties.find(o => o.partyName === party);
        if (partyInfo && partyInfo.token) {
            return partyInfo.token;
        }
        alert(`Warning: no credentials available for ${party}.`);
        return undefined;
    }
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

export const handlePartiesLoad = async (parties) => {
    try {
        storeParties(parties);
    } catch (e) {
        alert(`Error while trying to store parties: ${e}`);
    }
}

const PARTIES_STORAGE_KEY = 'imported_parties';

function storeParties(partiesJson) {
    localStorage.setItem(PARTIES_STORAGE_KEY, JSON.stringify(partiesJson));
}

export function retrieveParties(validateParties) {
    const partiesJson = localStorage.getItem(PARTIES_STORAGE_KEY);

    if (!partiesJson) {
        return undefined;
    }

    const [ parties, error ] = convertPartiesJson(partiesJson, ledgerId, true);

    if (error) {
        console.warn("Tried to load an invalid parties file from cache.", error);

        localStorage.removeItem(PARTIES_STORAGE_KEY);
        return undefined;
    }

    return parties;
}
