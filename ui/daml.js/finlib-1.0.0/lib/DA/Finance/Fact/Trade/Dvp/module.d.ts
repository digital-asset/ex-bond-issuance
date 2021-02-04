// Generated from DA/Finance/Fact/Trade/Dvp.daml
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

export declare type Dvp = {
  masterAgreement: DA_Finance_Types.MasterAgreement;
  tradeId: DA_Finance_Types.Id;
  buyer: damlTypes.Party;
  status: DA_Finance_Types.SettlementStatus;
  settlementDate: damlTypes.Optional<damlTypes.Date>;
  payments: DA_Finance_Types.Asset[];
  deliveries: DA_Finance_Types.Asset[];
  observers: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set<damlTypes.Party>;
};

export declare const Dvp:
  damlTypes.Template<Dvp, undefined, 'f2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc:DA.Finance.Fact.Trade.Dvp:Dvp'> & {
  Archive: damlTypes.Choice<Dvp, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
};

export declare namespace Dvp {
  export type CreateEvent = damlLedger.CreateEvent<Dvp, undefined, typeof Dvp.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<Dvp, typeof Dvp.templateId>
  export type Event = damlLedger.Event<Dvp, undefined, typeof Dvp.templateId>
  export type QueryResult = damlLedger.QueryResult<Dvp, undefined, typeof Dvp.templateId>
}


