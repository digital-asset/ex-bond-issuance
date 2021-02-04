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

var DA_RefApps_Bond_FixedRateBond = require('../../../../DA/RefApps/Bond/FixedRateBond/module');
var DA_RefApps_Bond_Lock = require('../../../../DA/RefApps/Bond/Lock/module');
var DA_RefApps_Bond_Settlement = require('../../../../DA/RefApps/Bond/Settlement/module');
var DA_RefApps_Bond_Util = require('../../../../DA/RefApps/Bond/Util/module');


exports.AuctionParticipantSettleRequest_Settle = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.AuctionParticipantSettleRequest = {
  templateId: '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Auction:AuctionParticipantSettleRequest',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({investor: damlTypes.Party.decoder, issuer: damlTypes.Party.decoder, auctionAgent: damlTypes.Party.decoder, auctionName: damlTypes.Text.decoder, settleRequestCids: damlTypes.List(damlTypes.ContractId(DA_RefApps_Bond_Settlement.AuctionSettleRequest)).decoder, invalidBidNotificationCids: damlTypes.List(damlTypes.ContractId(exports.InvalidBidNotification)).decoder, cashProvider: damlTypes.Party.decoder, regulators: damlTypes.List(damlTypes.Party).decoder, }); }),
  encode: function (__typed__) {
  return {
    investor: damlTypes.Party.encode(__typed__.investor),
    issuer: damlTypes.Party.encode(__typed__.issuer),
    auctionAgent: damlTypes.Party.encode(__typed__.auctionAgent),
    auctionName: damlTypes.Text.encode(__typed__.auctionName),
    settleRequestCids: damlTypes.List(damlTypes.ContractId(DA_RefApps_Bond_Settlement.AuctionSettleRequest)).encode(__typed__.settleRequestCids),
    invalidBidNotificationCids: damlTypes.List(damlTypes.ContractId(exports.InvalidBidNotification)).encode(__typed__.invalidBidNotificationCids),
    cashProvider: damlTypes.Party.encode(__typed__.cashProvider),
    regulators: damlTypes.List(damlTypes.Party).encode(__typed__.regulators),
  };
}
,
  Archive: {
    template: function () { return exports.AuctionParticipantSettleRequest; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  AuctionParticipantSettleRequest_Settle: {
    template: function () { return exports.AuctionParticipantSettleRequest; },
    choiceName: 'AuctionParticipantSettleRequest_Settle',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.AuctionParticipantSettleRequest_Settle.decoder; }),
    argumentEncode: function (__typed__) { return exports.AuctionParticipantSettleRequest_Settle.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(DA_RefApps_Bond_Settlement.InvestorSettlement).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(DA_RefApps_Bond_Settlement.InvestorSettlement).encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.AuctionParticipantSettleRequest);



exports.InvalidBidNotification = {
  templateId: '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Auction:InvalidBidNotification',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({bid: exports.AuctionBid.decoder, reason: damlTypes.Text.decoder, regulators: damlTypes.List(damlTypes.Party).decoder, }); }),
  encode: function (__typed__) {
  return {
    bid: exports.AuctionBid.encode(__typed__.bid),
    reason: damlTypes.Text.encode(__typed__.reason),
    regulators: damlTypes.List(damlTypes.Party).encode(__typed__.regulators),
  };
}
,
  Archive: {
    template: function () { return exports.InvalidBidNotification; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.InvalidBidNotification);



exports.AuctionInvitation_Accept = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({auctionName: damlTypes.Text.decoder, }); }),
  encode: function (__typed__) {
  return {
    auctionName: damlTypes.Text.encode(__typed__.auctionName),
  };
}
,
};



exports.AuctionInvitation = {
  templateId: '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Auction:AuctionInvitation',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({auction: exports.Auction.decoder, }); }),
  encode: function (__typed__) {
  return {
    auction: exports.Auction.encode(__typed__.auction),
  };
}
,
  AuctionInvitation_Accept: {
    template: function () { return exports.AuctionInvitation; },
    choiceName: 'AuctionInvitation_Accept',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.AuctionInvitation_Accept.decoder; }),
    argumentEncode: function (__typed__) { return exports.AuctionInvitation_Accept.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.Auction).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.Auction).encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.AuctionInvitation; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.AuctionInvitation);



exports.AuctionBid_DiscardInvalid = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({reason: damlTypes.Text.decoder, }); }),
  encode: function (__typed__) {
  return {
    reason: damlTypes.Text.encode(__typed__.reason),
  };
}
,
};



