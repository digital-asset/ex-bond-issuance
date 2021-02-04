"use strict";
/* eslint-disable-next-line no-unused-vars */
function __export(m) {
/* eslint-disable-next-line no-prototype-builtins */
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable-next-line no-unused-vars */
var jtv = require('@mojotech/json-type-validation');
/* eslint-disable-next-line no-unused-vars */
var damlTypes = require('@daml/types');
/* eslint-disable-next-line no-unused-vars */
var damlLedger = require('@daml/ledger');


exports.BondIssuanceParties = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({auctionAgent: damlTypes.Party.decoder, csd: damlTypes.Party.decoder, bank1: damlTypes.Party.decoder, bank2: damlTypes.Party.decoder, bank3: damlTypes.Party.decoder, issuer: damlTypes.Party.decoder, centralBank: damlTypes.Party.decoder, regulator: damlTypes.Party.decoder, operator: damlTypes.Party.decoder, }); }),
  encode: function (__typed__) {
  return {
    auctionAgent: damlTypes.Party.encode(__typed__.auctionAgent),
    csd: damlTypes.Party.encode(__typed__.csd),
    bank1: damlTypes.Party.encode(__typed__.bank1),
    bank2: damlTypes.Party.encode(__typed__.bank2),
    bank3: damlTypes.Party.encode(__typed__.bank3),
    issuer: damlTypes.Party.encode(__typed__.issuer),
    centralBank: damlTypes.Party.encode(__typed__.centralBank),
    regulator: damlTypes.Party.encode(__typed__.regulator),
    operator: damlTypes.Party.encode(__typed__.operator),
  };
}
,
};

