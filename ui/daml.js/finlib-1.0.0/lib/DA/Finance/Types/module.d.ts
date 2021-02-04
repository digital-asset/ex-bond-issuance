// Generated from DA/Finance/Types.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

import * as pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14 from '@daml.js/52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14';

export declare type SettlementStatus =
  | 'SettlementStatus_Pending'
  | 'SettlementStatus_Instructed'
  | 'SettlementStatus_Settled'
;

export declare const SettlementStatus:
  damlTypes.Serializable<SettlementStatus> & {
  }
& { readonly keys: SettlementStatus[] } & { readonly [e in SettlementStatus]: e }
;


export declare type Asset = {
  id: Id;
  quantity: damlTypes.Numeric;
};

export declare const Asset:
  damlTypes.Serializable<Asset> & {
  }
;


export declare type MasterAgreement = {
  id: Id;
  party1: damlTypes.Party;
  party2: damlTypes.Party;
};

export declare const MasterAgreement:
  damlTypes.Serializable<MasterAgreement> & {
  }
;


export declare type Account = {
  id: Id;
  provider: damlTypes.Party;
  owner: damlTypes.Party;
};

export declare const Account:
  damlTypes.Serializable<Account> & {
  }
;


export declare type Id = {
  signatories: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set<damlTypes.Party>;
  label: string;
  version: damlTypes.Int;
};

export declare const Id:
  damlTypes.Serializable<Id> & {
  }
;

