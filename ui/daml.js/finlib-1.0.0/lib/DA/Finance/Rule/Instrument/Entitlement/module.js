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
var pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 = require('@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662');

var DA_Finance_Fact_Asset = require('../../../../../DA/Finance/Fact/Asset/module');
var DA_Finance_Fact_Instrument_Entitlement = require('../../../../../DA/Finance/Fact/Instrument/Entitlement/module');


exports.EntitlementLifecycle_Process = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({entitlementCid: damlTypes.ContractId(DA_Finance_Fact_Instrument_Entitlement.Entitlement).decoder, }); }),
  encode: function (__typed__) {
  return {
    entitlementCid: damlTypes.ContractId(DA_Finance_Fact_Instrument_Entitlement.Entitlement).encode(__typed__.entitlementCid),
  };
}
,
};



exports.EntitlementLifecycle = {
  templateId: 'f2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc:DA.Finance.Rule.Instrument.Entitlement:EntitlementLifecycle',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({signatories: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set(damlTypes.Party).decoder, observers: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set(damlTypes.Party).decoder, }); }),
  encode: function (__typed__) {
  return {
    signatories: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set(damlTypes.Party).encode(__typed__.signatories),
    observers: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set(damlTypes.Party).encode(__typed__.observers),
  };
}
,
  Archive: {
    template: function () { return exports.EntitlementLifecycle; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  EntitlementLifecycle_Process: {
    template: function () { return exports.EntitlementLifecycle; },
    choiceName: 'EntitlementLifecycle_Process',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.EntitlementLifecycle_Process.decoder; }),
    argumentEncode: function (__typed__) { return exports.EntitlementLifecycle_Process.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(DA_Finance_Fact_Asset.AssetDecomposition).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(DA_Finance_Fact_Asset.AssetDecomposition).encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.EntitlementLifecycle);

