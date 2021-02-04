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

var DA_Finance_Fact_Asset = require('../../../DA/Finance/Fact/Asset/module');
var DA_Finance_Fact_Trade_Dvp = require('../../../DA/Finance/Fact/Trade/Dvp/module');
var DA_Finance_Rule_Asset = require('../../../DA/Finance/Rule/Asset/module');
var DA_Finance_Rule_Instrument_Entitlement = require('../../../DA/Finance/Rule/Instrument/Entitlement/module');
var DA_Finance_Rule_Instrument_Equity = require('../../../DA/Finance/Rule/Instrument/Equity/module');
var DA_Finance_Rule_Trade_Dvp = require('../../../DA/Finance/Rule/Trade/Dvp/module');
var Test_Finance_Helpers = require('../../../Test/Finance/Helpers/module');


exports.MarketSetup_Process = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.MarketSetup_Sign = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.MarketSetup = {
  templateId: 'f2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc:Test.Finance.Market:MarketSetup',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({signatories: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set(damlTypes.Party).decoder, partyMap: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Map.Map(damlTypes.Text, damlTypes.Party).decoder, trustModel: exports.MarketTrustModel.decoder, }); }),
  encode: function (__typed__) {
  return {
    signatories: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set(damlTypes.Party).encode(__typed__.signatories),
    partyMap: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Map.Map(damlTypes.Text, damlTypes.Party).encode(__typed__.partyMap),
    trustModel: exports.MarketTrustModel.encode(__typed__.trustModel),
  };
}
,
  Archive: {
    template: function () { return exports.MarketSetup; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  MarketSetup_Process: {
    template: function () { return exports.MarketSetup; },
    choiceName: 'MarketSetup_Process',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.MarketSetup_Process.decoder; }),
    argumentEncode: function (__typed__) { return exports.MarketSetup_Process.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return exports.MarketSetup_Process_Result.decoder; }),
    resultEncode: function (__typed__) { return exports.MarketSetup_Process_Result.encode(__typed__); },
  },
  MarketSetup_Sign: {
    template: function () { return exports.MarketSetup; },
    choiceName: 'MarketSetup_Sign',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.MarketSetup_Sign.decoder; }),
    argumentEncode: function (__typed__) { return exports.MarketSetup_Sign.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.MarketSetup).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.MarketSetup).encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.MarketSetup);



