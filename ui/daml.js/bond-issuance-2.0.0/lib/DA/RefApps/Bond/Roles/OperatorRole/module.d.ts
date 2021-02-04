// Generated from DA/RefApps/Bond/Roles/OperatorRole.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 from '@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662';

import * as DA_RefApps_Bond_Roles_AuctionAgentRole from '../../../../../DA/RefApps/Bond/Roles/AuctionAgentRole/module';
import * as DA_RefApps_Bond_Roles_BankRole from '../../../../../DA/RefApps/Bond/Roles/BankRole/module';
import * as DA_RefApps_Bond_Roles_CentralBankRole from '../../../../../DA/RefApps/Bond/Roles/CentralBankRole/module';
import * as DA_RefApps_Bond_Roles_CsdRole from '../../../../../DA/RefApps/Bond/Roles/CsdRole/module';
import * as DA_RefApps_Bond_Roles_IssuerRole from '../../../../../DA/RefApps/Bond/Roles/IssuerRole/module';

export declare type OperatorRole_InviteCentralBank = {
  centralBank: damlTypes.Party;
};

export declare const OperatorRole_InviteCentralBank:
  damlTypes.Serializable<OperatorRole_InviteCentralBank> & {
  }
;


export declare type OperatorRole_InviteIssuer = {
  issuer: damlTypes.Party;
  bondProvider: damlTypes.Party;
  cashProvider: damlTypes.Party;
  auctionAgent: damlTypes.Party;
};

export declare const OperatorRole_InviteIssuer:
  damlTypes.Serializable<OperatorRole_InviteIssuer> & {
  }
;


export declare type OperatorRole_InviteCsd = {
  csd: damlTypes.Party;
};

export declare const OperatorRole_InviteCsd:
  damlTypes.Serializable<OperatorRole_InviteCsd> & {
  }
;


export declare type OperatorRole_InviteBank = {
  bank: damlTypes.Party;
};

export declare const OperatorRole_InviteBank:
  damlTypes.Serializable<OperatorRole_InviteBank> & {
  }
;


export declare type OperatorRole_InviteAuctionAgent = {
  auctionAgent: damlTypes.Party;
};

export declare const OperatorRole_InviteAuctionAgent:
  damlTypes.Serializable<OperatorRole_InviteAuctionAgent> & {
  }
;


export declare type OperatorRole = {
  operator: damlTypes.Party;
  regulators: damlTypes.Party[];
};

export declare const OperatorRole:
  damlTypes.Template<OperatorRole, undefined, '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Roles.OperatorRole:OperatorRole'> & {
  OperatorRole_InviteAuctionAgent: damlTypes.Choice<OperatorRole, OperatorRole_InviteAuctionAgent, damlTypes.ContractId<DA_RefApps_Bond_Roles_AuctionAgentRole.AuctionAgentRoleInvitation>, undefined>;
  OperatorRole_InviteBank: damlTypes.Choice<OperatorRole, OperatorRole_InviteBank, damlTypes.ContractId<DA_RefApps_Bond_Roles_BankRole.BankRoleInvitation>, undefined>;
  OperatorRole_InviteCsd: damlTypes.Choice<OperatorRole, OperatorRole_InviteCsd, damlTypes.ContractId<DA_RefApps_Bond_Roles_CsdRole.CsdRoleInvitation>, undefined>;
  OperatorRole_InviteIssuer: damlTypes.Choice<OperatorRole, OperatorRole_InviteIssuer, damlTypes.ContractId<DA_RefApps_Bond_Roles_IssuerRole.IssuerRoleInvitation>, undefined>;
  Archive: damlTypes.Choice<OperatorRole, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
  OperatorRole_InviteCentralBank: damlTypes.Choice<OperatorRole, OperatorRole_InviteCentralBank, damlTypes.ContractId<DA_RefApps_Bond_Roles_CentralBankRole.CentralBankRoleInvitation>, undefined>;
};

export declare namespace OperatorRole {
  export type CreateEvent = damlLedger.CreateEvent<OperatorRole, undefined, typeof OperatorRole.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<OperatorRole, typeof OperatorRole.templateId>
  export type Event = damlLedger.Event<OperatorRole, undefined, typeof OperatorRole.templateId>
  export type QueryResult = damlLedger.QueryResult<OperatorRole, undefined, typeof OperatorRole.templateId>
}


