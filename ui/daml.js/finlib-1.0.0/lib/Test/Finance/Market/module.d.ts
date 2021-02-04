// Generated from Test/Finance/Market.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

import * as pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14 from '@daml.js/52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 from '@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662';

import * as DA_Finance_Fact_Asset from '../../../DA/Finance/Fact/Asset/module';
import * as DA_Finance_Fact_Trade_Dvp from '../../../DA/Finance/Fact/Trade/Dvp/module';
import * as DA_Finance_Rule_Asset from '../../../DA/Finance/Rule/Asset/module';
import * as DA_Finance_Rule_Instrument_Entitlement from '../../../DA/Finance/Rule/Instrument/Entitlement/module';
import * as DA_Finance_Rule_Instrument_Equity from '../../../DA/Finance/Rule/Instrument/Equity/module';
import * as DA_Finance_Rule_Trade_Dvp from '../../../DA/Finance/Rule/Trade/Dvp/module';
import * as Test_Finance_Helpers from '../../../Test/Finance/Helpers/module';

export declare type MarketSetup_Process = {
};

export declare const MarketSetup_Process:
  damlTypes.Serializable<MarketSetup_Process> & {
  }
;


export declare type MarketSetup_Sign = {
};

export declare const MarketSetup_Sign:
  damlTypes.Serializable<MarketSetup_Sign> & {
  }
;


export declare type MarketSetup = {
  signatories: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set<damlTypes.Party>;
  partyMap: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Map.Map<string, damlTypes.Party>;
  trustModel: MarketTrustModel;
};

export declare const MarketSetup:
  damlTypes.Template<MarketSetup, undefined, 'f2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc:Test.Finance.Market:MarketSetup'> & {
  Archive: damlTypes.Choice<MarketSetup, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
  MarketSetup_Process: damlTypes.Choice<MarketSetup, MarketSetup_Process, MarketSetup_Process_Result, undefined>;
  MarketSetup_Sign: damlTypes.Choice<MarketSetup, MarketSetup_Sign, damlTypes.ContractId<MarketSetup>, undefined>;
};

export declare namespace MarketSetup {
  export type CreateEvent = damlLedger.CreateEvent<MarketSetup, undefined, typeof MarketSetup.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<MarketSetup, typeof MarketSetup.templateId>
  export type Event = damlLedger.Event<MarketSetup, undefined, typeof MarketSetup.templateId>
  export type QueryResult = damlLedger.QueryResult<MarketSetup, undefined, typeof MarketSetup.templateId>
}



export declare type MarketSetup_Process_Result = {
  partyMap: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Map.Map<string, damlTypes.Party>;
  assetFungibleMap: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Map.Map<string, damlTypes.ContractId<DA_Finance_Rule_Asset.AssetFungible>>;
  assetSettlementMap: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Map.Map<string, damlTypes.ContractId<DA_Finance_Rule_Asset.AssetSettlement>>;
  assetLifecycleMap: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Map.Map<string, damlTypes.ContractId<DA_Finance_Rule_Asset.AssetLifecycle>>;
  assetDepositMap: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Map.Map<string, damlTypes.ContractId<DA_Finance_Fact_Asset.AssetDeposit>>;
  dvpInstructionMap: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Map.Map<string, damlTypes.ContractId<Test_Finance_Helpers.DvpInstruction>>;
  dvpSettlementMap: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Map.Map<string, damlTypes.ContractId<DA_Finance_Rule_Trade_Dvp.DvpSettlement>>;
  dvpLifecycleMap: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Map.Map<string, damlTypes.ContractId<DA_Finance_Rule_Trade_Dvp.DvpLifecycle>>;
  dvpMap: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Map.Map<string, damlTypes.ContractId<DA_Finance_Fact_Trade_Dvp.Dvp>>;
  equityCashDividendLifecycleMap: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Map.Map<string, damlTypes.ContractId<DA_Finance_Rule_Instrument_Equity.EquityCashDividendLifecycle>>;
  equityStockSplitLifecycleMap: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Map.Map<string, damlTypes.ContractId<DA_Finance_Rule_Instrument_Equity.EquityStockSplitLifecycle>>;
  entitlementLifecycleMap: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Map.Map<string, damlTypes.ContractId<DA_Finance_Rule_Instrument_Entitlement.EntitlementLifecycle>>;
};

export declare const MarketSetup_Process_Result:
  damlTypes.Serializable<MarketSetup_Process_Result> & {
  }
;


export declare type MarketTrustModel = {
  account: TrustModel;
  masterAgreement: TrustModel;
};

export declare const MarketTrustModel:
  damlTypes.Serializable<MarketTrustModel> & {
  }
;


export declare type TrustModel =
  | 'TrustModel_Bilateral'
  | 'TrustModel_Unilateral'
  | 'TrustModel_Agent'
;

export declare const TrustModel:
  damlTypes.Serializable<TrustModel> & {
  }
& { readonly keys: TrustModel[] } & { readonly [e in TrustModel]: e }
;

