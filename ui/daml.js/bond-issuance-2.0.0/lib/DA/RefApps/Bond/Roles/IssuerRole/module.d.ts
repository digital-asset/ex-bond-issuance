// Generated from DA/RefApps/Bond/Roles/IssuerRole.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

import * as pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7 from '@daml.js/40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 from '@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662';
import * as pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc from '@daml.js/finlib-1.0.0';

import * as DA_RefApps_Bond_Auction from '../../../../../DA/RefApps/Bond/Auction/module';
import * as DA_RefApps_Bond_FixedRateBond from '../../../../../DA/RefApps/Bond/FixedRateBond/module';
import * as DA_RefApps_Bond_Redemption from '../../../../../DA/RefApps/Bond/Redemption/module';

export declare type IssuanceRequest_Accept = {
  isin: string;
};

export declare const IssuanceRequest_Accept:
  damlTypes.Serializable<IssuanceRequest_Accept> & {
  }
;


export declare type IssuanceRequest = {
  issuer: damlTypes.Party;
  operator: damlTypes.Party;
  regulators: damlTypes.Party[];
  issueSize: damlTypes.Int;
  issueDate: damlTypes.Date;
  maturityDate: damlTypes.Date;
  cashAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id;
  denomination: damlTypes.Numeric;
  couponRate: damlTypes.Numeric;
  couponDates: damlTypes.Date[];
  bondAccount: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Account;
};

export declare const IssuanceRequest:
  damlTypes.Template<IssuanceRequest, undefined, '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Roles.IssuerRole:IssuanceRequest'> & {
  Archive: damlTypes.Choice<IssuanceRequest, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
  IssuanceRequest_Accept: damlTypes.Choice<IssuanceRequest, IssuanceRequest_Accept, pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2<damlTypes.ContractId<DA_RefApps_Bond_FixedRateBond.FixedRateBondFact>, damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit>>, undefined>;
};

export declare namespace IssuanceRequest {
  export type CreateEvent = damlLedger.CreateEvent<IssuanceRequest, undefined, typeof IssuanceRequest.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<IssuanceRequest, typeof IssuanceRequest.templateId>
  export type Event = damlLedger.Event<IssuanceRequest, undefined, typeof IssuanceRequest.templateId>
  export type QueryResult = damlLedger.QueryResult<IssuanceRequest, undefined, typeof IssuanceRequest.templateId>
}



export declare type CommissionBotTrigger_InviteAgent = {
  bondAssetFungibleCid: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetFungible>;
  bondAssetSettlementCid: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement>;
  cashAssetSettlementCid: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement>;
  fixedRateBondFactCid: damlTypes.ContractId<DA_RefApps_Bond_FixedRateBond.FixedRateBondFact>;
};

export declare const CommissionBotTrigger_InviteAgent:
  damlTypes.Serializable<CommissionBotTrigger_InviteAgent> & {
  }
;


export declare type CommissionBotTrigger = {
  issuer: damlTypes.Party;
  operator: damlTypes.Party;
  regulators: damlTypes.Party[];
  bondAssetDepositCid: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit>;
  issuerBondAccount: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Account;
  bondAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id;
  auctionAgent: damlTypes.Party;
  startDate: damlTypes.Date;
  endDate: damlTypes.Date;
  minPrice: damlTypes.Numeric;
  size: damlTypes.Int;
  cashAccountProvider: damlTypes.Party;
};

export declare const CommissionBotTrigger:
  damlTypes.Template<CommissionBotTrigger, undefined, '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Roles.IssuerRole:CommissionBotTrigger'> & {
  CommissionBotTrigger_InviteAgent: damlTypes.Choice<CommissionBotTrigger, CommissionBotTrigger_InviteAgent, pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2<damlTypes.ContractId<DA_RefApps_Bond_Auction.AuctionInvitation>, damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit>[]>, undefined>;
  Archive: damlTypes.Choice<CommissionBotTrigger, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
};

export declare namespace CommissionBotTrigger {
  export type CreateEvent = damlLedger.CreateEvent<CommissionBotTrigger, undefined, typeof CommissionBotTrigger.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<CommissionBotTrigger, typeof CommissionBotTrigger.templateId>
  export type Event = damlLedger.Event<CommissionBotTrigger, undefined, typeof CommissionBotTrigger.templateId>
  export type QueryResult = damlLedger.QueryResult<CommissionBotTrigger, undefined, typeof CommissionBotTrigger.templateId>
}



export declare type IssuerRole_Redeem = {
  fixedRateBondFactCid: damlTypes.ContractId<DA_RefApps_Bond_FixedRateBond.FixedRateBondFact>;
};