exports.AuctionBid = {
  templateId: '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Auction:AuctionBid',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({bidder: damlTypes.Party.decoder, auctionAgent: damlTypes.Party.decoder, issuer: damlTypes.Party.decoder, bidData: exports.BidData.decoder, auctionName: damlTypes.Text.decoder, bondAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id.decoder, investorBondAssetSettlementCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement).decoder, regulators: damlTypes.List(damlTypes.Party).decoder, }); }),
  encode: function (__typed__) {
  return {
    bidder: damlTypes.Party.encode(__typed__.bidder),
    auctionAgent: damlTypes.Party.encode(__typed__.auctionAgent),
    issuer: damlTypes.Party.encode(__typed__.issuer),
    bidData: exports.BidData.encode(__typed__.bidData),
    auctionName: damlTypes.Text.encode(__typed__.auctionName),
    bondAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id.encode(__typed__.bondAssetId),
    investorBondAssetSettlementCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement).encode(__typed__.investorBondAssetSettlementCid),
    regulators: damlTypes.List(damlTypes.Party).encode(__typed__.regulators),
  };
}
,
  Archive: {
    template: function () { return exports.AuctionBid; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  AuctionBid_DiscardInvalid: {
    template: function () { return exports.AuctionBid; },
    choiceName: 'AuctionBid_DiscardInvalid',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.AuctionBid_DiscardInvalid.decoder; }),
    argumentEncode: function (__typed__) { return exports.AuctionBid_DiscardInvalid.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.InvalidBidNotification).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.InvalidBidNotification).encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.AuctionBid);



exports.PlaceBidBotTrigger_Revoke = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.PlaceBidBotTrigger_LockCash = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({cashDepositCids: damlTypes.List(damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit)).decoder, cashAssetFungibleCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetFungible).decoder, lockRuleCid: damlTypes.ContractId(DA_RefApps_Bond_Lock.AssetLockRule).decoder, investorBondAssetSettlementCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement).decoder, }); }),
  encode: function (__typed__) {
  return {
    cashDepositCids: damlTypes.List(damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit)).encode(__typed__.cashDepositCids),
    cashAssetFungibleCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetFungible).encode(__typed__.cashAssetFungibleCid),
    lockRuleCid: damlTypes.ContractId(DA_RefApps_Bond_Lock.AssetLockRule).encode(__typed__.lockRuleCid),
    investorBondAssetSettlementCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement).encode(__typed__.investorBondAssetSettlementCid),
  };
}
,
};



exports.PlaceBidBotTrigger = {
  templateId: '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Auction:PlaceBidBotTrigger',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({cashAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id.decoder, cashProvider: damlTypes.Party.decoder, bondProvider: damlTypes.Party.decoder, bidder: damlTypes.Party.decoder, auctionAgent: damlTypes.Party.decoder, issuer: damlTypes.Party.decoder, bidData: exports.BidData.decoder, auctionName: damlTypes.Text.decoder, bondAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id.decoder, regulators: damlTypes.List(damlTypes.Party).decoder, }); }),
  encode: function (__typed__) {
  return {
    cashAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id.encode(__typed__.cashAssetId),
    cashProvider: damlTypes.Party.encode(__typed__.cashProvider),
    bondProvider: damlTypes.Party.encode(__typed__.bondProvider),
    bidder: damlTypes.Party.encode(__typed__.bidder),
    auctionAgent: damlTypes.Party.encode(__typed__.auctionAgent),
    issuer: damlTypes.Party.encode(__typed__.issuer),
    bidData: exports.BidData.encode(__typed__.bidData),
    auctionName: damlTypes.Text.encode(__typed__.auctionName),
    bondAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id.encode(__typed__.bondAssetId),
    regulators: damlTypes.List(damlTypes.Party).encode(__typed__.regulators),
  };
}
,
  PlaceBidBotTrigger_LockCash: {
    template: function () { return exports.PlaceBidBotTrigger; },
    choiceName: 'PlaceBidBotTrigger_LockCash',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.PlaceBidBotTrigger_LockCash.decoder; }),
    argumentEncode: function (__typed__) { return exports.PlaceBidBotTrigger_LockCash.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Either(damlTypes.ContractId(exports.InvalidBidNotification), pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple3(damlTypes.ContractId(DA_RefApps_Bond_Lock.AuctionLockedCash), damlTypes.ContractId(exports.AuctionBid), damlTypes.List(damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit)))).decoder; }),
    resultEncode: function (__typed__) { return pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Either(damlTypes.ContractId(exports.InvalidBidNotification), pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple3(damlTypes.ContractId(DA_RefApps_Bond_Lock.AuctionLockedCash), damlTypes.ContractId(exports.AuctionBid), damlTypes.List(damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit)))).encode(__typed__); },
  },
  PlaceBidBotTrigger_Revoke: {
    template: function () { return exports.PlaceBidBotTrigger; },
    choiceName: 'PlaceBidBotTrigger_Revoke',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.PlaceBidBotTrigger_Revoke.decoder; }),
    argumentEncode: function (__typed__) { return exports.PlaceBidBotTrigger_Revoke.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.PlaceBidBotTrigger; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.PlaceBidBotTrigger);



