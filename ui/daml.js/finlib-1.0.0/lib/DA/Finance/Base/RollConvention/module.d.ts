// Generated from DA/Finance/Base/RollConvention.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

export declare type RollConventionEnum =
  |  { tag: 'EOM'; value: {} }
  |  { tag: 'DOM'; value: damlTypes.Int }
;

export declare const RollConventionEnum:
  damlTypes.Serializable<RollConventionEnum> & {
  }
;


export declare type PeriodEnum =
  | 'D'
  | 'M'
  | 'W'
  | 'Y'
;

export declare const PeriodEnum:
  damlTypes.Serializable<PeriodEnum> & {
  }
& { readonly keys: PeriodEnum[] } & { readonly [e in PeriodEnum]: e }
;


export declare type Period = {
  period: PeriodEnum;
  periodMultiplier: damlTypes.Int;
};

export declare const Period:
  damlTypes.Serializable<Period> & {
  }
;

