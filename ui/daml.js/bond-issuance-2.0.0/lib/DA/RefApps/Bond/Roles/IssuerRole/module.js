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

var pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7 = require('@daml.js/40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7');
var pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 = require('@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662');
var pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc = require('@daml.js/finlib-1.0.0');

var DA_RefApps_Bond_Auction = require('../../../../../DA/RefApps/Bond/Auction/module');
var DA_RefApps_Bond_FixedRateBond = require('../../../../../DA/RefApps/Bond/FixedRateBond/module');
var DA_RefApps_Bond_Redemption = require('../../../../../DA/RefApps/Bond/Redemption/module');


exports.IssuanceRequest_Accept = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({isin: damlTypes.Text.decoder, }); }),
  encode: function (__typed__) {
  return {
    isin: damlTypes.Text.encode(__typed__.isin),
  };
}
,
};



exports.IssuanceRequest = {
  templateId: '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Roles.IssuerRole:IssuanceRequest',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({issuer: damlTypes.Party.decoder, operator: damlTypes.Party.decoder, regulators: damlTypes.List(damlTypes.Party).decoder, issueSize: damlTypes.Int.decoder, issueDate: damlTypes.Date.decoder, maturityDate: damlTypes.Date.decoder, cashAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id.decoder, denomination: damlTypes.Numeric(10).decoder, couponRate: damlTypes.Numeric(10).decoder, couponDates: damlTypes.List(damlTypes.Date).decoder, bondAccount: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Account.decoder, }); }),
  encode: function (__typed__) {
  return {
    issuer: damlTypes.Party.encode(__typed__.issuer),
    operator: damlTypes.Party.encode(__typed__.operator),
    regulators: damlTypes.List(damlTypes.Party).encode(__typed__.regulators),
    issueSize: damlTypes.Int.encode(__typed__.issueSize),
    issueDate: damlTypes.Date.encode(__typed__.issueDate),
    maturityDate: damlTypes.Date.encode(__typed__.maturityDate),
    cashAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id.encode(__typed__.cashAssetId),
    denomination: damlTypes.Numeric(10).encode(__typed__.denomination),
    couponRate: damlTypes.Numeric(10).encode(__typed__.couponRate),
    couponDates: damlTypes.List(damlTypes.Date).encode(__typed__.couponDates),
    bondAccount: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Account.encode(__typed__.bondAccount),
  };
}
,
  Archive: {
    template: function () { return exports.IssuanceRequest; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  IssuanceRequest_Accept: {
    template: function () { return exports.IssuanceRequest; },
    choiceName: 'IssuanceRequest_Accept',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.IssuanceRequest_Accept.decoder; }),
    argumentEncode: function (__typed__) { return exports.IssuanceRequest_Accept.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2(damlTypes.ContractId(DA_RefApps_Bond_FixedRateBond.FixedRateBondFact), damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit)).decoder; }),
    resultEncode: function (__typed__) { return pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2(damlTypes.ContractId(DA_RefApps_Bond_FixedRateBond.FixedRateBondFact), damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit)).encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.IssuanceRequest);



exports.CommissionBotTrigger_InviteAgent = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({bondAssetFungibleCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetFungible).decoder, bondAssetSettlementCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement).decoder, cashAssetSettlementCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement).decoder, fixedRateBondFactCid: damlTypes.ContractId(DA_RefApps_Bond_FixedRateBond.FixedRateBondFact).decoder, }); }),
  encode: function (__typed__) {
  return {
    bondAssetFungibleCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetFungible).encode(__typed__.bondAssetFungibleCid),
    bondAssetSettlementCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement).encode(__typed__.bondAssetSettlementCid),
    cashAssetSettlementCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement).encode(__typed__.cashAssetSettlementCid),
    fixedRateBondFactCid: damlTypes.ContractId(DA_RefApps_Bond_FixedRateBond.FixedRateBondFact).encode(__typed__.fixedRateBondFactCid),
  };
}
,
};



