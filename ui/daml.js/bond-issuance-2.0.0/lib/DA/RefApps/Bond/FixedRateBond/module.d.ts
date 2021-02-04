// Generated from DA/RefApps/Bond/FixedRateBond.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 from '@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662';
import * as pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc from '@daml.js/finlib-1.0.0';

export declare type FixedRateBondFact = {
  provider: damlTypes.Party;
  instrumentId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id;
  observers: damlTypes.Party[];
  isin: string;
  cashAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id;
  denomination: damlTypes.Numeric;
  rate: damlTypes.Numeric;
  paymentLag: damlTypes.Int;
  couponDates: damlTypes.Date[];
  couponDatesTriggered: damlTypes.Date[];
  issueDate: damlTypes.Date;
  maturityDate: damlTypes.Date;
};

export declare const FixedRateBondFact:
  damlTypes.Template<FixedRateBondFact, undefined, '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.FixedRateBond:FixedRateBondFact'> & {
  Archive: damlTypes.Choice<FixedRateBondFact, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
};

export declare namespace FixedRateBondFact {
  export type CreateEvent = damlLedger.CreateEvent<FixedRateBondFact, undefined, typeof FixedRateBondFact.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<FixedRateBondFact, typeof FixedRateBondFact.templateId>
  export type Event = damlLedger.Event<FixedRateBondFact, undefined, typeof FixedRateBondFact.templateId>
  export type QueryResult = damlLedger.QueryResult<FixedRateBondFact, undefined, typeof FixedRateBondFact.templateId>
}


