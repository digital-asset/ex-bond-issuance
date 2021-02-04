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

var pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc = require('@daml.js/finlib-1.0.0');

var DA_RefApps_Bond_Auction = require('../../../../../DA/RefApps/Bond/Auction/module');
var DA_RefApps_Bond_FixedRateBond = require('../../../../../DA/RefApps/Bond/FixedRateBond/module');
var DA_RefApps_Bond_Lock = require('../../../../../DA/RefApps/Bond/Lock/module');
var DA_RefApps_Bond_Redemption = require('../../../../../DA/RefApps/Bond/Redemption/module');
var DA_RefApps_Bond_Roles_CentralBankRole = require('../../../../../DA/RefApps/Bond/Roles/CentralBankRole/module');
var DA_RefApps_Bond_Roles_CsdRole = require('../../../../../DA/RefApps/Bond/Roles/CsdRole/module');
var DA_RefApps_Bond_Roles_IssuerRole = require('../../../../../DA/RefApps/Bond/Roles/IssuerRole/module');
var DA_RefApps_Bond_Util = require('../../../../../DA/RefApps/Bond/Util/module');


exports.Parties = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({operator: damlTypes.Party.decoder, regulator: damlTypes.Party.decoder, auctionAgent: damlTypes.Party.decoder, bank1: damlTypes.Party.decoder, bank2: damlTypes.Party.decoder, bank3: damlTypes.Party.decoder, bank4: damlTypes.Party.decoder, csd: damlTypes.Party.decoder, issuer: damlTypes.Party.decoder, centralBank: damlTypes.Party.decoder, }); }),
  encode: function (__typed__) {
  return {
    operator: damlTypes.Party.encode(__typed__.operator),
    regulator: damlTypes.Party.encode(__typed__.regulator),
    auctionAgent: damlTypes.Party.encode(__typed__.auctionAgent),
    bank1: damlTypes.Party.encode(__typed__.bank1),
    bank2: damlTypes.Party.encode(__typed__.bank2),
    bank3: damlTypes.Party.encode(__typed__.bank3),
    bank4: damlTypes.Party.encode(__typed__.bank4),
    csd: damlTypes.Party.encode(__typed__.csd),
    issuer: damlTypes.Party.encode(__typed__.issuer),
    centralBank: damlTypes.Party.encode(__typed__.centralBank),
  };
}
,
};



exports.Rules = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({issuerCashSettlementCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement).decoder, bank1BondSettlementCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement).decoder, bank2BondSettlementCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement).decoder, bank3BondSettlementCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement).decoder, bank1CashSettlementCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement).decoder, bank2CashSettlementCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement).decoder, bank3CashSettlementCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement).decoder, issuerCashFungibleCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetFungible).decoder, bank1CashFungibleCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetFungible).decoder, bank2CashFungibleCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetFungible).decoder, bank3CashFungibleCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetFungible).decoder, bank1LockRuleCid: damlTypes.ContractId(DA_RefApps_Bond_Lock.AssetLockRule).decoder, bank2LockRuleCid: damlTypes.ContractId(DA_RefApps_Bond_Lock.AssetLockRule).decoder, bank3LockRuleCid: damlTypes.ContractId(DA_RefApps_Bond_Lock.AssetLockRule).decoder, }); }),
  encode: function (__typed__) {
  return {
    issuerCashSettlementCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement).encode(__typed__.issuerCashSettlementCid),
    bank1BondSettlementCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement).encode(__typed__.bank1BondSettlementCid),
    bank2BondSettlementCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement).encode(__typed__.bank2BondSettlementCid),
    bank3BondSettlementCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement).encode(__typed__.bank3BondSettlementCid),
    bank1CashSettlementCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement).encode(__typed__.bank1CashSettlementCid),
    bank2CashSettlementCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement).encode(__typed__.bank2CashSettlementCid),
    bank3CashSettlementCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement).encode(__typed__.bank3CashSettlementCid),
    issuerCashFungibleCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetFungible).encode(__typed__.issuerCashFungibleCid),
    bank1CashFungibleCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetFungible).encode(__typed__.bank1CashFungibleCid),
    bank2CashFungibleCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetFungible).encode(__typed__.bank2CashFungibleCid),
    bank3CashFungibleCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetFungible).encode(__typed__.bank3CashFungibleCid),
    bank1LockRuleCid: damlTypes.ContractId(DA_RefApps_Bond_Lock.AssetLockRule).encode(__typed__.bank1LockRuleCid),
    bank2LockRuleCid: damlTypes.ContractId(DA_RefApps_Bond_Lock.AssetLockRule).encode(__typed__.bank2LockRuleCid),
    bank3LockRuleCid: damlTypes.ContractId(DA_RefApps_Bond_Lock.AssetLockRule).encode(__typed__.bank3LockRuleCid),
  };
}
,
};



