// Generated from DA/Finance/Rule/Instrument/Entitlement.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

import * as pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14 from '@daml.js/52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 from '@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662';

import * as DA_Finance_Fact_Asset from '../../../../../DA/Finance/Fact/Asset/module';
import * as DA_Finance_Fact_Instrument_Entitlement from '../../../../../DA/Finance/Fact/Instrument/Entitlement/module';

export declare type EntitlementLifecycle_Process = {
  entitlementCid: damlTypes.ContractId<DA_Finance_Fact_Instrument_Entitlement.Entitlement>;
};

export declare const EntitlementLifecycle_Process:
  damlTypes.Serializable<EntitlementLifecycle_Process> & {
  }
;


export declare type EntitlementLifecycle = {
  signatories: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set<damlTypes.Party>;
  observers: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set<damlTypes.Party>;
};

export declare const EntitlementLifecycle:
  damlTypes.Template<EntitlementLifecycle, undefined, 'f2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc:DA.Finance.Rule.Instrument.Entitlement:EntitlementLifecycle'> & {
  Archive: damlTypes.Choice<EntitlementLifecycle, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
  EntitlementLifecycle_Process: damlTypes.Choice<EntitlementLifecycle, EntitlementLifecycle_Process, damlTypes.ContractId<DA_Finance_Fact_Asset.AssetDecomposition>, undefined>;
};

export declare namespace EntitlementLifecycle {
  export type CreateEvent = damlLedger.CreateEvent<EntitlementLifecycle, undefined, typeof EntitlementLifecycle.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<EntitlementLifecycle, typeof EntitlementLifecycle.templateId>
  export type Event = damlLedger.Event<EntitlementLifecycle, undefined, typeof EntitlementLifecycle.templateId>
  export type QueryResult = damlLedger.QueryResult<EntitlementLifecycle, undefined, typeof EntitlementLifecycle.templateId>
}


