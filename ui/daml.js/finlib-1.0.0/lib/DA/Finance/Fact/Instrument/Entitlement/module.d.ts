// Generated from DA/Finance/Fact/Instrument/Entitlement.daml
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

export declare type Entitlement = {
  id: DA_Finance_Types.Id;
  settlementDate: damlTypes.Date;
  underlyingId: DA_Finance_Types.Id;
  observers: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set<damlTypes.Party>;
};

export declare const Entitlement:
  damlTypes.Template<Entitlement, undefined, 'f2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc:DA.Finance.Fact.Instrument.Entitlement:Entitlement'> & {
  Archive: damlTypes.Choice<Entitlement, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
};

export declare namespace Entitlement {
  export type CreateEvent = damlLedger.CreateEvent<Entitlement, undefined, typeof Entitlement.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<Entitlement, typeof Entitlement.templateId>
  export type Event = damlLedger.Event<Entitlement, undefined, typeof Entitlement.templateId>
  export type QueryResult = damlLedger.QueryResult<Entitlement, undefined, typeof Entitlement.templateId>
}


