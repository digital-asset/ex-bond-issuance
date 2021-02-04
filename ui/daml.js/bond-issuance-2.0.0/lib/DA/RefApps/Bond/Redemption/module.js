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

var pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 = require('@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662');
var pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc = require('@daml.js/finlib-1.0.0');

var DA_RefApps_Bond_FixedRateBond = require('../../../../DA/RefApps/Bond/FixedRateBond/module');


exports.BondArchivalRequest_Archive = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.BondArchivalRequest = {
  templateId: '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Redemption:BondArchivalRequest',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({provider: damlTypes.Party.decoder, owner: damlTypes.Party.decoder, issuer: damlTypes.Party.decoder, bondAssetDepositCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit).decoder, regulators: damlTypes.List(damlTypes.Party).decoder, }); }),
  encode: function (__typed__) {
  return {
    provider: damlTypes.Party.encode(__typed__.provider),
    owner: damlTypes.Party.encode(__typed__.owner),
    issuer: damlTypes.Party.encode(__typed__.issuer),
    bondAssetDepositCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit).encode(__typed__.bondAssetDepositCid),
    regulators: damlTypes.List(damlTypes.Party).encode(__typed__.regulators),
  };
}
,
  Archive: {
    template: function () { return exports.BondArchivalRequest; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  BondArchivalRequest_Archive: {
    template: function () { return exports.BondArchivalRequest; },
    choiceName: 'BondArchivalRequest_Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.BondArchivalRequest_Archive.decoder; }),
    argumentEncode: function (__typed__) { return exports.BondArchivalRequest_Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.BondArchivalRequest);



exports.RedemptionFinalizeBotTrigger_Finalize = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({cashAssetDepositCids: damlTypes.List(damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit)).decoder, cashAssetSettlementCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement).decoder, cashAssetFungibleCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetFungible).decoder, }); }),
  encode: function (__typed__) {
  return {
    cashAssetDepositCids: damlTypes.List(damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit)).encode(__typed__.cashAssetDepositCids),
    cashAssetSettlementCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement).encode(__typed__.cashAssetSettlementCid),
    cashAssetFungibleCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetFungible).encode(__typed__.cashAssetFungibleCid),
  };
}
,
};



exports.RedemptionFinalizeBotTrigger = {
  templateId: '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Redemption:RedemptionFinalizeBotTrigger',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({issuer: damlTypes.Party.decoder, bondAccountProvider: damlTypes.Party.decoder, instructions: damlTypes.List(exports.RedemptionInstruction).decoder, cashAccountProviders: damlTypes.List(damlTypes.Party).decoder, cashAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id.decoder, regulators: damlTypes.List(damlTypes.Party).decoder, }); }),
  encode: function (__typed__) {
  return {
    issuer: damlTypes.Party.encode(__typed__.issuer),
    bondAccountProvider: damlTypes.Party.encode(__typed__.bondAccountProvider),
    instructions: damlTypes.List(exports.RedemptionInstruction).encode(__typed__.instructions),
    cashAccountProviders: damlTypes.List(damlTypes.Party).encode(__typed__.cashAccountProviders),
    cashAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id.encode(__typed__.cashAssetId),
    regulators: damlTypes.List(damlTypes.Party).encode(__typed__.regulators),
  };
}
,
  RedemptionFinalizeBotTrigger_Finalize: {
    template: function () { return exports.RedemptionFinalizeBotTrigger; },
    choiceName: 'RedemptionFinalizeBotTrigger_Finalize',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.RedemptionFinalizeBotTrigger_Finalize.decoder; }),
    argumentEncode: function (__typed__) { return exports.RedemptionFinalizeBotTrigger_Finalize.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.List(damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit)).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.List(damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit)).encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.RedemptionFinalizeBotTrigger; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.RedemptionFinalizeBotTrigger);