exports.CommissionBotTrigger = {
  templateId: '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Roles.IssuerRole:CommissionBotTrigger',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({issuer: damlTypes.Party.decoder, operator: damlTypes.Party.decoder, regulators: damlTypes.List(damlTypes.Party).decoder, bondAssetDepositCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit).decoder, issuerBondAccount: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Account.decoder, bondAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id.decoder, auctionAgent: damlTypes.Party.decoder, startDate: damlTypes.Date.decoder, endDate: damlTypes.Date.decoder, minPrice: damlTypes.Numeric(10).decoder, size: damlTypes.Int.decoder, cashAccountProvider: damlTypes.Party.decoder, }); }),
  encode: function (__typed__) {
  return {
    issuer: damlTypes.Party.encode(__typed__.issuer),
    operator: damlTypes.Party.encode(__typed__.operator),
    regulators: damlTypes.List(damlTypes.Party).encode(__typed__.regulators),
    bondAssetDepositCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit).encode(__typed__.bondAssetDepositCid),
    issuerBondAccount: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Account.encode(__typed__.issuerBondAccount),
    bondAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id.encode(__typed__.bondAssetId),
    auctionAgent: damlTypes.Party.encode(__typed__.auctionAgent),
    startDate: damlTypes.Date.encode(__typed__.startDate),
    endDate: damlTypes.Date.encode(__typed__.endDate),
    minPrice: damlTypes.Numeric(10).encode(__typed__.minPrice),
    size: damlTypes.Int.encode(__typed__.size),
    cashAccountProvider: damlTypes.Party.encode(__typed__.cashAccountProvider),
  };
}
,
  CommissionBotTrigger_InviteAgent: {
    template: function () { return exports.CommissionBotTrigger; },
    choiceName: 'CommissionBotTrigger_InviteAgent',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.CommissionBotTrigger_InviteAgent.decoder; }),
    argumentEncode: function (__typed__) { return exports.CommissionBotTrigger_InviteAgent.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2(damlTypes.ContractId(DA_RefApps_Bond_Auction.AuctionInvitation), damlTypes.List(damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit))).decoder; }),
    resultEncode: function (__typed__) { return pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2(damlTypes.ContractId(DA_RefApps_Bond_Auction.AuctionInvitation), damlTypes.List(damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit))).encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.CommissionBotTrigger; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.CommissionBotTrigger);



exports.IssuerRole_Redeem = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({fixedRateBondFactCid: damlTypes.ContractId(DA_RefApps_Bond_FixedRateBond.FixedRateBondFact).decoder, }); }),
  encode: function (__typed__) {
  return {
    fixedRateBondFactCid: damlTypes.ContractId(DA_RefApps_Bond_FixedRateBond.FixedRateBondFact).encode(__typed__.fixedRateBondFactCid),
  };
}
,
};



exports.IssuerRole_CommissionAuction = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({bondAssetDepositCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit).decoder, startDate: damlTypes.Date.decoder, endDate: damlTypes.Date.decoder, minPrice: damlTypes.Numeric(10).decoder, size: damlTypes.Int.decoder, }); }),
  encode: function (__typed__) {
  return {
    bondAssetDepositCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit).encode(__typed__.bondAssetDepositCid),
    startDate: damlTypes.Date.encode(__typed__.startDate),
    endDate: damlTypes.Date.encode(__typed__.endDate),
    minPrice: damlTypes.Numeric(10).encode(__typed__.minPrice),
    size: damlTypes.Int.encode(__typed__.size),
  };
}
,
};



exports.IssuerRole_Issuance = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({issueSize: damlTypes.Int.decoder, issueDate: damlTypes.Date.decoder, currency: damlTypes.Text.decoder, denomination: damlTypes.Numeric(10).decoder, maturityDate: damlTypes.Date.decoder, couponRate: damlTypes.Numeric(10).decoder, couponDates: damlTypes.List(damlTypes.Date).decoder, }); }),
  encode: function (__typed__) {
  return {
    issueSize: damlTypes.Int.encode(__typed__.issueSize),
    issueDate: damlTypes.Date.encode(__typed__.issueDate),
    currency: damlTypes.Text.encode(__typed__.currency),
    denomination: damlTypes.Numeric(10).encode(__typed__.denomination),
    maturityDate: damlTypes.Date.encode(__typed__.maturityDate),
    couponRate: damlTypes.Numeric(10).encode(__typed__.couponRate),
    couponDates: damlTypes.List(damlTypes.Date).encode(__typed__.couponDates),
  };
}
,
};



