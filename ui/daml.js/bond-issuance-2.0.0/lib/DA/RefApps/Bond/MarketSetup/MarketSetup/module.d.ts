// Generated from DA/RefApps/Bond/MarketSetup/MarketSetup.daml
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
import * as DA_RefApps_Bond_Roles_IssuerRole from '../../../../../DA/RefApps/Bond/Roles/IssuerRole/module';

export declare type MarketSetup_Sign = {
  signer: damlTypes.Party;
};

export declare const MarketSetup_Sign:
  damlTypes.Serializable<MarketSetup_Sign> & {
  }
;


export declare type MarketSetup_SetupMarket = {
};

export declare const MarketSetup_SetupMarket:
  damlTypes.Serializable<MarketSetup_SetupMarket> & {
  }
;


export declare type MarketSetup = {
  operator: damlTypes.Party;
  regulator: damlTypes.Party;
  auctionAgent: damlTypes.Party;
  bank1: damlTypes.Party;
  bank2: damlTypes.Party;
  bank3: damlTypes.Party;
  csd: damlTypes.Party;
  issuer: damlTypes.Party;
  centralBank: damlTypes.Party;
  signatories: damlTypes.Party[];
};

export declare const MarketSetup:
  damlTypes.Template<MarketSetup, undefined, '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.MarketSetup.MarketSetup:MarketSetup'> & {
  MarketSetup_SetupMarket: damlTypes.Choice<MarketSetup, MarketSetup_SetupMarket, MarketSetupData, undefined>;
  MarketSetup_Sign: damlTypes.Choice<MarketSetup, MarketSetup_Sign, damlTypes.ContractId<MarketSetup>, undefined>;
  Archive: damlTypes.Choice<MarketSetup, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
};

export declare namespace MarketSetup {
  export type CreateEvent = damlLedger.CreateEvent<MarketSetup, undefined, typeof MarketSetup.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<MarketSetup, typeof MarketSetup.templateId>
  export type Event = damlLedger.Event<MarketSetup, undefined, typeof MarketSetup.templateId>
  export type QueryResult = damlLedger.QueryResult<MarketSetup, undefined, typeof MarketSetup.templateId>
}



export declare type MarketSetupSignatureCreator_CreateSignature = {
  marketParticipant: damlTypes.Party;
};

export declare const MarketSetupSignatureCreator_CreateSignature:
  damlTypes.Serializable<MarketSetupSignatureCreator_CreateSignature> & {
  }
;


export declare type MarketSetupSignatureCreator_SetupMarket = {
  signatures: damlTypes.ContractId<MarketSetupSignature>[];
};

export declare const MarketSetupSignatureCreator_SetupMarket:
  damlTypes.Serializable<MarketSetupSignatureCreator_SetupMarket> & {
  }
;


export declare type MarketSetupSignatureCreator = {
  operator: damlTypes.Party;
  regulator: damlTypes.Party;
  auctionAgent: damlTypes.Party;
  bank1: damlTypes.Party;
  bank2: damlTypes.Party;
  bank3: damlTypes.Party;
  csd: damlTypes.Party;
  issuer: damlTypes.Party;
  centralBank: damlTypes.Party;
  signatories: damlTypes.Party[];
};

export declare const MarketSetupSignatureCreator:
  damlTypes.Template<MarketSetupSignatureCreator, undefined, '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.MarketSetup.MarketSetup:MarketSetupSignatureCreator'> & {
  Archive: damlTypes.Choice<MarketSetupSignatureCreator, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
  MarketSetupSignatureCreator_SetupMarket: damlTypes.Choice<MarketSetupSignatureCreator, MarketSetupSignatureCreator_SetupMarket, MarketSetupData, undefined>;
  MarketSetupSignatureCreator_CreateSignature: damlTypes.Choice<MarketSetupSignatureCreator, MarketSetupSignatureCreator_CreateSignature, damlTypes.ContractId<MarketSetupSignature>, undefined>;
};

export declare namespace MarketSetupSignatureCreator {
  export type CreateEvent = damlLedger.CreateEvent<MarketSetupSignatureCreator, undefined, typeof MarketSetupSignatureCreator.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<MarketSetupSignatureCreator, typeof MarketSetupSignatureCreator.templateId>
  export type Event = damlLedger.Event<MarketSetupSignatureCreator, undefined, typeof MarketSetupSignatureCreator.templateId>
  export type QueryResult = damlLedger.QueryResult<MarketSetupSignatureCreator, undefined, typeof MarketSetupSignatureCreator.templateId>
}



export declare type MarketSetupSignature_UseSignature = {
  targetContractId: damlTypes.ContractId<MarketSetup>;
};

export declare const MarketSetupSignature_UseSignature:
  damlTypes.Serializable<MarketSetupSignature_UseSignature> & {
  }
;


export declare type MarketSetupSignature = {
  operator: damlTypes.Party;
  marketParticipant: damlTypes.Party;
};

export declare const MarketSetupSignature:
  damlTypes.Template<MarketSetupSignature, undefined, '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.MarketSetup.MarketSetup:MarketSetupSignature'> & {
  MarketSetupSignature_UseSignature: damlTypes.Choice<MarketSetupSignature, MarketSetupSignature_UseSignature, damlTypes.ContractId<MarketSetup>, undefined>;
  Archive: damlTypes.Choice<MarketSetupSignature, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
};

export declare namespace MarketSetupSignature {
  export type CreateEvent = damlLedger.CreateEvent<MarketSetupSignature, undefined, typeof MarketSetupSignature.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<MarketSetupSignature, typeof MarketSetupSignature.templateId>
  export type Event = damlLedger.Event<MarketSetupSignature, undefined, typeof MarketSetupSignature.templateId>
  export type QueryResult = damlLedger.QueryResult<MarketSetupSignature, undefined, typeof MarketSetupSignature.templateId>
}



export declare type MarketSetupData = {
  issuer: damlTypes.Party;
  issuerRole: damlTypes.ContractId<DA_RefApps_Bond_Roles_IssuerRole.IssuerRole>;
  csd: damlTypes.Party;
  auctionAgent: damlTypes.Party;
  bank1: damlTypes.Party;
  funIss: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetFungible>;
  settIss: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement>;
  settIssCash: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement>;
  cashBank1: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit>;
  funBank1Cash: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetFungible>;
  settBank1: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement>;
  settBank1Cash: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement>;
  lockBank1: damlTypes.ContractId<DA_RefApps_Bond_Lock.AssetLockRule>;
};

export declare const MarketSetupData:
  damlTypes.Serializable<MarketSetupData> & {
  }
;

