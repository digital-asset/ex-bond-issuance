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

var DA_RefApps_Bond_Lock = require('../../../../DA/RefApps/Bond/Lock/module');
var DA_RefApps_Bond_Redemption = require('../../../../DA/RefApps/Bond/Redemption/module');


exports.InvestorSettlement_Finalize = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({auctionLockedCashCids: damlTypes.List(damlTypes.ContractId(DA_RefApps_Bond_Lock.AuctionLockedCash)).decoder, cashAssetFungible: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetFungible).decoder, investorCashSettlementCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement).decoder, }); }),
  encode: function (__typed__) {
  return {
    auctionLockedCashCids: damlTypes.List(damlTypes.ContractId(DA_RefApps_Bond_Lock.AuctionLockedCash)).encode(__typed__.auctionLockedCashCids),
    cashAssetFungible: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetFungible).encode(__typed__.cashAssetFungible),
    investorCashSettlementCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement).encode(__typed__.investorCashSettlementCid),
  };
}
,
};



exports.InvestorSettlement = {
  templateId: '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Settlement:InvestorSettlement',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({investor: damlTypes.Party.decoder, issuer: damlTypes.Party.decoder, auctionAgent: damlTypes.Party.decoder, auctionName: damlTypes.Text.decoder, settleRequestCids: damlTypes.List(damlTypes.ContractId(exports.AuctionSettleRequest)).decoder, cashProvider: damlTypes.Party.decoder, regulators: damlTypes.List(damlTypes.Party).decoder, }); }),
  encode: function (__typed__) {
  return {
    investor: damlTypes.Party.encode(__typed__.investor),
    issuer: damlTypes.Party.encode(__typed__.issuer),
    auctionAgent: damlTypes.Party.encode(__typed__.auctionAgent),
    auctionName: damlTypes.Text.encode(__typed__.auctionName),
    settleRequestCids: damlTypes.List(damlTypes.ContractId(exports.AuctionSettleRequest)).encode(__typed__.settleRequestCids),
    cashProvider: damlTypes.Party.encode(__typed__.cashProvider),
    regulators: damlTypes.List(damlTypes.Party).encode(__typed__.regulators),
  };
}
,
  Archive: {
    template: function () { return exports.InvestorSettlement; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  InvestorSettlement_Finalize: {
    template: function () { return exports.InvestorSettlement; },
    choiceName: 'InvestorSettlement_Finalize',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.InvestorSettlement_Finalize.decoder; }),
    argumentEncode: function (__typed__) { return exports.InvestorSettlement_Finalize.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.List(damlTypes.ContractId(DA_RefApps_Bond_Redemption.RedemptionPayoutInfo)).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.List(damlTypes.ContractId(DA_RefApps_Bond_Redemption.RedemptionPayoutInfo)).encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.InvestorSettlement);



exports.AuctionSettleRequest = {
  templateId: '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Settlement:AuctionSettleRequest',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({investor: damlTypes.Party.decoder, issuer: damlTypes.Party.decoder, auctionAgent: damlTypes.Party.decoder, auctionName: damlTypes.Text.decoder, issuerCashAccountProvider: damlTypes.Party.decoder, issuerBondAssetDepositCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit).decoder, issuerBondAssetDeposit: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit.decoder, cashAmountToPay: damlTypes.Numeric(10).decoder, bondSettlementChainCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlementChain).decoder, issuerCashSettlementCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement).decoder, cashAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id.decoder, regulators: damlTypes.List(damlTypes.Party).decoder, }); }),
  encode: function (__typed__) {
  return {
    investor: damlTypes.Party.encode(__typed__.investor),
    issuer: damlTypes.Party.encode(__typed__.issuer),
    auctionAgent: damlTypes.Party.encode(__typed__.auctionAgent),
    auctionName: damlTypes.Text.encode(__typed__.auctionName),
    issuerCashAccountProvider: damlTypes.Party.encode(__typed__.issuerCashAccountProvider),
    issuerBondAssetDepositCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit).encode(__typed__.issuerBondAssetDepositCid),
    issuerBondAssetDeposit: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit.encode(__typed__.issuerBondAssetDeposit),
    cashAmountToPay: damlTypes.Numeric(10).encode(__typed__.cashAmountToPay),
    bondSettlementChainCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlementChain).encode(__typed__.bondSettlementChainCid),
    issuerCashSettlementCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement).encode(__typed__.issuerCashSettlementCid),
    cashAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id.encode(__typed__.cashAssetId),
    regulators: damlTypes.List(damlTypes.Party).encode(__typed__.regulators),
  };
}
,
  Archive: {
    template: function () { return exports.AuctionSettleRequest; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.AuctionSettleRequest);