export declare const IssuerRole_Redeem:
  damlTypes.Serializable<IssuerRole_Redeem> & {
  }
;


export declare type IssuerRole_CommissionAuction = {
  bondAssetDepositCid: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit>;
  startDate: damlTypes.Date;
  endDate: damlTypes.Date;
  minPrice: damlTypes.Numeric;
  size: damlTypes.Int;
};

export declare const IssuerRole_CommissionAuction:
  damlTypes.Serializable<IssuerRole_CommissionAuction> & {
  }
;


export declare type IssuerRole_Issuance = {
  issueSize: damlTypes.Int;
  issueDate: damlTypes.Date;
  currency: string;
  denomination: damlTypes.Numeric;
  maturityDate: damlTypes.Date;
  couponRate: damlTypes.Numeric;
  couponDates: damlTypes.Date[];
};

export declare const IssuerRole_Issuance:
  damlTypes.Serializable<IssuerRole_Issuance> & {
  }
;


export declare type IssuerRole = {
  issuer: damlTypes.Party;
  bondProvider: damlTypes.Party;
  cashProvider: damlTypes.Party;
  auctionAgent: damlTypes.Party;
  operator: damlTypes.Party;
  regulators: damlTypes.Party[];
};

export declare const IssuerRole:
  damlTypes.Template<IssuerRole, undefined, '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Roles.IssuerRole:IssuerRole'> & {
  IssuerRole_Issuance: damlTypes.Choice<IssuerRole, IssuerRole_Issuance, damlTypes.ContractId<IssuanceRequest>, undefined>;
  IssuerRole_CommissionAuction: damlTypes.Choice<IssuerRole, IssuerRole_CommissionAuction, damlTypes.ContractId<CommissionBotTrigger>, undefined>;
  IssuerRole_Redeem: damlTypes.Choice<IssuerRole, IssuerRole_Redeem, damlTypes.ContractId<DA_RefApps_Bond_Redemption.RedemptionRequest>, undefined>;
  Archive: damlTypes.Choice<IssuerRole, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
};

export declare namespace IssuerRole {
  export type CreateEvent = damlLedger.CreateEvent<IssuerRole, undefined, typeof IssuerRole.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<IssuerRole, typeof IssuerRole.templateId>
  export type Event = damlLedger.Event<IssuerRole, undefined, typeof IssuerRole.templateId>
  export type QueryResult = damlLedger.QueryResult<IssuerRole, undefined, typeof IssuerRole.templateId>
}



export declare type IssuerRoleInvitation_Revoke = {
};

export declare const IssuerRoleInvitation_Revoke:
  damlTypes.Serializable<IssuerRoleInvitation_Revoke> & {
  }
;


export declare type IssuerRoleInvitation_Reject = {
};

export declare const IssuerRoleInvitation_Reject:
  damlTypes.Serializable<IssuerRoleInvitation_Reject> & {
  }
;


export declare type IssuerRoleInvitation_Accept = {
};

export declare const IssuerRoleInvitation_Accept:
  damlTypes.Serializable<IssuerRoleInvitation_Accept> & {
  }
;


export declare type IssuerRoleInvitation = {
  issuer: damlTypes.Party;
  bondProvider: damlTypes.Party;
  cashProvider: damlTypes.Party;
  auctionAgent: damlTypes.Party;
  operator: damlTypes.Party;
  regulators: damlTypes.Party[];
};

export declare const IssuerRoleInvitation:
  damlTypes.Template<IssuerRoleInvitation, undefined, '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Roles.IssuerRole:IssuerRoleInvitation'> & {
  IssuerRoleInvitation_Accept: damlTypes.Choice<IssuerRoleInvitation, IssuerRoleInvitation_Accept, damlTypes.ContractId<IssuerRole>, undefined>;
  IssuerRoleInvitation_Reject: damlTypes.Choice<IssuerRoleInvitation, IssuerRoleInvitation_Reject, {}, undefined>;
  IssuerRoleInvitation_Revoke: damlTypes.Choice<IssuerRoleInvitation, IssuerRoleInvitation_Revoke, {}, undefined>;
  Archive: damlTypes.Choice<IssuerRoleInvitation, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
};

export declare namespace IssuerRoleInvitation {
  export type CreateEvent = damlLedger.CreateEvent<IssuerRoleInvitation, undefined, typeof IssuerRoleInvitation.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<IssuerRoleInvitation, typeof IssuerRoleInvitation.templateId>
  export type Event = damlLedger.Event<IssuerRoleInvitation, undefined, typeof IssuerRoleInvitation.templateId>
  export type QueryResult = damlLedger.QueryResult<IssuerRoleInvitation, undefined, typeof IssuerRoleInvitation.templateId>
}


