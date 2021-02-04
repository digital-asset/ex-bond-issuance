// Generated from Daml/Script.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

export declare type LedgerValue = {
};

export declare const LedgerValue:
  damlTypes.Serializable<LedgerValue> & {
  }
;


export declare type SubmitFailure = {
  status: damlTypes.Int;
  description: string;
};

export declare const SubmitFailure:
  damlTypes.Serializable<SubmitFailure> & {
  }
;


export declare type PartyDetails = {
  party: damlTypes.Party;
  displayName: damlTypes.Optional<string>;
  isLocal: boolean;
};

export declare const PartyDetails:
  damlTypes.Serializable<PartyDetails> & {
  }
;


export declare type ParticipantName = {
  participantName: string;
};

export declare const ParticipantName:
  damlTypes.Serializable<ParticipantName> & {
  }
;


export declare type PartyIdHint = {
  partyIdHint: string;
};

export declare const PartyIdHint:
  damlTypes.Serializable<PartyIdHint> & {
  }
;

