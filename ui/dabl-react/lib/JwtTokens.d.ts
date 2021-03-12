///
/// Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
/// SPDX-License-Identifier: Apache-2.0
///

/**
 * Extract the name of the party, as supplied when that Party authenticates themselves with DABL, from a JWT token.
 * @param token A JWT from DABL.
 */
export declare function partyName(token: string): string | null;
/**
 * JWT's from DABL expire every 24 hours.
 * @param token A JWT from DABL.
 */
export declare function expiredToken(token: string): boolean;