exports.MarketSetup_Process_Result = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({partyMap: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Map.Map(damlTypes.Text, damlTypes.Party).decoder, assetFungibleMap: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Map.Map(damlTypes.Text, damlTypes.ContractId(DA_Finance_Rule_Asset.AssetFungible)).decoder, assetSettlementMap: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Map.Map(damlTypes.Text, damlTypes.ContractId(DA_Finance_Rule_Asset.AssetSettlement)).decoder, assetLifecycleMap: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Map.Map(damlTypes.Text, damlTypes.ContractId(DA_Finance_Rule_Asset.AssetLifecycle)).decoder, assetDepositMap: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Map.Map(damlTypes.Text, damlTypes.ContractId(DA_Finance_Fact_Asset.AssetDeposit)).decoder, dvpInstructionMap: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Map.Map(damlTypes.Text, damlTypes.ContractId(Test_Finance_Helpers.DvpInstruction)).decoder, dvpSettlementMap: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Map.Map(damlTypes.Text, damlTypes.ContractId(DA_Finance_Rule_Trade_Dvp.DvpSettlement)).decoder, dvpLifecycleMap: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Map.Map(damlTypes.Text, damlTypes.ContractId(DA_Finance_Rule_Trade_Dvp.DvpLifecycle)).decoder, dvpMap: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Map.Map(damlTypes.Text, damlTypes.ContractId(DA_Finance_Fact_Trade_Dvp.Dvp)).decoder, equityCashDividendLifecycleMap: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Map.Map(damlTypes.Text, damlTypes.ContractId(DA_Finance_Rule_Instrument_Equity.EquityCashDividendLifecycle)).decoder, equityStockSplitLifecycleMap: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Map.Map(damlTypes.Text, damlTypes.ContractId(DA_Finance_Rule_Instrument_Equity.EquityStockSplitLifecycle)).decoder, entitlementLifecycleMap: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Map.Map(damlTypes.Text, damlTypes.ContractId(DA_Finance_Rule_Instrument_Entitlement.EntitlementLifecycle)).decoder, }); }),
  encode: function (__typed__) {
  return {
    partyMap: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Map.Map(damlTypes.Text, damlTypes.Party).encode(__typed__.partyMap),
    assetFungibleMap: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Map.Map(damlTypes.Text, damlTypes.ContractId(DA_Finance_Rule_Asset.AssetFungible)).encode(__typed__.assetFungibleMap),
    assetSettlementMap: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Map.Map(damlTypes.Text, damlTypes.ContractId(DA_Finance_Rule_Asset.AssetSettlement)).encode(__typed__.assetSettlementMap),
    assetLifecycleMap: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Map.Map(damlTypes.Text, damlTypes.ContractId(DA_Finance_Rule_Asset.AssetLifecycle)).encode(__typed__.assetLifecycleMap),
    assetDepositMap: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Map.Map(damlTypes.Text, damlTypes.ContractId(DA_Finance_Fact_Asset.AssetDeposit)).encode(__typed__.assetDepositMap),
    dvpInstructionMap: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Map.Map(damlTypes.Text, damlTypes.ContractId(Test_Finance_Helpers.DvpInstruction)).encode(__typed__.dvpInstructionMap),
    dvpSettlementMap: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Map.Map(damlTypes.Text, damlTypes.ContractId(DA_Finance_Rule_Trade_Dvp.DvpSettlement)).encode(__typed__.dvpSettlementMap),
    dvpLifecycleMap: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Map.Map(damlTypes.Text, damlTypes.ContractId(DA_Finance_Rule_Trade_Dvp.DvpLifecycle)).encode(__typed__.dvpLifecycleMap),
    dvpMap: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Map.Map(damlTypes.Text, damlTypes.ContractId(DA_Finance_Fact_Trade_Dvp.Dvp)).encode(__typed__.dvpMap),
    equityCashDividendLifecycleMap: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Map.Map(damlTypes.Text, damlTypes.ContractId(DA_Finance_Rule_Instrument_Equity.EquityCashDividendLifecycle)).encode(__typed__.equityCashDividendLifecycleMap),
    equityStockSplitLifecycleMap: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Map.Map(damlTypes.Text, damlTypes.ContractId(DA_Finance_Rule_Instrument_Equity.EquityStockSplitLifecycle)).encode(__typed__.equityStockSplitLifecycleMap),
    entitlementLifecycleMap: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Map.Map(damlTypes.Text, damlTypes.ContractId(DA_Finance_Rule_Instrument_Entitlement.EntitlementLifecycle)).encode(__typed__.entitlementLifecycleMap),
  };
}
,
};



exports.MarketTrustModel = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({account: exports.TrustModel.decoder, masterAgreement: exports.TrustModel.decoder, }); }),
  encode: function (__typed__) {
  return {
    account: exports.TrustModel.encode(__typed__.account),
    masterAgreement: exports.TrustModel.encode(__typed__.masterAgreement),
  };
}
,
};



exports.TrustModel = {
  TrustModel_Bilateral: 'TrustModel_Bilateral',
  TrustModel_Unilateral: 'TrustModel_Unilateral',
  TrustModel_Agent: 'TrustModel_Agent',
  keys: ['TrustModel_Bilateral','TrustModel_Unilateral','TrustModel_Agent',],
  decoder: damlTypes.lazyMemo(function () { return jtv.oneOf(jtv.constant(exports.TrustModel.TrustModel_Bilateral), jtv.constant(exports.TrustModel.TrustModel_Unilateral), jtv.constant(exports.TrustModel.TrustModel_Agent)); }),
  encode: function (__typed__) { return __typed__; },
};

