/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import * as jwt from "jsonwebtoken";
import { getDisplayName, lowerCaseFirst } from "./components/Util";
import participants from './participants.json';
import { uuid } from 'uuidv4';


export const isLocalDev = process.env.NODE_ENV === 'development';

let host = window.location.host.split('.')

export const ledgerId = isLocalDev ? "bond-issuance" : host[0];
let apiUrl = host.slice(1)
apiUrl.unshift('api')

// TODO: this is hardwired to 3000 for the moment
export function httpBaseUrl(user: string): string {
    if (isLocalDev) {
        return 'http://localhost:3000/';
    }
    else {
        return ('https://' + apiUrl.join('.') + (window.location.port ? ':' + window.location.port : '') + '/data/' + ledgerId + '/');
    }
}

// Unfortunately, the development server of `create-react-app` does not proxy
// websockets properly. Thus, we need to bypass it and talk to the JSON API
// directly in development mode.
export function wsBaseUrl(user: string): string | undefined {
    if (isLocalDev) {
        return 'ws://localhost:7575/'
    } else {
        return undefined;
    }
}

const applicationId = uuid();

export function createTokenAll(party: string) {
    if (isLocalDev) {
        const token = jwt.sign({ "https://daml.com/ledger-api": { ledgerId, applicationId, admin: true, actAs: [party], readAs: [party] } }, "secret");
        return token;
    } else {
        console.log(`Using token from parties.json file for ${party}`);
        return dablToken(party);
    }
}

type DablUserNames = "auctionAgent" | "bank1" | "bank2" | "bank3" | "centralBank" | "csd" | "issuer" | "regulator" | "operator"

function dablToken(username: string) {
    const participantInfo = participants.participants[lowerCaseFirst(username) as DablUserNames];
    return participantInfo.access_token;
}

let loginUrl = host.slice(1)
loginUrl.unshift('login')

export const dablLoginUrl = loginUrl.join('.') + (window.location.port ? ':' + window.location.port : '') + '/auth/login?ledgerId=' + ledgerId;

export function capitalize(s : string) {
if (typeof s !== 'string') {
        return "";
    }
    return s.charAt(0).toUpperCase() + s.slice(1)
}
export const damlPartyKey = applicationId + ".daml.party";
export const damlTokenKey = applicationId + ".daml.token";

export function getLedgerId(user: string): string {
    const userName = getDisplayName(user);
    switch (userName) {

        default:
            return ledgerId
    }
}
