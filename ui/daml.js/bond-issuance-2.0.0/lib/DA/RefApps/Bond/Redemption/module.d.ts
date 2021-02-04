// Generated from DA/RefApps/Bond/Redemption.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 from '@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662';
import * as pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc from '@daml.js/finlib-1.0.0';

import * as DA_RefApps_Bond_FixedRateBond from '../../../../DA/RefApps/Bond/FixedRateBond/module';

export declare type BondArchivalRequest_Archive = {
};

export declare const BondArchivalRequest_Archive:
  damlTypes.Serializable<BondArchivalRequest_Archive> & {
  }
;


export declare type BondArchivalRequest = {
  provider: damlTypes.Party;
  owner: damlTypes.Party;
  issuer: damlTypes.Party;
  bondAssetDepositCid: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit>;
  regulators: damlTypes.Party[];
};

export declare const BondArchivalRequest:
  damlTypes.Template<BondArchivalRequest, undefined, '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Redemption:BondArchivalRequest'> & {
  Archive: damlTypes.Choice<BondArchivalRequest, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
  BondArchivalRequest_Archive: damlTypes.Choice<BondArchivalRequest, BondArchivalRequest_Archive, {}, undefined>;
};

export declare namespace BondArchivalRequest {
  export type CreateEvent = damlLedger.CreateEvent<BondArchivalRequest, undefined, typeof BondArchivalRequest.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<BondArchivalRequest, typeof BondArchivalRequest.templateId>
  export type Event = damlLedger.Event<BondArchivalRequest, undefined, typeof BondArchivalRequest.templateId>
  export type QueryResult = damlLedger.QueryResult<BondArchivalRequest, undefined, typeof BondArchivalRequest.templateId>
}



export declare type RedemptionFinalizeBotTrigger_Finalize = {
  cashAssetDepositCids: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit>[];
  cashAssetSettlementCid: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement>;
  cashAssetFungibleCid: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetFungible>;
};

export declare const RedemptionFinalizeBotTrigger_Finalize:
  damlTypes.Serializable<RedemptionFinalizeBotTrigger_Finalize> & {
  }
;


export declare type RedemptionFinalizeBotTrigger = {
  issuer: damlTypes.Party;
  bondAccountProvider: damlTypes.Party;
  instructions: RedemptionInstruction[];
  cashAccountProviders: damlTypes.Party[];
  cashAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id;
  regulators: damlTypes.Party[];
};

export declare const RedemptionFinalizeBotTrigger:
  damlTypes.Template<RedemptionFinalizeBotTrigger, undefined, '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Redemption:RedemptionFinalizeBotTrigger'> & {
  RedemptionFinalizeBotTrigger_Finalize: damlTypes.Choice<RedemptionFinalizeBotTrigger, RedemptionFinalizeBotTrigger_Finalize, damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit>[], undefined>;
  Archive: damlTypes.Choice<RedemptionFinalizeBotTrigger, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
};

export declare namespace RedemptionFinalizeBotTrigger {
  export type CreateEvent = damlLedger.CreateEvent<RedemptionFinalizeBotTrigger, undefined, typeof RedemptionFinalizeBotTrigger.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<RedemptionFinalizeBotTrigger, typeof RedemptionFinalizeBotTrigger.templateId>
  export type Event = damlLedger.Event<RedemptionFinalizeBotTrigger, undefined, typeof RedemptionFinalizeBotTrigger.templateId>
  export type QueryResult = damlLedger.QueryResult<RedemptionFinalizeBotTrigger, undefined, typeof RedemptionFinalizeBotTrigger.templateId>
}



export declare type RedemptionInstruction = {
  issuer: damlTypes.Party;
  provider: damlTypes.Party;
  investor: damlTypes.Party;
  payment: damlTypes.Numeric;
  bondAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id;
  currency: string;
  bondAssetDepositCid: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit>;
  redemptionPayoutInfoCid: damlTypes.ContractId<RedemptionPayoutInfo>;
  fixedRateBondFactCid: damlTypes.ContractId<DA_RefApps_Bond_FixedRateBond.FixedRateBondFact>;
  bondArchivalRequestCid: damlTypes.ContractId<BondArchivalRequest>;
};

export declare const RedemptionInstruction:
  damlTypes.Serializable<RedemptionInstruction> & {
  }
;


export declare type RedemptionCalculationBotTrigger_Start = {
  redemptionPayoutInfos: damlTypes.ContractId<RedemptionPayoutInfo>[];
  bondsAtIssuer: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit>[];
};

export declare const RedemptionCalculationBotTrigger_Start:
  damlTypes.Serializable<RedemptionCalculationBotTrigger_Start> & {
  }
;


