// Generated from Test/Finance/Helpers.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

import * as pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14 from '@daml.js/52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 from '@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662';

import * as DA_Finance_Fact_Trade_Dvp from '../../../DA/Finance/Fact/Trade/Dvp/module';
import * as DA_Finance_Rule_Asset from '../../../DA/Finance/Rule/Asset/module';
import * as DA_Finance_Types from '../../../DA/Finance/Types/module';

export declare type DvpInstruction_Process2 = {
  param: DvpInstruction_Process_Param;
};

export declare const DvpInstruction_Process2:
  damlTypes.Serializable<DvpInstruction_Process2> & {
  }
;


export declare type DvpInstruction_Process1 = {
  param: DvpInstruction_Process_Param;
};

export declare const DvpInstruction_Process1:
  damlTypes.Serializable<DvpInstruction_Process1> & {
  }
;


export declare type DvpInstruction = {
  masterAgreement: DA_Finance_Types.MasterAgreement;
  observers: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set<damlTypes.Party>;
};

export declare const DvpInstruction:
  damlTypes.Template<DvpInstruction, undefined, 'f2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc:Test.Finance.Helpers:DvpInstruction'> & {
  Archive: damlTypes.Choice<DvpInstruction, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
  DvpInstruction_Process2: damlTypes.Choice<DvpInstruction, DvpInstruction_Process2, DvpInstruction_Process_Result, undefined>;
  DvpInstruction_Process1: damlTypes.Choice<DvpInstruction, DvpInstruction_Process1, DvpInstruction_Process_Result, undefined>;
};

export declare namespace DvpInstruction {
  export type CreateEvent = damlLedger.CreateEvent<DvpInstruction, undefined, typeof DvpInstruction.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<DvpInstruction, typeof DvpInstruction.templateId>
  export type Event = damlLedger.Event<DvpInstruction, undefined, typeof DvpInstruction.templateId>
  export type QueryResult = damlLedger.QueryResult<DvpInstruction, undefined, typeof DvpInstruction.templateId>
}



export declare type DvpInstruction_Process_Result = {
  dvpCid: damlTypes.ContractId<DA_Finance_Fact_Trade_Dvp.Dvp>;
  paymentChainCids: damlTypes.ContractId<DA_Finance_Rule_Asset.AssetSettlementChain>[];
  deliveryChainCids: damlTypes.ContractId<DA_Finance_Rule_Asset.AssetSettlementChain>[];
};

export declare const DvpInstruction_Process_Result:
  damlTypes.Serializable<DvpInstruction_Process_Result> & {
  }
;


export declare type DvpInstruction_Process_Param = {
  dvpCid: damlTypes.ContractId<DA_Finance_Fact_Trade_Dvp.Dvp>;
  paymentSteps: DA_Finance_Rule_Asset.AssetSettlementStep[][];
  deliverySteps: DA_Finance_Rule_Asset.AssetSettlementStep[][];
};

export declare const DvpInstruction_Process_Param:
  damlTypes.Serializable<DvpInstruction_Process_Param> & {
  }
;

