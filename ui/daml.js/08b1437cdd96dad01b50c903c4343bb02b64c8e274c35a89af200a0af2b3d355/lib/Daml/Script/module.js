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


exports.LedgerValue = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.SubmitFailure = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({status: damlTypes.Int.decoder, description: damlTypes.Text.decoder, }); }),
  encode: function (__typed__) {
  return {
    status: damlTypes.Int.encode(__typed__.status),
    description: damlTypes.Text.encode(__typed__.description),
  };
}
,
};



exports.PartyDetails = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({party: damlTypes.Party.decoder, displayName: damlTypes.Optional(damlTypes.Text).decoder, isLocal: damlTypes.Bool.decoder, }); }),
  encode: function (__typed__) {
  return {
    party: damlTypes.Party.encode(__typed__.party),
    displayName: damlTypes.Optional(damlTypes.Text).encode(__typed__.displayName),
    isLocal: damlTypes.Bool.encode(__typed__.isLocal),
  };
}
,
};



exports.ParticipantName = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({participantName: damlTypes.Text.decoder, }); }),
  encode: function (__typed__) {
  return {
    participantName: damlTypes.Text.encode(__typed__.participantName),
  };
}
,
};



exports.PartyIdHint = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({partyIdHint: damlTypes.Text.decoder, }); }),
  encode: function (__typed__) {
  return {
    partyIdHint: damlTypes.Text.encode(__typed__.partyIdHint),
  };
}
,
};

