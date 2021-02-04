// Generated from DA/Finance/Rule/Instrument/Equity.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

import * as pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14 from '@daml.js/52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 from '@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662';

import * as DA_Finance_Fact_Asset from '../../../../../DA/Finance/Fact/Asset/module';
import * as DA_Finance_Fact_Instrument_Entitlement from '../../../../../DA/Finance/Fact/Instrument/Entitlement/module';
import * as DA_Finance_Fact_Instrument_Equity from '../../../../../DA/Finance/Fact/Instrument/Equity/module';

export declare type EquityStockSplitLifecycle_Process = {
  stockSplitCid: damlTypes.ContractId<DA_Finance_Fact_Instrument_Equity.EquityStockSplit>;
};

export declare const EquityStockSplitLifecycle_Process:
  damlTypes.Serializable<EquityStockSplitLifecycle_Process> & {
  }
;


export declare type EquityStockSplitLifecycle = {
  signatories: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set<damlTypes.Party>;
  observers: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set<damlTypes.Party>;
};

export declare const EquityStockSplitLifecycle:
  damlTypes.Template<EquityStockSplitLifecycle, undefined, 'f2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc:DA.Finance.Rule.Instrument.Equity:EquityStockSplitLifecycle'> & {
  Archive: damlTypes.Choice<EquityStockSplitLifecycle, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
  EquityStockSplitLifecycle_Process: damlTypes.Choice<EquityStockSplitLifecycle, EquityStockSplitLifecycle_Process, damlTypes.ContractId<DA_Finance_Fact_Asset.AssetDecomposition>, undefined>;
};

export declare namespace EquityStockSplitLifecycle {
  export type CreateEvent = damlLedger.CreateEvent<EquityStockSplitLifecycle, undefined, typeof EquityStockSplitLifecycle.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<EquityStockSplitLifecycle, typeof EquityStockSplitLifecycle.templateId>
  export type Event = damlLedger.Event<EquityStockSplitLifecycle, undefined, typeof EquityStockSplitLifecycle.templateId>
  export type QueryResult = damlLedger.QueryResult<EquityStockSplitLifecycle, undefined, typeof EquityStockSplitLifecycle.templateId>
}



export declare type EquityCashDividendLifecycle_Process = {
  dividendCid: damlTypes.ContractId<DA_Finance_Fact_Instrument_Equity.EquityCashDividend>;
  entitlementIdLabel: string;
};

export declare const EquityCashDividendLifecycle_Process:
  damlTypes.Serializable<EquityCashDividendLifecycle_Process> & {
  }
;


export declare type EquityCashDividendLifecycle = {
  signatories: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set<damlTypes.Party>;
  observers: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set<damlTypes.Party>;
};

export declare const EquityCashDividendLifecycle:
  damlTypes.Template<EquityCashDividendLifecycle, undefined, 'f2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc:DA.Finance.Rule.Instrument.Equity:EquityCashDividendLifecycle'> & {
  EquityCashDividendLifecycle_Process: damlTypes.Choice<EquityCashDividendLifecycle, EquityCashDividendLifecycle_Process, EquityCashDividendLifecycle_Process_Result, undefined>;
  Archive: damlTypes.Choice<EquityCashDividendLifecycle, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
};

export declare namespace EquityCashDividendLifecycle {
  export type CreateEvent = damlLedger.CreateEvent<EquityCashDividendLifecycle, undefined, typeof EquityCashDividendLifecycle.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<EquityCashDividendLifecycle, typeof EquityCashDividendLifecycle.templateId>
  export type Event = damlLedger.Event<EquityCashDividendLifecycle, undefined, typeof EquityCashDividendLifecycle.templateId>
  export type QueryResult = damlLedger.QueryResult<EquityCashDividendLifecycle, undefined, typeof EquityCashDividendLifecycle.templateId>
}



export declare type EquityCashDividendLifecycle_Process_Result = {
  entitlementCid: damlTypes.ContractId<DA_Finance_Fact_Instrument_Entitlement.Entitlement>;
  decompositionCid: damlTypes.ContractId<DA_Finance_Fact_Asset.AssetDecomposition>;
};

export declare const EquityCashDividendLifecycle_Process_Result:
  damlTypes.Serializable<EquityCashDividendLifecycle_Process_Result> & {
  }
;

