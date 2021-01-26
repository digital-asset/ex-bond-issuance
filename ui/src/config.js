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

function lowerCaseFirst(s) {
    return s[0].toLowerCase() + s.slice(1);
}

export function capitalize(s) {
if (typeof s !== 'string') {
        return "";
    }
    return s.charAt(0).toUpperCase() + s.slice(1)
}

export const handlePartiesJSONFileUpload = async (contents) => {
    try {
        storeParties(JSON.parse(contents));
    } catch (e) {
        alert(`Parties JSON file upload error: ${e}`);
    }
}

const PARTIES_STORAGE_KEY = 'imported_parties';

function storeParties(parties) {
    if (isParties(parties)) {
        // Note: We do not filter parties based on rights.
        localStorage.setItem(PARTIES_STORAGE_KEY, JSON.stringify(parties));
    } else {
        console.error("Did not find valid parties file; aborting store:", parties);
        throw new Error("Did you select the correct parties.json file?");
    }
}

function retrieveParties() {
    const partiesRaw = localStorage.getItem(PARTIES_STORAGE_KEY);

    if (!partiesRaw) {
        return undefined;
    }

    try {
        const parties = JSON.parse(partiesRaw);
        if (isParties(parties)) {
            // validateParties(parties);

            return parties;
        } else {
            throw new Error('Not a parties file');
        }
    } catch(err) {
        console.error("Could not parse parties: ", err);
    }
}

// Note: we do not look for rights / owner fields.
function isPartyDetails(partyDetails) {
    return  typeof partyDetails.ledgerId === 'string' &&
            typeof partyDetails.party === 'string' &&
            typeof partyDetails.partyName === 'string' &&
            typeof partyDetails.token === 'string'
}


function isParties(parties) {
    if (parties instanceof Array) {
        // True if any element of the array is not a PartyDetails
        const invalidPartyDetail = parties.reduce(
            (invalid, party) => invalid || !isPartyDetails(party),
            false
        );
        return !invalidPartyDetail;
    } else {
        return false;
    }
}