exports.AuctionBidderParticipation_Archive = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.AuctionBidderParticipantion_RevokeLockedBid = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({auctionBidCid: damlTypes.ContractId(exports.AuctionBid).decoder, auctionLockedCashCid: damlTypes.ContractId(DA_RefApps_Bond_Lock.AuctionLockedCash).decoder, }); }),
  encode: function (__typed__) {
  return {
    auctionBidCid: damlTypes.ContractId(exports.AuctionBid).encode(__typed__.auctionBidCid),
    auctionLockedCashCid: damlTypes.ContractId(DA_RefApps_Bond_Lock.AuctionLockedCash).encode(__typed__.auctionLockedCashCid),
  };
}
,
};



exports.BidderParticipation_PlaceBid = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({price: damlTypes.Numeric(10).decoder, quantity: damlTypes.Int.decoder, }); }),
  encode: function (__typed__) {
  return {
    price: damlTypes.Numeric(10).encode(__typed__.price),
    quantity: damlTypes.Int.encode(__typed__.quantity),
  };
}
,
};



exports.BidderParticipation = {
  templateId: '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Auction:BidderParticipation',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({bidder: damlTypes.Party.decoder, auctionAgent: damlTypes.Party.decoder, issuer: damlTypes.Party.decoder, operator: damlTypes.Party.decoder, regulators: damlTypes.List(damlTypes.Party).decoder, startDate: damlTypes.Date.decoder, endDate: damlTypes.Date.decoder, size: damlTypes.Int.decoder, fixedRateBondFact: DA_RefApps_Bond_FixedRateBond.FixedRateBondFact.decoder, cashAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id.decoder, issuerCashAccountProvider: damlTypes.Party.decoder, auctionName: damlTypes.Text.decoder, }); }),
  encode: function (__typed__) {
  return {
    bidder: damlTypes.Party.encode(__typed__.bidder),
    auctionAgent: damlTypes.Party.encode(__typed__.auctionAgent),
    issuer: damlTypes.Party.encode(__typed__.issuer),
    operator: damlTypes.Party.encode(__typed__.operator),
    regulators: damlTypes.List(damlTypes.Party).encode(__typed__.regulators),
    startDate: damlTypes.Date.encode(__typed__.startDate),
    endDate: damlTypes.Date.encode(__typed__.endDate),
    size: damlTypes.Int.encode(__typed__.size),
    fixedRateBondFact: DA_RefApps_Bond_FixedRateBond.FixedRateBondFact.encode(__typed__.fixedRateBondFact),
    cashAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id.encode(__typed__.cashAssetId),
    issuerCashAccountProvider: damlTypes.Party.encode(__typed__.issuerCashAccountProvider),
    auctionName: damlTypes.Text.encode(__typed__.auctionName),
  };
}
,
  BidderParticipation_PlaceBid: {
    template: function () { return exports.BidderParticipation; },
    choiceName: 'BidderParticipation_PlaceBid',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.BidderParticipation_PlaceBid.decoder; }),
    argumentEncode: function (__typed__) { return exports.BidderParticipation_PlaceBid.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.PlaceBidBotTrigger).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.PlaceBidBotTrigger).encode(__typed__); },
  },
  AuctionBidderParticipantion_RevokeLockedBid: {
    template: function () { return exports.BidderParticipation; },
    choiceName: 'AuctionBidderParticipantion_RevokeLockedBid',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.AuctionBidderParticipantion_RevokeLockedBid.decoder; }),
    argumentEncode: function (__typed__) { return exports.AuctionBidderParticipantion_RevokeLockedBid.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit).encode(__typed__); },
  },
  AuctionBidderParticipation_Archive: {
    template: function () { return exports.BidderParticipation; },
    choiceName: 'AuctionBidderParticipation_Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.AuctionBidderParticipation_Archive.decoder; }),
    argumentEncode: function (__typed__) { return exports.AuctionBidderParticipation_Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.BidderParticipation; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.BidderParticipation);



exports.AuctionFinalizeBotTrigger_AllocateBond = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({participationCids: damlTypes.List(damlTypes.ContractId(exports.BidderParticipation)).decoder, bidCids: damlTypes.List(damlTypes.ContractId(exports.AuctionBid)).decoder, }); }),
  encode: function (__typed__) {
  return {
    participationCids: damlTypes.List(damlTypes.ContractId(exports.BidderParticipation)).encode(__typed__.participationCids),
    bidCids: damlTypes.List(damlTypes.ContractId(exports.AuctionBid)).encode(__typed__.bidCids),
  };
}
,
};



