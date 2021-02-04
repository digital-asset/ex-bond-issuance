// Generated from DA/RefApps/Bond/Roles/AuctionAgentRole.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 from '@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662';

export declare type AuctionAgentRole = {
  auctionAgent: damlTypes.Party;
  operator: damlTypes.Party;
  regulators: damlTypes.Party[];
};

export declare const AuctionAgentRole:
  damlTypes.Template<AuctionAgentRole, undefined, '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Roles.AuctionAgentRole:AuctionAgentRole'> & {
  Archive: damlTypes.Choice<AuctionAgentRole, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
};

export declare namespace AuctionAgentRole {
  export type CreateEvent = damlLedger.CreateEvent<AuctionAgentRole, undefined, typeof AuctionAgentRole.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<AuctionAgentRole, typeof AuctionAgentRole.templateId>
  export type Event = damlLedger.Event<AuctionAgentRole, undefined, typeof AuctionAgentRole.templateId>
  export type QueryResult = damlLedger.QueryResult<AuctionAgentRole, undefined, typeof AuctionAgentRole.templateId>
}



export declare type AuctionAgentRoleInvitation_Revoke = {
};

export declare const AuctionAgentRoleInvitation_Revoke:
  damlTypes.Serializable<AuctionAgentRoleInvitation_Revoke> & {
  }
;


export declare type AuctionAgentRoleInvitation_Reject = {
};

export declare const AuctionAgentRoleInvitation_Reject:
  damlTypes.Serializable<AuctionAgentRoleInvitation_Reject> & {
  }
;


export declare type AuctionAgentRoleInvitation_Accept = {
};

export declare const AuctionAgentRoleInvitation_Accept:
  damlTypes.Serializable<AuctionAgentRoleInvitation_Accept> & {
  }
;


export declare type AuctionAgentRoleInvitation = {
  auctionAgent: damlTypes.Party;
  operator: damlTypes.Party;
  regulators: damlTypes.Party[];
};

export declare const AuctionAgentRoleInvitation:
  damlTypes.Template<AuctionAgentRoleInvitation, undefined, '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Roles.AuctionAgentRole:AuctionAgentRoleInvitation'> & {
  Archive: damlTypes.Choice<AuctionAgentRoleInvitation, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
  AuctionAgentRoleInvitation_Reject: damlTypes.Choice<AuctionAgentRoleInvitation, AuctionAgentRoleInvitation_Reject, {}, undefined>;
  AuctionAgentRoleInvitation_Revoke: damlTypes.Choice<AuctionAgentRoleInvitation, AuctionAgentRoleInvitation_Revoke, {}, undefined>;
  AuctionAgentRoleInvitation_Accept: damlTypes.Choice<AuctionAgentRoleInvitation, AuctionAgentRoleInvitation_Accept, damlTypes.ContractId<AuctionAgentRole>, undefined>;
};

export declare namespace AuctionAgentRoleInvitation {
  export type CreateEvent = damlLedger.CreateEvent<AuctionAgentRoleInvitation, undefined, typeof AuctionAgentRoleInvitation.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<AuctionAgentRoleInvitation, typeof AuctionAgentRoleInvitation.templateId>
  export type Event = damlLedger.Event<AuctionAgentRoleInvitation, undefined, typeof AuctionAgentRoleInvitation.templateId>
  export type QueryResult = damlLedger.QueryResult<AuctionAgentRoleInvitation, undefined, typeof AuctionAgentRoleInvitation.templateId>
}


