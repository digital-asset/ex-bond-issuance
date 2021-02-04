// Generated from DA/Finance/Fact/Instrument/Equity.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

import * as pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14 from '@daml.js/52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 from '@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662';

import * as DA_Finance_Types from '../../../../../DA/Finance/Types/module';

export declare type EquityStockSplit = {
  id: DA_Finance_Types.Id;
  exDate: damlTypes.Date;
  rFactor: damlTypes.Numeric;
  observers: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set<damlTypes.Party>;
};

export declare const EquityStockSplit:
  damlTypes.Template<EquityStockSplit, undefined, 'f2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc:DA.Finance.Fact.Instrument.Equity:EquityStockSplit'> & {
  Archive: damlTypes.Choice<EquityStockSplit, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
};

export declare namespace EquityStockSplit {
  export type CreateEvent = damlLedger.CreateEvent<EquityStockSplit, undefined, typeof EquityStockSplit.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<EquityStockSplit, typeof EquityStockSplit.templateId>
  export type Event = damlLedger.Event<EquityStockSplit, undefined, typeof EquityStockSplit.templateId>
  export type QueryResult = damlLedger.QueryResult<EquityStockSplit, undefined, typeof EquityStockSplit.templateId>
}



export declare type EquityCashDividend = {
  id: DA_Finance_Types.Id;
  exDate: damlTypes.Date;
  settlementDate: damlTypes.Date;
  perShare: DA_Finance_Types.Asset;
  observers: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set<damlTypes.Party>;
};

export declare const EquityCashDividend:
  damlTypes.Template<EquityCashDividend, undefined, 'f2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc:DA.Finance.Fact.Instrument.Equity:EquityCashDividend'> & {
  Archive: damlTypes.Choice<EquityCashDividend, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
};

export declare namespace EquityCashDividend {
  export type CreateEvent = damlLedger.CreateEvent<EquityCashDividend, undefined, typeof EquityCashDividend.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<EquityCashDividend, typeof EquityCashDividend.templateId>
  export type Event = damlLedger.Event<EquityCashDividend, undefined, typeof EquityCashDividend.templateId>
  export type QueryResult = damlLedger.QueryResult<EquityCashDividend, undefined, typeof EquityCashDividend.templateId>
}