exports.AuctionFinalizeBotTrigger = {
  templateId: '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Auction:AuctionFinalizeBotTrigger',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({auctionAgent: damlTypes.Party.decoder, issuer: damlTypes.Party.decoder, regulators: damlTypes.List(damlTypes.Party).decoder, minPrice: damlTypes.Numeric(10).decoder, size: damlTypes.Int.decoder, issuerCashAccountProvider: damlTypes.Party.decoder, bondBundleData: DA_RefApps_Bond_Util.BondBundleData.decoder, cashAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id.decoder, invitedBidders: damlTypes.List(damlTypes.Party).decoder, auctionName: damlTypes.Text.decoder, }); }),
  encode: function (__typed__) {
  return {
    auctionAgent: damlTypes.Party.encode(__typed__.auctionAgent),
    issuer: damlTypes.Party.encode(__typed__.issuer),
    regulators: damlTypes.List(damlTypes.Party).encode(__typed__.regulators),
    minPrice: damlTypes.Numeric(10).encode(__typed__.minPrice),
    size: damlTypes.Int.encode(__typed__.size),
    issuerCashAccountProvider: damlTypes.Party.encode(__typed__.issuerCashAccountProvider),
    bondBundleData: DA_RefApps_Bond_Util.BondBundleData.encode(__typed__.bondBundleData),
    cashAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id.encode(__typed__.cashAssetId),
    invitedBidders: damlTypes.List(damlTypes.Party).encode(__typed__.invitedBidders),
    auctionName: damlTypes.Text.encode(__typed__.auctionName),
  };
}
,
  AuctionFinalizeBotTrigger_AllocateBond: {
    template: function () { return exports.AuctionFinalizeBotTrigger; },
    choiceName: 'AuctionFinalizeBotTrigger_AllocateBond',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.AuctionFinalizeBotTrigger_AllocateBond.decoder; }),
    argumentEncode: function (__typed__) { return exports.AuctionFinalizeBotTrigger_AllocateBond.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2(damlTypes.List(damlTypes.ContractId(exports.AuctionParticipantSettleRequest)), damlTypes.Optional(damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit))).decoder; }),
    resultEncode: function (__typed__) { return pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2(damlTypes.List(damlTypes.ContractId(exports.AuctionParticipantSettleRequest)), damlTypes.Optional(damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit))).encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.AuctionFinalizeBotTrigger; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.AuctionFinalizeBotTrigger);



exports.Auction_Finalize = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.Auction_InviteBidders = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({bidders: damlTypes.List(damlTypes.Party).decoder, }); }),
  encode: function (__typed__) {
  return {
    bidders: damlTypes.List(damlTypes.Party).encode(__typed__.bidders),
  };
}
,
};



