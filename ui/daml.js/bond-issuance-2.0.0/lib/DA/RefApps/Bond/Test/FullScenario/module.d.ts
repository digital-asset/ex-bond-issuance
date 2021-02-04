// Generated from DA/RefApps/Bond/Test/FullScenario.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

import * as pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc from '@daml.js/finlib-1.0.0';

import * as DA_RefApps_Bond_Auction from '../../../../../DA/RefApps/Bond/Auction/module';
import * as DA_RefApps_Bond_FixedRateBond from '../../../../../DA/RefApps/Bond/FixedRateBond/module';
import * as DA_RefApps_Bond_Lock from '../../../../../DA/RefApps/Bond/Lock/module';
import * as DA_RefApps_Bond_Redemption from '../../../../../DA/RefApps/Bond/Redemption/module';
import * as DA_RefApps_Bond_Roles_CentralBankRole from '../../../../../DA/RefApps/Bond/Roles/CentralBankRole/module';
import * as DA_RefApps_Bond_Roles_CsdRole from '../../../../../DA/RefApps/Bond/Roles/CsdRole/module';
import * as DA_RefApps_Bond_Roles_IssuerRole from '../../../../../DA/RefApps/Bond/Roles/IssuerRole/module';
import * as DA_RefApps_Bond_Util from '../../../../../DA/RefApps/Bond/Util/module';

export declare type Parties = {
  operator: damlTypes.Party;
  regulator: damlTypes.Party;
  auctionAgent: damlTypes.Party;
  bank1: damlTypes.Party;
  bank2: damlTypes.Party;
  bank3: damlTypes.Party;
  bank4: damlTypes.Party;
  csd: damlTypes.Party;
  issuer: damlTypes.Party;
  centralBank: damlTypes.Party;
};

export declare const Parties:
  damlTypes.Serializable<Parties> & {
  }
;


export declare type Rules = {
  issuerCashSettlementCid: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement>;
  bank1BondSettlementCid: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement>;
  bank2BondSettlementCid: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement>;
  bank3BondSettlementCid: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement>;
  bank1CashSettlementCid: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement>;
  bank2CashSettlementCid: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement>;
  bank3CashSettlementCid: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement>;
  issuerCashFungibleCid: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetFungible>;
  bank1CashFungibleCid: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetFungible>;
  bank2CashFungibleCid: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetFungible>;
  bank3CashFungibleCid: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetFungible>;
  bank1LockRuleCid: damlTypes.ContractId<DA_RefApps_Bond_Lock.AssetLockRule>;
  bank2LockRuleCid: damlTypes.ContractId<DA_RefApps_Bond_Lock.AssetLockRule>;
  bank3LockRuleCid: damlTypes.ContractId<DA_RefApps_Bond_Lock.AssetLockRule>;
};

export declare const Rules:
  damlTypes.Serializable<Rules> & {
  }
;


export declare type AssetsForRedemption = {
  bank1BondDepositCid: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit>;
  bank2BondDepositCid: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit>;
  bank3BondDepositCid: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit>;
  bank1RedemptionPayoutInfoCid: damlTypes.ContractId<DA_RefApps_Bond_Redemption.RedemptionPayoutInfo>;
  bank2RedemptionPayoutInfoCid: damlTypes.ContractId<DA_RefApps_Bond_Redemption.RedemptionPayoutInfo>;
  bank3RedemptionPayoutInfoCid: damlTypes.ContractId<DA_RefApps_Bond_Redemption.RedemptionPayoutInfo>;
};

export declare const AssetsForRedemption:
  damlTypes.Serializable<AssetsForRedemption> & {
  }
;


export declare type SettleRequests = {
  bank1SettleReqCid: damlTypes.ContractId<DA_RefApps_Bond_Auction.AuctionParticipantSettleRequest>;
  bank2SettleReqCid: damlTypes.ContractId<DA_RefApps_Bond_Auction.AuctionParticipantSettleRequest>;
  bank3SettleReqCid: damlTypes.ContractId<DA_RefApps_Bond_Auction.AuctionParticipantSettleRequest>;
  otherSettleReqCid: damlTypes.ContractId<DA_RefApps_Bond_Auction.AuctionParticipantSettleRequest>;
};

