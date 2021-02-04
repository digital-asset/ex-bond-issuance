// Generated from DA/RefApps/Bond/Roles/CsdRole.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 from '@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662';
import * as pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc from '@daml.js/finlib-1.0.0';

export declare type CsdRole_CreateFungibleRule = {
  account: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Account;
  observers: damlTypes.Party[];
};

export declare const CsdRole_CreateFungibleRule:
  damlTypes.Serializable<CsdRole_CreateFungibleRule> & {
  }
;


export declare type CsdRole_CreateSettlementRule = {
  account: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Account;
  observers: damlTypes.Party[];
};

export declare const CsdRole_CreateSettlementRule:
  damlTypes.Serializable<CsdRole_CreateSettlementRule> & {
  }
;


export declare type CsdRole = {
  csd: damlTypes.Party;
  operator: damlTypes.Party;
  regulators: damlTypes.Party[];
};

export declare const CsdRole:
  damlTypes.Template<CsdRole, undefined, '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Roles.CsdRole:CsdRole'> & {
  CsdRole_CreateSettlementRule: damlTypes.Choice<CsdRole, CsdRole_CreateSettlementRule, damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement>, undefined>;
  Archive: damlTypes.Choice<CsdRole, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
  CsdRole_CreateFungibleRule: damlTypes.Choice<CsdRole, CsdRole_CreateFungibleRule, damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetFungible>, undefined>;
};

export declare namespace CsdRole {
  export type CreateEvent = damlLedger.CreateEvent<CsdRole, undefined, typeof CsdRole.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<CsdRole, typeof CsdRole.templateId>
  export type Event = damlLedger.Event<CsdRole, undefined, typeof CsdRole.templateId>
  export type QueryResult = damlLedger.QueryResult<CsdRole, undefined, typeof CsdRole.templateId>
}



export declare type CsdRoleInvitation_Revoke = {
};

export declare const CsdRoleInvitation_Revoke:
  damlTypes.Serializable<CsdRoleInvitation_Revoke> & {
  }
;


export declare type CsdRoleInvitation_Reject = {
};

export declare const CsdRoleInvitation_Reject:
  damlTypes.Serializable<CsdRoleInvitation_Reject> & {
  }
;


export declare type CsdRoleInvitation_Accept = {
};

export declare const CsdRoleInvitation_Accept:
  damlTypes.Serializable<CsdRoleInvitation_Accept> & {
  }
;


export declare type CsdRoleInvitation = {
  csd: damlTypes.Party;
  operator: damlTypes.Party;
  regulators: damlTypes.Party[];
};

export declare const CsdRoleInvitation:
  damlTypes.Template<CsdRoleInvitation, undefined, '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Roles.CsdRole:CsdRoleInvitation'> & {
  CsdRoleInvitation_Accept: damlTypes.Choice<CsdRoleInvitation, CsdRoleInvitation_Accept, damlTypes.ContractId<CsdRole>, undefined>;
  CsdRoleInvitation_Reject: damlTypes.Choice<CsdRoleInvitation, CsdRoleInvitation_Reject, {}, undefined>;
  CsdRoleInvitation_Revoke: damlTypes.Choice<CsdRoleInvitation, CsdRoleInvitation_Revoke, {}, undefined>;
  Archive: damlTypes.Choice<CsdRoleInvitation, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
};

export declare namespace CsdRoleInvitation {
  export type CreateEvent = damlLedger.CreateEvent<CsdRoleInvitation, undefined, typeof CsdRoleInvitation.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<CsdRoleInvitation, typeof CsdRoleInvitation.templateId>
  export type Event = damlLedger.Event<CsdRoleInvitation, undefined, typeof CsdRoleInvitation.templateId>
  export type QueryResult = damlLedger.QueryResult<CsdRoleInvitation, undefined, typeof CsdRoleInvitation.templateId>
}