exports.IssuerRole = {
  templateId: '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Roles.IssuerRole:IssuerRole',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({issuer: damlTypes.Party.decoder, bondProvider: damlTypes.Party.decoder, cashProvider: damlTypes.Party.decoder, auctionAgent: damlTypes.Party.decoder, operator: damlTypes.Party.decoder, regulators: damlTypes.List(damlTypes.Party).decoder, }); }),
  encode: function (__typed__) {
  return {
    issuer: damlTypes.Party.encode(__typed__.issuer),
    bondProvider: damlTypes.Party.encode(__typed__.bondProvider),
    cashProvider: damlTypes.Party.encode(__typed__.cashProvider),
    auctionAgent: damlTypes.Party.encode(__typed__.auctionAgent),
    operator: damlTypes.Party.encode(__typed__.operator),
    regulators: damlTypes.List(damlTypes.Party).encode(__typed__.regulators),
  };
}
,
  IssuerRole_Issuance: {
    template: function () { return exports.IssuerRole; },
    choiceName: 'IssuerRole_Issuance',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.IssuerRole_Issuance.decoder; }),
    argumentEncode: function (__typed__) { return exports.IssuerRole_Issuance.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.IssuanceRequest).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.IssuanceRequest).encode(__typed__); },
  },
  IssuerRole_CommissionAuction: {
    template: function () { return exports.IssuerRole; },
    choiceName: 'IssuerRole_CommissionAuction',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.IssuerRole_CommissionAuction.decoder; }),
    argumentEncode: function (__typed__) { return exports.IssuerRole_CommissionAuction.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.CommissionBotTrigger).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.CommissionBotTrigger).encode(__typed__); },
  },
  IssuerRole_Redeem: {
    template: function () { return exports.IssuerRole; },
    choiceName: 'IssuerRole_Redeem',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.IssuerRole_Redeem.decoder; }),
    argumentEncode: function (__typed__) { return exports.IssuerRole_Redeem.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(DA_RefApps_Bond_Redemption.RedemptionRequest).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(DA_RefApps_Bond_Redemption.RedemptionRequest).encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.IssuerRole; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.IssuerRole);



exports.IssuerRoleInvitation_Revoke = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.IssuerRoleInvitation_Reject = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.IssuerRoleInvitation_Accept = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.IssuerRoleInvitation = {
  templateId: '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Roles.IssuerRole:IssuerRoleInvitation',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({issuer: damlTypes.Party.decoder, bondProvider: damlTypes.Party.decoder, cashProvider: damlTypes.Party.decoder, auctionAgent: damlTypes.Party.decoder, operator: damlTypes.Party.decoder, regulators: damlTypes.List(damlTypes.Party).decoder, }); }),
  encode: function (__typed__) {
  return {
    issuer: damlTypes.Party.encode(__typed__.issuer),
    bondProvider: damlTypes.Party.encode(__typed__.bondProvider),
    cashProvider: damlTypes.Party.encode(__typed__.cashProvider),
    auctionAgent: damlTypes.Party.encode(__typed__.auctionAgent),
    operator: damlTypes.Party.encode(__typed__.operator),
    regulators: damlTypes.List(damlTypes.Party).encode(__typed__.regulators),
  };
}
,
  IssuerRoleInvitation_Accept: {
    template: function () { return exports.IssuerRoleInvitation; },
    choiceName: 'IssuerRoleInvitation_Accept',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.IssuerRoleInvitation_Accept.decoder; }),
    argumentEncode: function (__typed__) { return exports.IssuerRoleInvitation_Accept.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.IssuerRole).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.IssuerRole).encode(__typed__); },
  },
  IssuerRoleInvitation_Reject: {
    template: function () { return exports.IssuerRoleInvitation; },
    choiceName: 'IssuerRoleInvitation_Reject',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.IssuerRoleInvitation_Reject.decoder; }),
    argumentEncode: function (__typed__) { return exports.IssuerRoleInvitation_Reject.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  IssuerRoleInvitation_Revoke: {
    template: function () { return exports.IssuerRoleInvitation; },
    choiceName: 'IssuerRoleInvitation_Revoke',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.IssuerRoleInvitation_Revoke.decoder; }),
    argumentEncode: function (__typed__) { return exports.IssuerRoleInvitation_Revoke.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.IssuerRoleInvitation; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.IssuerRoleInvitation);

