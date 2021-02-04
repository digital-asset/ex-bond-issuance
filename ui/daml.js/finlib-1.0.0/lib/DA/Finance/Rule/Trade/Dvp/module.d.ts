// Generated from DA/Finance/Rule/Trade/Dvp.daml
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
import * as DA_Finance_Fact_Trade_Dvp from '../../../../../DA/Finance/Fact/Trade/Dvp/module';
import * as DA_Finance_Rule_Asset from '../../../../../DA/Finance/Rule/Asset/module';
import * as DA_Finance_Types from '../../../../../DA/Finance/Types/module';

export declare type DvpLifecycle_Process2 = {
  param: DvpLifecycle_Process_Param;
};

export declare const DvpLifecycle_Process2:
  damlTypes.Serializable<DvpLifecycle_Process2> & {
  }
;


export declare type DvpLifecycle_Process1 = {
  param: DvpLifecycle_Process_Param;
};

export declare const DvpLifecycle_Process1:
  damlTypes.Serializable<DvpLifecycle_Process1> & {
  }
;


export declare type DvpLifecycle = {
  masterAgreement: DA_Finance_Types.MasterAgreement;
  observers: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set<damlTypes.Party>;
};

export declare const DvpLifecycle:
  damlTypes.Template<DvpLifecycle, undefined, 'f2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc:DA.Finance.Rule.Trade.Dvp:DvpLifecycle'> & {
  Archive: damlTypes.Choice<DvpLifecycle, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
  DvpLifecycle_Process2: damlTypes.Choice<DvpLifecycle, DvpLifecycle_Process2, damlTypes.ContractId<DA_Finance_Fact_Trade_Dvp.Dvp>, undefined>;
  DvpLifecycle_Process1: damlTypes.Choice<DvpLifecycle, DvpLifecycle_Process1, damlTypes.ContractId<DA_Finance_Fact_Trade_Dvp.Dvp>, undefined>;
};

export declare namespace DvpLifecycle {
  export type CreateEvent = damlLedger.CreateEvent<DvpLifecycle, undefined, typeof DvpLifecycle.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<DvpLifecycle, typeof DvpLifecycle.templateId>
  export type Event = damlLedger.Event<DvpLifecycle, undefined, typeof DvpLifecycle.templateId>
  export type QueryResult = damlLedger.QueryResult<DvpLifecycle, undefined, typeof DvpLifecycle.templateId>
}



export declare type DvpLifecycle_Process_Param = {
  dvpCid: damlTypes.ContractId<DA_Finance_Fact_Trade_Dvp.Dvp>;
  decompositionCid: damlTypes.ContractId<DA_Finance_Fact_Asset.AssetDecomposition>;
};

export declare const DvpLifecycle_Process_Param:
  damlTypes.Serializable<DvpLifecycle_Process_Param> & {
  }
;


export declare type DvpSettlement_Process2 = {
  param: DvpSettlement_Process_Param;
};

export declare const DvpSettlement_Process2:
  damlTypes.Serializable<DvpSettlement_Process2> & {
  }
;


export declare type DvpSettlement_Process1 = {
  param: DvpSettlement_Process_Param;
};

export declare const DvpSettlement_Process1:
  damlTypes.Serializable<DvpSettlement_Process1> & {
  }
;


export declare type DvpSettlement = {
  masterAgreement: DA_Finance_Types.MasterAgreement;
  observers: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set<damlTypes.Party>;
};

export declare const DvpSettlement:
  damlTypes.Template<DvpSettlement, undefined, 'f2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc:DA.Finance.Rule.Trade.Dvp:DvpSettlement'> & {
  Archive: damlTypes.Choice<DvpSettlement, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
  DvpSettlement_Process2: damlTypes.Choice<DvpSettlement, DvpSettlement_Process2, DvpSettlement_Process_Result, undefined>;
  DvpSettlement_Process1: damlTypes.Choice<DvpSettlement, DvpSettlement_Process1, DvpSettlement_Process_Result, undefined>;
};

export declare namespace DvpSettlement {
  export type CreateEvent = damlLedger.CreateEvent<DvpSettlement, undefined, typeof DvpSettlement.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<DvpSettlement, typeof DvpSettlement.templateId>
  export type Event = damlLedger.Event<DvpSettlement, undefined, typeof DvpSettlement.templateId>
  export type QueryResult = damlLedger.QueryResult<DvpSettlement, undefined, typeof DvpSettlement.templateId>
}



export declare type DvpSettlement_Process_Result = {
  dvpCid: damlTypes.ContractId<DA_Finance_Fact_Trade_Dvp.Dvp>;
  paymentDepositCids: damlTypes.ContractId<DA_Finance_Fact_Asset.AssetDeposit>[][];
  deliveryDepositCids: damlTypes.ContractId<DA_Finance_Fact_Asset.AssetDeposit>[][];
};

export declare const DvpSettlement_Process_Result:
  damlTypes.Serializable<DvpSettlement_Process_Result> & {
  }
;


export declare type DvpSettlement_Process_Param = {
  dvpCid: damlTypes.ContractId<DA_Finance_Fact_Trade_Dvp.Dvp>;
  paymentChainCids: damlTypes.ContractId<DA_Finance_Rule_Asset.AssetSettlementChain>[];
  deliveryChainCids: damlTypes.ContractId<DA_Finance_Rule_Asset.AssetSettlementChain>[];
};

export declare const DvpSettlement_Process_Param:
  damlTypes.Serializable<DvpSettlement_Process_Param> & {
  }
;

