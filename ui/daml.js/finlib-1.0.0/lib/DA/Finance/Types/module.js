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

var pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14 = require('@daml.js/52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14');


exports.SettlementStatus = {
  SettlementStatus_Pending: 'SettlementStatus_Pending',
  SettlementStatus_Instructed: 'SettlementStatus_Instructed',
  SettlementStatus_Settled: 'SettlementStatus_Settled',
  keys: ['SettlementStatus_Pending','SettlementStatus_Instructed','SettlementStatus_Settled',],
  decoder: damlTypes.lazyMemo(function () { return jtv.oneOf(jtv.constant(exports.SettlementStatus.SettlementStatus_Pending), jtv.constant(exports.SettlementStatus.SettlementStatus_Instructed), jtv.constant(exports.SettlementStatus.SettlementStatus_Settled)); }),
  encode: function (__typed__) { return __typed__; },
};



exports.Asset = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({id: exports.Id.decoder, quantity: damlTypes.Numeric(10).decoder, }); }),
  encode: function (__typed__) {
  return {
    id: exports.Id.encode(__typed__.id),
    quantity: damlTypes.Numeric(10).encode(__typed__.quantity),
  };
}
,
};



exports.MasterAgreement = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({id: exports.Id.decoder, party1: damlTypes.Party.decoder, party2: damlTypes.Party.decoder, }); }),
  encode: function (__typed__) {
  return {
    id: exports.Id.encode(__typed__.id),
    party1: damlTypes.Party.encode(__typed__.party1),
    party2: damlTypes.Party.encode(__typed__.party2),
  };
}
,
};



exports.Account = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({id: exports.Id.decoder, provider: damlTypes.Party.decoder, owner: damlTypes.Party.decoder, }); }),
  encode: function (__typed__) {
  return {
    id: exports.Id.encode(__typed__.id),
    provider: damlTypes.Party.encode(__typed__.provider),
    owner: damlTypes.Party.encode(__typed__.owner),
  };
}
,
};



exports.Id = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({signatories: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set(damlTypes.Party).decoder, label: damlTypes.Text.decoder, version: damlTypes.Int.decoder, }); }),
  encode: function (__typed__) {
  return {
    signatories: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set(damlTypes.Party).encode(__typed__.signatories),
    label: damlTypes.Text.encode(__typed__.label),
    version: damlTypes.Int.encode(__typed__.version),
  };
}
,
};