exports.Auction = {
  templateId: '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Auction:Auction',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({auctionAgent: damlTypes.Party.decoder, issuer: damlTypes.Party.decoder, operator: damlTypes.Party.decoder, regulators: damlTypes.List(damlTypes.Party).decoder, startDate: damlTypes.Date.decoder, endDate: damlTypes.Date.decoder, minPrice: damlTypes.Numeric(10).decoder, size: damlTypes.Int.decoder, fixedRateBondFact: DA_RefApps_Bond_FixedRateBond.FixedRateBondFact.decoder, cashAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id.decoder, issuerCashAccountProvider: damlTypes.Party.decoder, bondBundleData: DA_RefApps_Bond_Util.BondBundleData.decoder, invitedBidders: damlTypes.List(damlTypes.Party).decoder, auctionName: damlTypes.Text.decoder, }); }),
  encode: function (__typed__) {
  return {
    auctionAgent: damlTypes.Party.encode(__typed__.auctionAgent),
    issuer: damlTypes.Party.encode(__typed__.issuer),
    operator: damlTypes.Party.encode(__typed__.operator),
    regulators: damlTypes.List(damlTypes.Party).encode(__typed__.regulators),
    startDate: damlTypes.Date.encode(__typed__.startDate),
    endDate: damlTypes.Date.encode(__typed__.endDate),
    minPrice: damlTypes.Numeric(10).encode(__typed__.minPrice),
    size: damlTypes.Int.encode(__typed__.size),
    fixedRateBondFact: DA_RefApps_Bond_FixedRateBond.FixedRateBondFact.encode(__typed__.fixedRateBondFact),
    cashAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id.encode(__typed__.cashAssetId),
    issuerCashAccountProvider: damlTypes.Party.encode(__typed__.issuerCashAccountProvider),
    bondBundleData: DA_RefApps_Bond_Util.BondBundleData.encode(__typed__.bondBundleData),
    invitedBidders: damlTypes.List(damlTypes.Party).encode(__typed__.invitedBidders),
    auctionName: damlTypes.Text.encode(__typed__.auctionName),
  };
}
,
  Auction_InviteBidders: {
    template: function () { return exports.Auction; },
    choiceName: 'Auction_InviteBidders',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.Auction_InviteBidders.decoder; }),
    argumentEncode: function (__typed__) { return exports.Auction_InviteBidders.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2(damlTypes.ContractId(exports.Auction), damlTypes.List(damlTypes.ContractId(exports.BidderParticipation))).decoder; }),
    resultEncode: function (__typed__) { return pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2(damlTypes.ContractId(exports.Auction), damlTypes.List(damlTypes.ContractId(exports.BidderParticipation))).encode(__typed__); },
  },
  Auction_Finalize: {
    template: function () { return exports.Auction; },
    choiceName: 'Auction_Finalize',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.Auction_Finalize.decoder; }),
    argumentEncode: function (__typed__) { return exports.Auction_Finalize.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.AuctionFinalizeBotTrigger).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.AuctionFinalizeBotTrigger).encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.Auction; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.Auction);



exports.BidWithAssetData = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({bidData: exports.BidData.decoder, auctionBidCid: damlTypes.ContractId(exports.AuctionBid).decoder, bondAssetDepositCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit).decoder, }); }),
  encode: function (__typed__) {
  return {
    bidData: exports.BidData.encode(__typed__.bidData),
    auctionBidCid: damlTypes.ContractId(exports.AuctionBid).encode(__typed__.auctionBidCid),
    bondAssetDepositCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit).encode(__typed__.bondAssetDepositCid),
  };
}
,
};



exports.ResultData = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({price: damlTypes.Numeric(10).decoder, allocatedQuantity: damlTypes.Int.decoder, awardedBids: damlTypes.List(exports.SortableBidData).decoder, invalidBids: damlTypes.List(exports.SortableBidData).decoder, }); }),
  encode: function (__typed__) {
  return {
    price: damlTypes.Numeric(10).encode(__typed__.price),
    allocatedQuantity: damlTypes.Int.encode(__typed__.allocatedQuantity),
    awardedBids: damlTypes.List(exports.SortableBidData).encode(__typed__.awardedBids),
    invalidBids: damlTypes.List(exports.SortableBidData).encode(__typed__.invalidBids),
  };
}
,
};



exports.SortableBidData = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({bidData: exports.BidData.decoder, auctionBidCid: damlTypes.ContractId(exports.AuctionBid).decoder, }); }),
  encode: function (__typed__) {
  return {
    bidData: exports.BidData.encode(__typed__.bidData),
    auctionBidCid: damlTypes.ContractId(exports.AuctionBid).encode(__typed__.auctionBidCid),
  };
}
,
};



exports.BidData = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({price: damlTypes.Numeric(10).decoder, quantity: damlTypes.Int.decoder, submissionTime: damlTypes.Time.decoder, }); }),
  encode: function (__typed__) {
  return {
    price: damlTypes.Numeric(10).encode(__typed__.price),
    quantity: damlTypes.Int.encode(__typed__.quantity),
    submissionTime: damlTypes.Time.encode(__typed__.submissionTime),
  };
}
,
};



exports.AuctionData = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({auctionSize: damlTypes.Int.decoder, limitPrice: damlTypes.Numeric(10).decoder, }); }),
  encode: function (__typed__) {
  return {
    auctionSize: damlTypes.Int.encode(__typed__.auctionSize),
    limitPrice: damlTypes.Numeric(10).encode(__typed__.limitPrice),
  };
}
,
};