export declare type RedemptionCalculationBotTrigger = {
  issuer: damlTypes.Party;
  provider: damlTypes.Party;
  fixedRateBondFactCid: damlTypes.ContractId<DA_RefApps_Bond_FixedRateBond.FixedRateBondFact>;
  bondAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id;
  cashAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id;
  regulators: damlTypes.Party[];
};

export declare const RedemptionCalculationBotTrigger:
  damlTypes.Template<RedemptionCalculationBotTrigger, undefined, '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Redemption:RedemptionCalculationBotTrigger'> & {
  RedemptionCalculationBotTrigger_Start: damlTypes.Choice<RedemptionCalculationBotTrigger, RedemptionCalculationBotTrigger_Start, damlTypes.Optional<damlTypes.ContractId<RedemptionFinalizeBotTrigger>>, undefined>;
  Archive: damlTypes.Choice<RedemptionCalculationBotTrigger, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
};

export declare namespace RedemptionCalculationBotTrigger {
  export type CreateEvent = damlLedger.CreateEvent<RedemptionCalculationBotTrigger, undefined, typeof RedemptionCalculationBotTrigger.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<RedemptionCalculationBotTrigger, typeof RedemptionCalculationBotTrigger.templateId>
  export type Event = damlLedger.Event<RedemptionCalculationBotTrigger, undefined, typeof RedemptionCalculationBotTrigger.templateId>
  export type QueryResult = damlLedger.QueryResult<RedemptionCalculationBotTrigger, undefined, typeof RedemptionCalculationBotTrigger.templateId>
}



export declare type RedemptionRequest_Accept = {
};

export declare const RedemptionRequest_Accept:
  damlTypes.Serializable<RedemptionRequest_Accept> & {
  }
;


export declare type RedemptionRequest = {
  issuer: damlTypes.Party;
  provider: damlTypes.Party;
  fixedRateBondFactCid: damlTypes.ContractId<DA_RefApps_Bond_FixedRateBond.FixedRateBondFact>;
  isin: string;
  regulators: damlTypes.Party[];
};

export declare const RedemptionRequest:
  damlTypes.Template<RedemptionRequest, undefined, '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Redemption:RedemptionRequest'> & {
  RedemptionRequest_Accept: damlTypes.Choice<RedemptionRequest, RedemptionRequest_Accept, damlTypes.ContractId<RedemptionCalculationBotTrigger>, undefined>;
  Archive: damlTypes.Choice<RedemptionRequest, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
};

export declare namespace RedemptionRequest {
  export type CreateEvent = damlLedger.CreateEvent<RedemptionRequest, undefined, typeof RedemptionRequest.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<RedemptionRequest, typeof RedemptionRequest.templateId>
  export type Event = damlLedger.Event<RedemptionRequest, undefined, typeof RedemptionRequest.templateId>
  export type QueryResult = damlLedger.QueryResult<RedemptionRequest, undefined, typeof RedemptionRequest.templateId>
}



export declare type RedemptionPayoutInfo_Redeem = {
  cashAssetDepositCid: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit>;
  issuerCashAssetSettlementCid: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement>;
  bondArchivalRequestCid: damlTypes.ContractId<BondArchivalRequest>;
  fixedRateBondFactCid: damlTypes.ContractId<DA_RefApps_Bond_FixedRateBond.FixedRateBondFact>;
};

export declare const RedemptionPayoutInfo_Redeem:
  damlTypes.Serializable<RedemptionPayoutInfo_Redeem> & {
  }
;


export declare type RedemptionPayoutInfo = {
  issuer: damlTypes.Party;
  investor: damlTypes.Party;
  bondInstrumentId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id;
  bondAccountProvider: damlTypes.Party;
  investorCashAccount: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Account;
  settlementResult: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Trade.Dvp.DvpSettlement_Process_Result;
  investorCashAssetSettlementCid: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement>;
  regulators: damlTypes.Party[];
};

export declare const RedemptionPayoutInfo:
  damlTypes.Template<RedemptionPayoutInfo, undefined, '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Redemption:RedemptionPayoutInfo'> & {
  RedemptionPayoutInfo_Redeem: damlTypes.Choice<RedemptionPayoutInfo, RedemptionPayoutInfo_Redeem, damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit>, undefined>;
  Archive: damlTypes.Choice<RedemptionPayoutInfo, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
};

export declare namespace RedemptionPayoutInfo {
  export type CreateEvent = damlLedger.CreateEvent<RedemptionPayoutInfo, undefined, typeof RedemptionPayoutInfo.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<RedemptionPayoutInfo, typeof RedemptionPayoutInfo.templateId>
  export type Event = damlLedger.Event<RedemptionPayoutInfo, undefined, typeof RedemptionPayoutInfo.templateId>
  export type QueryResult = damlLedger.QueryResult<RedemptionPayoutInfo, undefined, typeof RedemptionPayoutInfo.templateId>
}


