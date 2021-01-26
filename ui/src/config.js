/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import uuidv4 from "uuid/v4";
import * as jwt from "jsonwebtoken";

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
        console.log(`Using token generated token: ${token}`);
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

export const handlePartiesJSONFileUpload = async (fileContent) => {
    try {
        storeParties(JSON.parse(fileContent));
    } catch (e) {
        alert(`Parties JSON file upload error: ${e}`);
    }
}

const PARTIES_STORAGE_KEY = 'imported_parties';

function storeParties(partiesJson) {
    if (isWellFormedPartiesJson(partiesJson)) {
        // Note: We do not filter parties based on rights.
        localStorage.setItem(PARTIES_STORAGE_KEY, JSON.stringify(partiesJson));
    } else {
        console.error("Did not find valid parties file; aborting store:", partiesJson);
        throw new Error("Did you select the correct parties.json file?");
    }
}

function retrieveParties() {
    const partiesRaw = localStorage.getItem(PARTIES_STORAGE_KEY);

    if (!partiesRaw) {
        return undefined;
    }

    try {
        const partiesJson = JSON.parse(partiesRaw);
        if (isWellFormedPartiesJson(partiesJson)) {
            // Note: we do not validate the JSON (e.g. it is from the same ledger).
            return partiesJson;
        } else {
            console.error(`The entity stored at ${PARTIES_STORAGE_KEY} key is not a parties.json file.`);
            throw new Error(`The entity stored at ${PARTIES_STORAGE_KEY} key is not a parties.json file.`);
        }
    } catch(error) {
        console.error("Could not parse parties: ", error);
    }
}

function isWellFormedPartiesJson(partiesJson) {
    if (partiesJson instanceof Array) {
        // True if any element of the array is not a PartyDetails
        const invalidPartyDetail = partiesJson.reduce(
            (invalid, party) => invalid || !isPartyDetails(party),
            false
        );
        return !invalidPartyDetail;
    } else {
        return false;
    }
}

// Note: we do not look for rights / owner fields.
function isPartyDetails(partyDetails) {
    return  typeof partyDetails.ledgerId === 'string' &&
            typeof partyDetails.party === 'string' &&
            typeof partyDetails.partyName === 'string' &&
            typeof partyDetails.token === 'string'
}