exports.AssetsForRedemption = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({bank1BondDepositCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit).decoder, bank2BondDepositCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit).decoder, bank3BondDepositCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit).decoder, bank1RedemptionPayoutInfoCid: damlTypes.ContractId(DA_RefApps_Bond_Redemption.RedemptionPayoutInfo).decoder, bank2RedemptionPayoutInfoCid: damlTypes.ContractId(DA_RefApps_Bond_Redemption.RedemptionPayoutInfo).decoder, bank3RedemptionPayoutInfoCid: damlTypes.ContractId(DA_RefApps_Bond_Redemption.RedemptionPayoutInfo).decoder, }); }),
  encode: function (__typed__) {
  return {
    bank1BondDepositCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit).encode(__typed__.bank1BondDepositCid),
    bank2BondDepositCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit).encode(__typed__.bank2BondDepositCid),
    bank3BondDepositCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit).encode(__typed__.bank3BondDepositCid),
    bank1RedemptionPayoutInfoCid: damlTypes.ContractId(DA_RefApps_Bond_Redemption.RedemptionPayoutInfo).encode(__typed__.bank1RedemptionPayoutInfoCid),
    bank2RedemptionPayoutInfoCid: damlTypes.ContractId(DA_RefApps_Bond_Redemption.RedemptionPayoutInfo).encode(__typed__.bank2RedemptionPayoutInfoCid),
    bank3RedemptionPayoutInfoCid: damlTypes.ContractId(DA_RefApps_Bond_Redemption.RedemptionPayoutInfo).encode(__typed__.bank3RedemptionPayoutInfoCid),
  };
}
,
};



exports.SettleRequests = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({bank1SettleReqCid: damlTypes.ContractId(DA_RefApps_Bond_Auction.AuctionParticipantSettleRequest).decoder, bank2SettleReqCid: damlTypes.ContractId(DA_RefApps_Bond_Auction.AuctionParticipantSettleRequest).decoder, bank3SettleReqCid: damlTypes.ContractId(DA_RefApps_Bond_Auction.AuctionParticipantSettleRequest).decoder, otherSettleReqCid: damlTypes.ContractId(DA_RefApps_Bond_Auction.AuctionParticipantSettleRequest).decoder, }); }),
  encode: function (__typed__) {
  return {
    bank1SettleReqCid: damlTypes.ContractId(DA_RefApps_Bond_Auction.AuctionParticipantSettleRequest).encode(__typed__.bank1SettleReqCid),
    bank2SettleReqCid: damlTypes.ContractId(DA_RefApps_Bond_Auction.AuctionParticipantSettleRequest).encode(__typed__.bank2SettleReqCid),
    bank3SettleReqCid: damlTypes.ContractId(DA_RefApps_Bond_Auction.AuctionParticipantSettleRequest).encode(__typed__.bank3SettleReqCid),
    otherSettleReqCid: damlTypes.ContractId(DA_RefApps_Bond_Auction.AuctionParticipantSettleRequest).encode(__typed__.otherSettleReqCid),
  };
}
,
};



