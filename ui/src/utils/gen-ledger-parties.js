/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
const fs = require('fs');
const participants = require('../participants.json');

var stream = fs.createWriteStream("ledger-parties.json");

// "chrisNorris",
var desiredParties = [ "auctionAgent", "csd", "bank1", "bank2", "bank3", "issuer", "centralBank", "regulator", "operator"];

stream.once('open', function() {
  stream.write(JSON.stringify(Object.fromEntries(Object.entries(participants.party_participants)
  .filter(participant => desiredParties.includes(participant[1]))
  .map(participant => [participant[1], participant[0]])
  )));
  stream.end();
});
