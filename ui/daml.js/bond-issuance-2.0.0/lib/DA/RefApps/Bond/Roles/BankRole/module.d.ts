// Generated from DA/RefApps/Bond/Roles/BankRole.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 from '@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662';

export declare type BankRole = {
  bank: damlTypes.Party;
  operator: damlTypes.Party;
  regulators: damlTypes.Party[];
};

export declare const BankRole:
  damlTypes.Template<BankRole, undefined, '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Roles.BankRole:BankRole'> & {
  Archive: damlTypes.Choice<BankRole, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
};

export declare namespace BankRole {
  export type CreateEvent = damlLedger.CreateEvent<BankRole, undefined, typeof BankRole.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<BankRole, typeof BankRole.templateId>
  export type Event = damlLedger.Event<BankRole, undefined, typeof BankRole.templateId>
  export type QueryResult = damlLedger.QueryResult<BankRole, undefined, typeof BankRole.templateId>
}



export declare type BankRoleInvitation_Revoke = {
};

export declare const BankRoleInvitation_Revoke:
  damlTypes.Serializable<BankRoleInvitation_Revoke> & {
  }
;


export declare type BankRoleInvitation_Reject = {
};

export declare const BankRoleInvitation_Reject:
  damlTypes.Serializable<BankRoleInvitation_Reject> & {
  }
;


export declare type BankRoleInvitation_Accept = {
};

export declare const BankRoleInvitation_Accept:
  damlTypes.Serializable<BankRoleInvitation_Accept> & {
  }
;


export declare type BankRoleInvitation = {
  bank: damlTypes.Party;
  operator: damlTypes.Party;
  regulators: damlTypes.Party[];
};

export declare const BankRoleInvitation:
  damlTypes.Template<BankRoleInvitation, undefined, '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Roles.BankRole:BankRoleInvitation'> & {
  Archive: damlTypes.Choice<BankRoleInvitation, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
  BankRoleInvitation_Reject: damlTypes.Choice<BankRoleInvitation, BankRoleInvitation_Reject, {}, undefined>;
  BankRoleInvitation_Revoke: damlTypes.Choice<BankRoleInvitation, BankRoleInvitation_Revoke, {}, undefined>;
  BankRoleInvitation_Accept: damlTypes.Choice<BankRoleInvitation, BankRoleInvitation_Accept, damlTypes.ContractId<BankRole>, undefined>;
};

export declare namespace BankRoleInvitation {
  export type CreateEvent = damlLedger.CreateEvent<BankRoleInvitation, undefined, typeof BankRoleInvitation.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<BankRoleInvitation, typeof BankRoleInvitation.templateId>
  export type Event = damlLedger.Event<BankRoleInvitation, undefined, typeof BankRoleInvitation.templateId>
  export type QueryResult = damlLedger.QueryResult<BankRoleInvitation, undefined, typeof BankRoleInvitation.templateId>
}