exports.AuctionProgress = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({auction: damlTypes.ContractId(DA_RefApps_Bond_Auction.Auction).decoder, bidderParticipationCid1: damlTypes.ContractId(DA_RefApps_Bond_Auction.BidderParticipation).decoder, bidderParticipationCid2: damlTypes.ContractId(DA_RefApps_Bond_Auction.BidderParticipation).decoder, bidderParticipationCid3: damlTypes.ContractId(DA_RefApps_Bond_Auction.BidderParticipation).decoder, bidCid1_1: damlTypes.ContractId(DA_RefApps_Bond_Auction.AuctionBid).decoder, bidCid2_1: damlTypes.ContractId(DA_RefApps_Bond_Auction.AuctionBid).decoder, bidCid2_2: damlTypes.ContractId(DA_RefApps_Bond_Auction.AuctionBid).decoder, bidCid3_1: damlTypes.ContractId(DA_RefApps_Bond_Auction.AuctionBid).decoder, otherAuction: damlTypes.ContractId(DA_RefApps_Bond_Auction.Auction).decoder, otherBidderParticipationCid1: damlTypes.ContractId(DA_RefApps_Bond_Auction.BidderParticipation).decoder, otherBidderParticipationCid2: damlTypes.ContractId(DA_RefApps_Bond_Auction.BidderParticipation).decoder, otherBidderParticipationCid3: damlTypes.ContractId(DA_RefApps_Bond_Auction.BidderParticipation).decoder, otherBidCid1_1: damlTypes.ContractId(DA_RefApps_Bond_Auction.AuctionBid).decoder, bank1Locks: damlTypes.List(damlTypes.ContractId(DA_RefApps_Bond_Lock.AuctionLockedCash)).decoder, bank2Locks: damlTypes.List(damlTypes.ContractId(DA_RefApps_Bond_Lock.AuctionLockedCash)).decoder, bank3Locks: damlTypes.List(damlTypes.ContractId(DA_RefApps_Bond_Lock.AuctionLockedCash)).decoder, bank1OtherLocks: damlTypes.List(damlTypes.ContractId(DA_RefApps_Bond_Lock.AuctionLockedCash)).decoder, }); }),
  encode: function (__typed__) {
  return {
    auction: damlTypes.ContractId(DA_RefApps_Bond_Auction.Auction).encode(__typed__.auction),
    bidderParticipationCid1: damlTypes.ContractId(DA_RefApps_Bond_Auction.BidderParticipation).encode(__typed__.bidderParticipationCid1),
    bidderParticipationCid2: damlTypes.ContractId(DA_RefApps_Bond_Auction.BidderParticipation).encode(__typed__.bidderParticipationCid2),
    bidderParticipationCid3: damlTypes.ContractId(DA_RefApps_Bond_Auction.BidderParticipation).encode(__typed__.bidderParticipationCid3),
    bidCid1_1: damlTypes.ContractId(DA_RefApps_Bond_Auction.AuctionBid).encode(__typed__.bidCid1_1),
    bidCid2_1: damlTypes.ContractId(DA_RefApps_Bond_Auction.AuctionBid).encode(__typed__.bidCid2_1),
    bidCid2_2: damlTypes.ContractId(DA_RefApps_Bond_Auction.AuctionBid).encode(__typed__.bidCid2_2),
    bidCid3_1: damlTypes.ContractId(DA_RefApps_Bond_Auction.AuctionBid).encode(__typed__.bidCid3_1),
    otherAuction: damlTypes.ContractId(DA_RefApps_Bond_Auction.Auction).encode(__typed__.otherAuction),
    otherBidderParticipationCid1: damlTypes.ContractId(DA_RefApps_Bond_Auction.BidderParticipation).encode(__typed__.otherBidderParticipationCid1),
    otherBidderParticipationCid2: damlTypes.ContractId(DA_RefApps_Bond_Auction.BidderParticipation).encode(__typed__.otherBidderParticipationCid2),
    otherBidderParticipationCid3: damlTypes.ContractId(DA_RefApps_Bond_Auction.BidderParticipation).encode(__typed__.otherBidderParticipationCid3),
    otherBidCid1_1: damlTypes.ContractId(DA_RefApps_Bond_Auction.AuctionBid).encode(__typed__.otherBidCid1_1),
    bank1Locks: damlTypes.List(damlTypes.ContractId(DA_RefApps_Bond_Lock.AuctionLockedCash)).encode(__typed__.bank1Locks),
    bank2Locks: damlTypes.List(damlTypes.ContractId(DA_RefApps_Bond_Lock.AuctionLockedCash)).encode(__typed__.bank2Locks),
    bank3Locks: damlTypes.List(damlTypes.ContractId(DA_RefApps_Bond_Lock.AuctionLockedCash)).encode(__typed__.bank3Locks),
    bank1OtherLocks: damlTypes.List(damlTypes.ContractId(DA_RefApps_Bond_Lock.AuctionLockedCash)).encode(__typed__.bank1OtherLocks),
  };
}
,
};



