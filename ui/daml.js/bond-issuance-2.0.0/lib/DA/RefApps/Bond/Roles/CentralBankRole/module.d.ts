// Generated from DA/RefApps/Bond/Roles/CentralBankRole.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 from '@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662';
import * as pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc from '@daml.js/finlib-1.0.0';

import * as DA_RefApps_Bond_Lock from '../../../../../DA/RefApps/Bond/Lock/module';

export declare type CentralBankRole_CreateLockRule = {
  account: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Account;
};

export declare const CentralBankRole_CreateLockRule:
  damlTypes.Serializable<CentralBankRole_CreateLockRule> & {
  }
;


export declare type CentralBankRole_CreateFungibleRule = {
  account: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Account;
};

export declare const CentralBankRole_CreateFungibleRule:
  damlTypes.Serializable<CentralBankRole_CreateFungibleRule> & {
  }
;


export declare type CentralBankRole_CreateSettlementRule = {
  account: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Account;
  observers: damlTypes.Party[];
};

export declare const CentralBankRole_CreateSettlementRule:
  damlTypes.Serializable<CentralBankRole_CreateSettlementRule> & {
  }
;


export declare type CentralBankRole_IssueCash = {
  account: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Account;
  currency: string;
  quantity: damlTypes.Numeric;
};

export declare const CentralBankRole_IssueCash:
  damlTypes.Serializable<CentralBankRole_IssueCash> & {
  }
;


export declare type CentralBankRole = {
  centralBank: damlTypes.Party;
  operator: damlTypes.Party;
  regulators: damlTypes.Party[];
};

export declare const CentralBankRole:
  damlTypes.Template<CentralBankRole, undefined, '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Roles.CentralBankRole:CentralBankRole'> & {
  CentralBankRole_IssueCash: damlTypes.Choice<CentralBankRole, CentralBankRole_IssueCash, damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit>, undefined>;
  CentralBankRole_CreateSettlementRule: damlTypes.Choice<CentralBankRole, CentralBankRole_CreateSettlementRule, damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement>, undefined>;
  CentralBankRole_CreateFungibleRule: damlTypes.Choice<CentralBankRole, CentralBankRole_CreateFungibleRule, damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetFungible>, undefined>;
  Archive: damlTypes.Choice<CentralBankRole, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
  CentralBankRole_CreateLockRule: damlTypes.Choice<CentralBankRole, CentralBankRole_CreateLockRule, damlTypes.ContractId<DA_RefApps_Bond_Lock.AssetLockRule>, undefined>;
};

export declare namespace CentralBankRole {
  export type CreateEvent = damlLedger.CreateEvent<CentralBankRole, undefined, typeof CentralBankRole.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<CentralBankRole, typeof CentralBankRole.templateId>
  export type Event = damlLedger.Event<CentralBankRole, undefined, typeof CentralBankRole.templateId>
  export type QueryResult = damlLedger.QueryResult<CentralBankRole, undefined, typeof CentralBankRole.templateId>
}



export declare type CentralBankRoleInvitation_Revoke = {
};

export declare const CentralBankRoleInvitation_Revoke:
  damlTypes.Serializable<CentralBankRoleInvitation_Revoke> & {
  }
;


export declare type CentralBankRoleInvitation_Reject = {
};

export declare const CentralBankRoleInvitation_Reject:
  damlTypes.Serializable<CentralBankRoleInvitation_Reject> & {
  }
;


export declare type CentralBankRoleInvitation_Accept = {
};

export declare const CentralBankRoleInvitation_Accept:
  damlTypes.Serializable<CentralBankRoleInvitation_Accept> & {
  }
;


export declare type CentralBankRoleInvitation = {
  centralBank: damlTypes.Party;
  operator: damlTypes.Party;
  regulators: damlTypes.Party[];
};

export declare const CentralBankRoleInvitation:
  damlTypes.Template<CentralBankRoleInvitation, undefined, '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Roles.CentralBankRole:CentralBankRoleInvitation'> & {
  CentralBankRoleInvitation_Accept: damlTypes.Choice<CentralBankRoleInvitation, CentralBankRoleInvitation_Accept, damlTypes.ContractId<CentralBankRole>, undefined>;
  CentralBankRoleInvitation_Reject: damlTypes.Choice<CentralBankRoleInvitation, CentralBankRoleInvitation_Reject, {}, undefined>;
  CentralBankRoleInvitation_Revoke: damlTypes.Choice<CentralBankRoleInvitation, CentralBankRoleInvitation_Revoke, {}, undefined>;
  Archive: damlTypes.Choice<CentralBankRoleInvitation, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
};

export declare namespace CentralBankRoleInvitation {
  export type CreateEvent = damlLedger.CreateEvent<CentralBankRoleInvitation, undefined, typeof CentralBankRoleInvitation.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<CentralBankRoleInvitation, typeof CentralBankRoleInvitation.templateId>
  export type Event = damlLedger.Event<CentralBankRoleInvitation, undefined, typeof CentralBankRoleInvitation.templateId>
  export type QueryResult = damlLedger.QueryResult<CentralBankRoleInvitation, undefined, typeof CentralBankRoleInvitation.templateId>
}


