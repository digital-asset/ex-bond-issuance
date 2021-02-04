// Generated from DA/RefApps/Bond/Lock.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

import * as pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14 from '@daml.js/52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 from '@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662';
import * as pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc from '@daml.js/finlib-1.0.0';

export declare type AuctionLockedCash_Unlock = {
};

export declare const AuctionLockedCash_Unlock:
  damlTypes.Serializable<AuctionLockedCash_Unlock> & {
  }
;


export declare type AuctionLockedCash = {
  owner: damlTypes.Party;
  auctionAgent: damlTypes.Party;
  auctionName: string;
  lockedCashAssetDeposit: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit;
  account: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Account;
  regulators: damlTypes.Party[];
};

export declare const AuctionLockedCash:
  damlTypes.Template<AuctionLockedCash, undefined, '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Lock:AuctionLockedCash'> & {
  AuctionLockedCash_Unlock: damlTypes.Choice<AuctionLockedCash, AuctionLockedCash_Unlock, damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit>, undefined>;
  Archive: damlTypes.Choice<AuctionLockedCash, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
};

export declare namespace AuctionLockedCash {
  export type CreateEvent = damlLedger.CreateEvent<AuctionLockedCash, undefined, typeof AuctionLockedCash.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<AuctionLockedCash, typeof AuctionLockedCash.templateId>
  export type Event = damlLedger.Event<AuctionLockedCash, undefined, typeof AuctionLockedCash.templateId>
  export type QueryResult = damlLedger.QueryResult<AuctionLockedCash, undefined, typeof AuctionLockedCash.templateId>
}



export declare type AssetLockRule_Lock = {
  assetDepositCid: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit>;
  auctionName: string;
  auctionAgent: damlTypes.Party;
  regulators: damlTypes.Party[];
};

export declare const AssetLockRule_Lock:
  damlTypes.Serializable<AssetLockRule_Lock> & {
  }
;


export declare type AssetLockRule = {
  account: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Account;
  observers: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set<damlTypes.Party>;
};

export declare const AssetLockRule:
  damlTypes.Template<AssetLockRule, undefined, '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Lock:AssetLockRule'> & {
  Archive: damlTypes.Choice<AssetLockRule, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
  AssetLockRule_Lock: damlTypes.Choice<AssetLockRule, AssetLockRule_Lock, damlTypes.ContractId<AuctionLockedCash>, undefined>;
};

export declare namespace AssetLockRule {
  export type CreateEvent = damlLedger.CreateEvent<AssetLockRule, undefined, typeof AssetLockRule.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<AssetLockRule, typeof AssetLockRule.templateId>
  export type Event = damlLedger.Event<AssetLockRule, undefined, typeof AssetLockRule.templateId>
  export type QueryResult = damlLedger.QueryResult<AssetLockRule, undefined, typeof AssetLockRule.templateId>
}