exports.RedemptionInstruction = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({issuer: damlTypes.Party.decoder, provider: damlTypes.Party.decoder, investor: damlTypes.Party.decoder, payment: damlTypes.Numeric(10).decoder, bondAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id.decoder, currency: damlTypes.Text.decoder, bondAssetDepositCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit).decoder, redemptionPayoutInfoCid: damlTypes.ContractId(exports.RedemptionPayoutInfo).decoder, fixedRateBondFactCid: damlTypes.ContractId(DA_RefApps_Bond_FixedRateBond.FixedRateBondFact).decoder, bondArchivalRequestCid: damlTypes.ContractId(exports.BondArchivalRequest).decoder, }); }),
  encode: function (__typed__) {
  return {
    issuer: damlTypes.Party.encode(__typed__.issuer),
    provider: damlTypes.Party.encode(__typed__.provider),
    investor: damlTypes.Party.encode(__typed__.investor),
    payment: damlTypes.Numeric(10).encode(__typed__.payment),
    bondAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id.encode(__typed__.bondAssetId),
    currency: damlTypes.Text.encode(__typed__.currency),
    bondAssetDepositCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit).encode(__typed__.bondAssetDepositCid),
    redemptionPayoutInfoCid: damlTypes.ContractId(exports.RedemptionPayoutInfo).encode(__typed__.redemptionPayoutInfoCid),
    fixedRateBondFactCid: damlTypes.ContractId(DA_RefApps_Bond_FixedRateBond.FixedRateBondFact).encode(__typed__.fixedRateBondFactCid),
    bondArchivalRequestCid: damlTypes.ContractId(exports.BondArchivalRequest).encode(__typed__.bondArchivalRequestCid),
  };
}
,
};



exports.RedemptionCalculationBotTrigger_Start = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({redemptionPayoutInfos: damlTypes.List(damlTypes.ContractId(exports.RedemptionPayoutInfo)).decoder, bondsAtIssuer: damlTypes.List(damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit)).decoder, }); }),
  encode: function (__typed__) {
  return {
    redemptionPayoutInfos: damlTypes.List(damlTypes.ContractId(exports.RedemptionPayoutInfo)).encode(__typed__.redemptionPayoutInfos),
    bondsAtIssuer: damlTypes.List(damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit)).encode(__typed__.bondsAtIssuer),
  };
}
,
};



exports.RedemptionCalculationBotTrigger = {
  templateId: '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Redemption:RedemptionCalculationBotTrigger',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({issuer: damlTypes.Party.decoder, provider: damlTypes.Party.decoder, fixedRateBondFactCid: damlTypes.ContractId(DA_RefApps_Bond_FixedRateBond.FixedRateBondFact).decoder, bondAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id.decoder, cashAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id.decoder, regulators: damlTypes.List(damlTypes.Party).decoder, }); }),
  encode: function (__typed__) {
  return {
    issuer: damlTypes.Party.encode(__typed__.issuer),
    provider: damlTypes.Party.encode(__typed__.provider),
    fixedRateBondFactCid: damlTypes.ContractId(DA_RefApps_Bond_FixedRateBond.FixedRateBondFact).encode(__typed__.fixedRateBondFactCid),
    bondAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id.encode(__typed__.bondAssetId),
    cashAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id.encode(__typed__.cashAssetId),
    regulators: damlTypes.List(damlTypes.Party).encode(__typed__.regulators),
  };
}
,
  RedemptionCalculationBotTrigger_Start: {
    template: function () { return exports.RedemptionCalculationBotTrigger; },
    choiceName: 'RedemptionCalculationBotTrigger_Start',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.RedemptionCalculationBotTrigger_Start.decoder; }),
    argumentEncode: function (__typed__) { return exports.RedemptionCalculationBotTrigger_Start.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Optional(damlTypes.ContractId(exports.RedemptionFinalizeBotTrigger)).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Optional(damlTypes.ContractId(exports.RedemptionFinalizeBotTrigger)).encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.RedemptionCalculationBotTrigger; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.RedemptionCalculationBotTrigger);



