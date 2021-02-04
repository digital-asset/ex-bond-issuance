// Generated from DA/Generics.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

export declare type DecidedStrictness =
  | 'DecidedLazy'
  | 'DecidedStrict'
  | 'DecidedUnpack'
;

export declare const DecidedStrictness:
  damlTypes.Serializable<DecidedStrictness> & {
  }
& { readonly keys: DecidedStrictness[] } & { readonly [e in DecidedStrictness]: e }
;


export declare type SourceStrictness =
  | 'NoSourceStrictness'
  | 'SourceLazy'
  | 'SourceStrict'
;

export declare const SourceStrictness:
  damlTypes.Serializable<SourceStrictness> & {
  }
& { readonly keys: SourceStrictness[] } & { readonly [e in SourceStrictness]: e }
;


export declare type SourceUnpackedness =
  | 'NoSourceUnpackedness'
  | 'SourceNoUnpack'
  | 'SourceUnpack'
;

export declare const SourceUnpackedness:
  damlTypes.Serializable<SourceUnpackedness> & {
  }
& { readonly keys: SourceUnpackedness[] } & { readonly [e in SourceUnpackedness]: e }
;


export declare type Associativity =
  | 'LeftAssociative'
  | 'RightAssociative'
  | 'NotAssociative'
;

export declare const Associativity:
  damlTypes.Serializable<Associativity> & {
  }
& { readonly keys: Associativity[] } & { readonly [e in Associativity]: e }
;


export declare type Infix0 = {
  associativity: Associativity;
  fixity: damlTypes.Int;
};

export declare const Infix0:
  damlTypes.Serializable<Infix0> & {
  }
;


export declare type Fixity =
  |  { tag: 'Prefix'; value: {} }
  |  { tag: 'Infix'; value: Infix0 }
;

export declare const Fixity:
  damlTypes.Serializable<Fixity> & {
  }
;


export declare type K1<i, c, p> = {
  unK1: c;
};

export declare const K1 :
  (<i, c, p>(i: damlTypes.Serializable<i>, c: damlTypes.Serializable<c>, p: damlTypes.Serializable<p>) => damlTypes.Serializable<K1<i, c, p>>) & {
};


export declare type Par1<p> = {
  unPar1: p;
};

export declare const Par1 :
  (<p>(p: damlTypes.Serializable<p>) => damlTypes.Serializable<Par1<p>>) & {
};


export declare type U1<p> = {
};

export declare const U1 :
  (<p>(p: damlTypes.Serializable<p>) => damlTypes.Serializable<U1<p>>) & {
};

