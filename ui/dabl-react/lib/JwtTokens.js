/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
function fieldFromDablJWT(token, fieldName) {
    var decoded = jsonwebtoken_1.decode(token);
    if (!decoded || typeof (decoded) === "string") {
        console.warn("JWT not in projectDABL format: " + token);
        return null;
    }
    else {
        return decoded[fieldName];
    }
}
/**
 * Extract the name of the party, as supplied when that Party authenticates themselves with DABL, from a JWT token.
 * @param token A JWT from DABL.
 */
function partyName(token) {
    return fieldFromDablJWT(token, "partyName");
}
exports.partyName = partyName;
/**
 * JWT's from DABL expire every 24 hours.
 * @param token A JWT from DABL.
 */
function expiredToken(token) {
    var expInUnixEpoch = fieldFromDablJWT(token, "exp");
    if (expInUnixEpoch === null) {
        return true;
    }
    else {
        var asSeconds = parseInt(expInUnixEpoch, 10);
        if (asSeconds === undefined) {
            return true;
        }
        else {
            return asSeconds <= (new Date()).getTime() / 1000;
        }
    }
}
exports.expiredToken = expiredToken;
//# sourceMappingURL=JwtTokens.js.map