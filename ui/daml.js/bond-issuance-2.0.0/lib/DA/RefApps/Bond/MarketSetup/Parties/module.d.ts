// Generated from DA/RefApps/Bond/MarketSetup/Parties.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

export declare type BondIssuanceParties = {
  auctionAgent: damlTypes.Party;
  csd: damlTypes.Party;
  bank1: damlTypes.Party;
  bank2: damlTypes.Party;
  bank3: damlTypes.Party;
  issuer: damlTypes.Party;
  centralBank: damlTypes.Party;
  regulator: damlTypes.Party;
  operator: damlTypes.Party;
};

export declare const BondIssuanceParties:
  damlTypes.Serializable<BondIssuanceParties> & {
  }
;