exports.CashAssets = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({issuerCashDepositCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit).decoder, bank1CashDepositCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit).decoder, bank2CashDepositCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit).decoder, bank3CashDepositCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit).decoder, }); }),
  encode: function (__typed__) {
  return {
    issuerCashDepositCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit).encode(__typed__.issuerCashDepositCid),
    bank1CashDepositCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit).encode(__typed__.bank1CashDepositCid),
    bank2CashDepositCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit).encode(__typed__.bank2CashDepositCid),
    bank3CashDepositCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit).encode(__typed__.bank3CashDepositCid),
  };
}
,
};



exports.Accounts = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({issuerAccount: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Account.decoder, bank1Account: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Account.decoder, bank2Account: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Account.decoder, bank3Account: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Account.decoder, }); }),
  encode: function (__typed__) {
  return {
    issuerAccount: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Account.encode(__typed__.issuerAccount),
    bank1Account: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Account.encode(__typed__.bank1Account),
    bank2Account: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Account.encode(__typed__.bank2Account),
    bank3Account: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Account.encode(__typed__.bank3Account),
  };
}
,
};



exports.TestIssuance = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({roles: exports.TestRoles.decoder, fixedRateBondFactCid: damlTypes.ContractId(DA_RefApps_Bond_FixedRateBond.FixedRateBondFact).decoder, bondBundleData: DA_RefApps_Bond_Util.BondBundleData.decoder, cashAccounts: exports.Accounts.decoder, bondAccounts: exports.Accounts.decoder, cashAssets: exports.CashAssets.decoder, rules: exports.Rules.decoder, cashAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id.decoder, }); }),
  encode: function (__typed__) {
  return {
    roles: exports.TestRoles.encode(__typed__.roles),
    fixedRateBondFactCid: damlTypes.ContractId(DA_RefApps_Bond_FixedRateBond.FixedRateBondFact).encode(__typed__.fixedRateBondFactCid),
    bondBundleData: DA_RefApps_Bond_Util.BondBundleData.encode(__typed__.bondBundleData),
    cashAccounts: exports.Accounts.encode(__typed__.cashAccounts),
    bondAccounts: exports.Accounts.encode(__typed__.bondAccounts),
    cashAssets: exports.CashAssets.encode(__typed__.cashAssets),
    rules: exports.Rules.encode(__typed__.rules),
    cashAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id.encode(__typed__.cashAssetId),
  };
}
,
};



exports.TestRoles = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({issuerRoleCid: damlTypes.ContractId(DA_RefApps_Bond_Roles_IssuerRole.IssuerRole).decoder, csdRoleCid: damlTypes.ContractId(DA_RefApps_Bond_Roles_CsdRole.CsdRole).decoder, centralBankRoleCid: damlTypes.ContractId(DA_RefApps_Bond_Roles_CentralBankRole.CentralBankRole).decoder, }); }),
  encode: function (__typed__) {
  return {
    issuerRoleCid: damlTypes.ContractId(DA_RefApps_Bond_Roles_IssuerRole.IssuerRole).encode(__typed__.issuerRoleCid),
    csdRoleCid: damlTypes.ContractId(DA_RefApps_Bond_Roles_CsdRole.CsdRole).encode(__typed__.csdRoleCid),
    centralBankRoleCid: damlTypes.ContractId(DA_RefApps_Bond_Roles_CentralBankRole.CentralBankRole).encode(__typed__.centralBankRoleCid),
  };
}
,
};

