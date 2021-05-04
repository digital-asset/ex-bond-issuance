/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import participants from '../participants.json';

export function addPath (baseUrl: string, path: string): string {
  return baseUrl.endsWith('/') ? `${baseUrl}${path}` : `${baseUrl}/${path}`;
}

export function parseStringList(stringWithCommas: string): string[] {
  return stringWithCommas
        .split(",")
        .map((i: string) => i.trim())
        .filter((i: string) => i !== '')
}

export function addSpacesBetweenWords(s: string): string {
  return s?.replace(/([a-z])([A-Z1-9])/g, '$1 $2');
}

function isDablParty(name: string): boolean {
  return name.includes("ledger-party");
}

export function getDisplayName(partyId: string): string {
  return partyId.split("::")[0];
}

export function getDisplayNameDabl(partyId: string): string {
  var dablPartyParticipants = getDablPartyParticipants(participants);
  return normalizeDablPartyId(dablPartyParticipants, partyId);
}

export function shorten(text: any): any {
  if (typeof text === "string") {
    if (isDablParty(text)) {
      return addSpacesBetweenWords(getDisplayNameDabl(text));
    }
    if (text.length > 20) {
      return `${text.substr(0,20)}...`;
    }
    return text;
  }
  if (typeof text === "object") {
    if (Array.isArray(text)) {
      text = text.map((t: any) => shorten(t));
      return text.join(", ");
    } else {
      return shorten(stringifyObject(text));
    }
  }
  return text;
}

export function getIsoTimeNow(): string {
  return (new Date()).toISOString();
}

export function getIsoTimeWithDayOffset(days : number): string {
  const now = new Date();
  now.setDate(now.getDate() + days)
  return now.toISOString();
}

export function parseTimeToIso(time: string): string {
  return (new Date(Date.parse(time))).toISOString();
}

export function stringifyObject(value: any): string {
  if (typeof value === "string") {
    return value;
  }
  return JSON.stringify(value);
}

export function lowerCaseFirst(s:string){
  return s[0].toLowerCase() + s.slice(1);
}
export function upperCaseFirst(s:string){
  return s[0].toUpperCase() + s.slice(1);
}

export function standardizePartyId(parties : any, party : string){
  return parties.find((x : any) => x.displayName === party)?.identifier
}

export function normalizeDablPartyId(parties : any, party : string){
  return parties.find((x : any) => x.identifier === party)?.displayName
}

export function getDablPartyParticipants(participants : any){
  const dablPartyParticipants = Object.entries(participants.party_participants);
  return Array.from(
    dablPartyParticipants.map((p : any)=> ({displayName : upperCaseFirst(p[1]), identifier : p[0], isLocal:false})));
}

export function extractRouteFromPath(path : string){
  const [basePath] = path.split('/').slice(-1);
  return basePath;
}
export function lookupPathVisibility(fullPath : string, pageVisibilityMap : any[]){
  const basePath = extractRouteFromPath(fullPath);
  return pageVisibilityMap.find(pageVisibility => pageVisibility.path === basePath).visibility;
}
