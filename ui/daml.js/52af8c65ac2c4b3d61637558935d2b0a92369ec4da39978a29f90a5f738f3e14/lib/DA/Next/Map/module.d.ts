// Generated from DA/Next/Map.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

export declare type Map<k, v> = {
  textMap: { [key: string]: v };
};

export declare const Map :
  (<k, v>(k: damlTypes.Serializable<k>, v: damlTypes.Serializable<v>) => damlTypes.Serializable<Map<k, v>>) & {
};