export declare const SettleRequests:
  damlTypes.Serializable<SettleRequests> & {
  }
;


export declare type AuctionProgress = {
  auction: damlTypes.ContractId<DA_RefApps_Bond_Auction.Auction>;
  bidderParticipationCid1: damlTypes.ContractId<DA_RefApps_Bond_Auction.BidderParticipation>;
  bidderParticipationCid2: damlTypes.ContractId<DA_RefApps_Bond_Auction.BidderParticipation>;
  bidderParticipationCid3: damlTypes.ContractId<DA_RefApps_Bond_Auction.BidderParticipation>;
  bidCid1_1: damlTypes.ContractId<DA_RefApps_Bond_Auction.AuctionBid>;
  bidCid2_1: damlTypes.ContractId<DA_RefApps_Bond_Auction.AuctionBid>;
  bidCid2_2: damlTypes.ContractId<DA_RefApps_Bond_Auction.AuctionBid>;
  bidCid3_1: damlTypes.ContractId<DA_RefApps_Bond_Auction.AuctionBid>;
  otherAuction: damlTypes.ContractId<DA_RefApps_Bond_Auction.Auction>;
  otherBidderParticipationCid1: damlTypes.ContractId<DA_RefApps_Bond_Auction.BidderParticipation>;
  otherBidderParticipationCid2: damlTypes.ContractId<DA_RefApps_Bond_Auction.BidderParticipation>;
  otherBidderParticipationCid3: damlTypes.ContractId<DA_RefApps_Bond_Auction.BidderParticipation>;
  otherBidCid1_1: damlTypes.ContractId<DA_RefApps_Bond_Auction.AuctionBid>;
  bank1Locks: damlTypes.ContractId<DA_RefApps_Bond_Lock.AuctionLockedCash>[];
  bank2Locks: damlTypes.ContractId<DA_RefApps_Bond_Lock.AuctionLockedCash>[];
  bank3Locks: damlTypes.ContractId<DA_RefApps_Bond_Lock.AuctionLockedCash>[];
  bank1OtherLocks: damlTypes.ContractId<DA_RefApps_Bond_Lock.AuctionLockedCash>[];
};

export declare const AuctionProgress:
  damlTypes.Serializable<AuctionProgress> & {
  }
;


export declare type CashAssets = {
  issuerCashDepositCid: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit>;
  bank1CashDepositCid: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit>;
  bank2CashDepositCid: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit>;
  bank3CashDepositCid: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit>;
};

export declare const CashAssets:
  damlTypes.Serializable<CashAssets> & {
  }
;


export declare type Accounts = {
  issuerAccount: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Account;
  bank1Account: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Account;
  bank2Account: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Account;
  bank3Account: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Account;
};

export declare const Accounts:
  damlTypes.Serializable<Accounts> & {
  }
;


export declare type TestIssuance = {
  roles: TestRoles;
  fixedRateBondFactCid: damlTypes.ContractId<DA_RefApps_Bond_FixedRateBond.FixedRateBondFact>;
  bondBundleData: DA_RefApps_Bond_Util.BondBundleData;
  cashAccounts: Accounts;
  bondAccounts: Accounts;
  cashAssets: CashAssets;
  rules: Rules;
  cashAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id;
};

export declare const TestIssuance:
  damlTypes.Serializable<TestIssuance> & {
  }
;


export declare type TestRoles = {
  issuerRoleCid: damlTypes.ContractId<DA_RefApps_Bond_Roles_IssuerRole.IssuerRole>;
  csdRoleCid: damlTypes.ContractId<DA_RefApps_Bond_Roles_CsdRole.CsdRole>;
  centralBankRoleCid: damlTypes.ContractId<DA_RefApps_Bond_Roles_CentralBankRole.CentralBankRole>;
};

export declare const TestRoles:
  damlTypes.Serializable<TestRoles> & {
  }
;

