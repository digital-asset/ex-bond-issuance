/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import participants from '../participants.json';

export function addPath (baseUrl, path) {
  return baseUrl.endsWith('/') ? `${baseUrl}${path}` : `${baseUrl}/${path}`;
}

function addSpacesBetweenWords(s) {
  return s?.replace(/([a-z])([A-Z1-9])/g, '$1 $2');
}

function isDablParty(name){
  return name.includes("ledger-party");
}

function getDisplayNameDabl(partyId) {
  var dablPartyParticipants = getDablPartyParticipants(participants);
  return normalizeDablPartyId(dablPartyParticipants, partyId);
}

export function shorten(text) {
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
      text = text.map((t) => shorten(t));
      return text.join(", ");
    } else {
      return shorten(stringifyObject(text));
    }
  }
  return text;
}

function stringifyObject(value) {
  if (typeof value === "string") {
    return value;
  }
  return JSON.stringify(value);
}

export function lowerCaseFirst(s){
  return s[0].toLowerCase() + s.slice(1);
}

function upperCaseFirst(s){
  return s[0].toUpperCase() + s.slice(1);
}

export function standardizePartyId(parties, party ){
  return parties.find((x) => x.displayName === party)?.identifier
}

function normalizeDablPartyId(parties, party ){
  return parties.find((x) => x.identifier === party)?.displayName
}

export function getDablPartyParticipants(participants){
  const dablPartyParticipants = Object.entries(participants.party_participants);
  return Array.from(
    dablPartyParticipants.map((p)=> ({displayName : upperCaseFirst(p[1]), identifier : p[0], isLocal:false})));
}
