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
var DA_Finance_Fact_Instrument_Equity = require('../../../../../DA/Finance/Fact/Instrument/Equity/module');


exports.EquityStockSplitLifecycle_Process = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({stockSplitCid: damlTypes.ContractId(DA_Finance_Fact_Instrument_Equity.EquityStockSplit).decoder, }); }),
  encode: function (__typed__) {
  return {
    stockSplitCid: damlTypes.ContractId(DA_Finance_Fact_Instrument_Equity.EquityStockSplit).encode(__typed__.stockSplitCid),
  };
}
,
};



exports.EquityStockSplitLifecycle = {
  templateId: 'f2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc:DA.Finance.Rule.Instrument.Equity:EquityStockSplitLifecycle',
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
    template: function () { return exports.EquityStockSplitLifecycle; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  EquityStockSplitLifecycle_Process: {
    template: function () { return exports.EquityStockSplitLifecycle; },
    choiceName: 'EquityStockSplitLifecycle_Process',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.EquityStockSplitLifecycle_Process.decoder; }),
    argumentEncode: function (__typed__) { return exports.EquityStockSplitLifecycle_Process.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(DA_Finance_Fact_Asset.AssetDecomposition).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(DA_Finance_Fact_Asset.AssetDecomposition).encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.EquityStockSplitLifecycle);



exports.EquityCashDividendLifecycle_Process = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({dividendCid: damlTypes.ContractId(DA_Finance_Fact_Instrument_Equity.EquityCashDividend).decoder, entitlementIdLabel: damlTypes.Text.decoder, }); }),
  encode: function (__typed__) {
  return {
    dividendCid: damlTypes.ContractId(DA_Finance_Fact_Instrument_Equity.EquityCashDividend).encode(__typed__.dividendCid),
    entitlementIdLabel: damlTypes.Text.encode(__typed__.entitlementIdLabel),
  };
}
,
};



exports.EquityCashDividendLifecycle = {
  templateId: 'f2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc:DA.Finance.Rule.Instrument.Equity:EquityCashDividendLifecycle',
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
  EquityCashDividendLifecycle_Process: {
    template: function () { return exports.EquityCashDividendLifecycle; },
    choiceName: 'EquityCashDividendLifecycle_Process',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.EquityCashDividendLifecycle_Process.decoder; }),
    argumentEncode: function (__typed__) { return exports.EquityCashDividendLifecycle_Process.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return exports.EquityCashDividendLifecycle_Process_Result.decoder; }),
    resultEncode: function (__typed__) { return exports.EquityCashDividendLifecycle_Process_Result.encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.EquityCashDividendLifecycle; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.EquityCashDividendLifecycle);



exports.EquityCashDividendLifecycle_Process_Result = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({entitlementCid: damlTypes.ContractId(DA_Finance_Fact_Instrument_Entitlement.Entitlement).decoder, decompositionCid: damlTypes.ContractId(DA_Finance_Fact_Asset.AssetDecomposition).decoder, }); }),
  encode: function (__typed__) {
  return {
    entitlementCid: damlTypes.ContractId(DA_Finance_Fact_Instrument_Entitlement.Entitlement).encode(__typed__.entitlementCid),
    decompositionCid: damlTypes.ContractId(DA_Finance_Fact_Asset.AssetDecomposition).encode(__typed__.decompositionCid),
  };
}
,
};

