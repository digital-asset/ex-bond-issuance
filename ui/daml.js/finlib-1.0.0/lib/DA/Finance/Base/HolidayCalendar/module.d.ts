// Generated from DA/Finance/Base/HolidayCalendar.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

import * as pkgbfcd37bd6b84768e86e432f5f6c33e25d9e7724a9d42e33875ff74f6348e733f from '@daml.js/bfcd37bd6b84768e86e432f5f6c33e25d9e7724a9d42e33875ff74f6348e733f';

export declare type BusinessDayAdjustment = {
  calendarIds: string[];
  convention: BusinessDayConventionEnum;
};

export declare const BusinessDayAdjustment:
  damlTypes.Serializable<BusinessDayAdjustment> & {
  }
;


export declare type BusinessDayConventionEnum =
  | 'FOLLOWING'
  | 'MODFOLLOWING'
  | 'MODPRECEDING'
  | 'NONE'
  | 'PRECEDING'
;

export declare const BusinessDayConventionEnum:
  damlTypes.Serializable<BusinessDayConventionEnum> & {
  }
& { readonly keys: BusinessDayConventionEnum[] } & { readonly [e in BusinessDayConventionEnum]: e }
;


export declare type HolidayCalendarData = {
  id: string;
  weekend: pkgbfcd37bd6b84768e86e432f5f6c33e25d9e7724a9d42e33875ff74f6348e733f.DA.Date.Types.DayOfWeek[];
  holidays: damlTypes.Date[];
};

export declare const HolidayCalendarData:
  damlTypes.Serializable<HolidayCalendarData> & {
  }
;