exports.RedemptionRequest_Accept = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.RedemptionRequest = {
  templateId: '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Redemption:RedemptionRequest',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({issuer: damlTypes.Party.decoder, provider: damlTypes.Party.decoder, fixedRateBondFactCid: damlTypes.ContractId(DA_RefApps_Bond_FixedRateBond.FixedRateBondFact).decoder, isin: damlTypes.Text.decoder, regulators: damlTypes.List(damlTypes.Party).decoder, }); }),
  encode: function (__typed__) {
  return {
    issuer: damlTypes.Party.encode(__typed__.issuer),
    provider: damlTypes.Party.encode(__typed__.provider),
    fixedRateBondFactCid: damlTypes.ContractId(DA_RefApps_Bond_FixedRateBond.FixedRateBondFact).encode(__typed__.fixedRateBondFactCid),
    isin: damlTypes.Text.encode(__typed__.isin),
    regulators: damlTypes.List(damlTypes.Party).encode(__typed__.regulators),
  };
}
,
  RedemptionRequest_Accept: {
    template: function () { return exports.RedemptionRequest; },
    choiceName: 'RedemptionRequest_Accept',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.RedemptionRequest_Accept.decoder; }),
    argumentEncode: function (__typed__) { return exports.RedemptionRequest_Accept.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.RedemptionCalculationBotTrigger).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.RedemptionCalculationBotTrigger).encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.RedemptionRequest; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.RedemptionRequest);



exports.RedemptionPayoutInfo_Redeem = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({cashAssetDepositCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit).decoder, issuerCashAssetSettlementCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement).decoder, bondArchivalRequestCid: damlTypes.ContractId(exports.BondArchivalRequest).decoder, fixedRateBondFactCid: damlTypes.ContractId(DA_RefApps_Bond_FixedRateBond.FixedRateBondFact).decoder, }); }),
  encode: function (__typed__) {
  return {
    cashAssetDepositCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit).encode(__typed__.cashAssetDepositCid),
    issuerCashAssetSettlementCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement).encode(__typed__.issuerCashAssetSettlementCid),
    bondArchivalRequestCid: damlTypes.ContractId(exports.BondArchivalRequest).encode(__typed__.bondArchivalRequestCid),
    fixedRateBondFactCid: damlTypes.ContractId(DA_RefApps_Bond_FixedRateBond.FixedRateBondFact).encode(__typed__.fixedRateBondFactCid),
  };
}
,
};



exports.RedemptionPayoutInfo = {
  templateId: '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Redemption:RedemptionPayoutInfo',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({issuer: damlTypes.Party.decoder, investor: damlTypes.Party.decoder, bondInstrumentId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id.decoder, bondAccountProvider: damlTypes.Party.decoder, investorCashAccount: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Account.decoder, settlementResult: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Trade.Dvp.DvpSettlement_Process_Result.decoder, investorCashAssetSettlementCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement).decoder, regulators: damlTypes.List(damlTypes.Party).decoder, }); }),
  encode: function (__typed__) {
  return {
    issuer: damlTypes.Party.encode(__typed__.issuer),
    investor: damlTypes.Party.encode(__typed__.investor),
    bondInstrumentId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id.encode(__typed__.bondInstrumentId),
    bondAccountProvider: damlTypes.Party.encode(__typed__.bondAccountProvider),
    investorCashAccount: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Account.encode(__typed__.investorCashAccount),
    settlementResult: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Trade.Dvp.DvpSettlement_Process_Result.encode(__typed__.settlementResult),
    investorCashAssetSettlementCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement).encode(__typed__.investorCashAssetSettlementCid),
    regulators: damlTypes.List(damlTypes.Party).encode(__typed__.regulators),
  };
}
,
  RedemptionPayoutInfo_Redeem: {
    template: function () { return exports.RedemptionPayoutInfo; },
    choiceName: 'RedemptionPayoutInfo_Redeem',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.RedemptionPayoutInfo_Redeem.decoder; }),
    argumentEncode: function (__typed__) { return exports.RedemptionPayoutInfo_Redeem.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit).encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.RedemptionPayoutInfo; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.RedemptionPayoutInfo);

