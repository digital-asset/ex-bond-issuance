// Generated from DA/Finance/Base/Schedule.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

import * as DA_Finance_Base_HolidayCalendar from '../../../../DA/Finance/Base/HolidayCalendar/module';
import * as DA_Finance_Base_RollConvention from '../../../../DA/Finance/Base/RollConvention/module';

export declare type SchedulePeriod = {
  adjustedEndDate: damlTypes.Date;
  adjustedStartDate: damlTypes.Date;
  unadjustedEndDate: damlTypes.Date;
  unadjustedStartDate: damlTypes.Date;
};

export declare const SchedulePeriod:
  damlTypes.Serializable<SchedulePeriod> & {
  }
;


export declare type PeriodicSchedule = {
  effectiveDate: damlTypes.Date;
  terminationDate: damlTypes.Date;
  firstRegularPeriodStartDate: damlTypes.Optional<damlTypes.Date>;
  lastRegularPeriodEndDate: damlTypes.Optional<damlTypes.Date>;
  frequency: Frequency;
  businessDayAdjustment: DA_Finance_Base_HolidayCalendar.BusinessDayAdjustment;
  effectiveDateBusinessDayAdjustment: damlTypes.Optional<DA_Finance_Base_HolidayCalendar.BusinessDayAdjustment>;
  terminationDateBusinessDayAdjustment: damlTypes.Optional<DA_Finance_Base_HolidayCalendar.BusinessDayAdjustment>;
  stubPeriodType: damlTypes.Optional<StubPeriodTypeEnum>;
};

export declare const PeriodicSchedule:
  damlTypes.Serializable<PeriodicSchedule> & {
  }
;


export declare type Frequency = {
  period: DA_Finance_Base_RollConvention.PeriodEnum;
  periodMultiplier: damlTypes.Int;
  rollConvention: DA_Finance_Base_RollConvention.RollConventionEnum;
};

export declare const Frequency:
  damlTypes.Serializable<Frequency> & {
  }
;


export declare type StubPeriodTypeEnum =
  | 'LONG_FINAL'
  | 'LONG_INITIAL'
  | 'SHORT_FINAL'
  | 'SHORT_INITIAL'
;

export declare const StubPeriodTypeEnum:
  damlTypes.Serializable<StubPeriodTypeEnum> & {
  }
& { readonly keys: StubPeriodTypeEnum[] } & { readonly [e in StubPeriodTypeEnum]: e }
;

