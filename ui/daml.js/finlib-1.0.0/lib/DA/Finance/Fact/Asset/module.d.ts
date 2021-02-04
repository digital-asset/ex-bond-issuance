// Generated from DA/Finance/Fact/Asset.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

import * as pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14 from '@daml.js/52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 from '@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662';

import * as DA_Finance_Types from '../../../../DA/Finance/Types/module';

export declare type AssetDecomposition = {
  id: DA_Finance_Types.Id;
  factors: DA_Finance_Types.Asset[];
  observers: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set<damlTypes.Party>;
};

export declare const AssetDecomposition:
  damlTypes.Template<AssetDecomposition, undefined, 'f2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc:DA.Finance.Fact.Asset:AssetDecomposition'> & {
  Archive: damlTypes.Choice<AssetDecomposition, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
};

export declare namespace AssetDecomposition {
  export type CreateEvent = damlLedger.CreateEvent<AssetDecomposition, undefined, typeof AssetDecomposition.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<AssetDecomposition, typeof AssetDecomposition.templateId>
  export type Event = damlLedger.Event<AssetDecomposition, undefined, typeof AssetDecomposition.templateId>
  export type QueryResult = damlLedger.QueryResult<AssetDecomposition, undefined, typeof AssetDecomposition.templateId>
}



export declare type AssetDeposit_SetObservers = {
  newObservers: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set<damlTypes.Party>;
};

export declare const AssetDeposit_SetObservers:
  damlTypes.Serializable<AssetDeposit_SetObservers> & {
  }
;


export declare type AssetDeposit = {
  account: DA_Finance_Types.Account;
  asset: DA_Finance_Types.Asset;
  observers: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set<damlTypes.Party>;
};

export declare const AssetDeposit:
  damlTypes.Template<AssetDeposit, undefined, 'f2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc:DA.Finance.Fact.Asset:AssetDeposit'> & {
  Archive: damlTypes.Choice<AssetDeposit, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
  AssetDeposit_SetObservers: damlTypes.Choice<AssetDeposit, AssetDeposit_SetObservers, damlTypes.ContractId<AssetDeposit>, undefined>;
};

export declare namespace AssetDeposit {
  export type CreateEvent = damlLedger.CreateEvent<AssetDeposit, undefined, typeof AssetDeposit.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<AssetDeposit, typeof AssetDeposit.templateId>
  export type Event = damlLedger.Event<AssetDeposit, undefined, typeof AssetDeposit.templateId>
  export type QueryResult = damlLedger.QueryResult<AssetDeposit, undefined, typeof AssetDeposit.templateId>
}


