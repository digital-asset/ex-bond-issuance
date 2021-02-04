// Generated from DA/Finance/Rule/Asset.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

import * as pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14 from '@daml.js/52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 from '@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662';

import * as DA_Finance_Fact_Asset from '../../../../DA/Finance/Fact/Asset/module';
import * as DA_Finance_Types from '../../../../DA/Finance/Types/module';

export declare type AssetLifecycle_Process = {
  depositCid: damlTypes.ContractId<DA_Finance_Fact_Asset.AssetDeposit>;
  decompositionCid: damlTypes.ContractId<DA_Finance_Fact_Asset.AssetDecomposition>;
};

export declare const AssetLifecycle_Process:
  damlTypes.Serializable<AssetLifecycle_Process> & {
  }
;


export declare type AssetLifecycle = {
  account: DA_Finance_Types.Account;
  observers: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set<damlTypes.Party>;
};

export declare const AssetLifecycle:
  damlTypes.Template<AssetLifecycle, undefined, 'f2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc:DA.Finance.Rule.Asset:AssetLifecycle'> & {
  AssetLifecycle_Process: damlTypes.Choice<AssetLifecycle, AssetLifecycle_Process, damlTypes.ContractId<DA_Finance_Fact_Asset.AssetDeposit>[], undefined>;
  Archive: damlTypes.Choice<AssetLifecycle, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
};

export declare namespace AssetLifecycle {
  export type CreateEvent = damlLedger.CreateEvent<AssetLifecycle, undefined, typeof AssetLifecycle.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<AssetLifecycle, typeof AssetLifecycle.templateId>
  export type Event = damlLedger.Event<AssetLifecycle, undefined, typeof AssetLifecycle.templateId>
  export type QueryResult = damlLedger.QueryResult<AssetLifecycle, undefined, typeof AssetLifecycle.templateId>
}



export declare type AssetTransferAllocation_Archive = {
};

export declare const AssetTransferAllocation_Archive:
  damlTypes.Serializable<AssetTransferAllocation_Archive> & {
  }
;


export declare type AssetSettlementChain_Process = {
};

export declare const AssetSettlementChain_Process:
  damlTypes.Serializable<AssetSettlementChain_Process> & {
  }
;


export declare type AssetSettlementChain_AllocateNext = {
  depositCid: damlTypes.ContractId<DA_Finance_Fact_Asset.AssetDeposit>;
};

export declare const AssetSettlementChain_AllocateNext:
  damlTypes.Serializable<AssetSettlementChain_AllocateNext> & {
  }
;


export declare type AssetSettlementChain = {
  masterAgreement: DA_Finance_Types.MasterAgreement;
  tradeId: DA_Finance_Types.Id;
  asset: DA_Finance_Types.Asset;
  steps: AssetSettlementStep[];
  observers: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set<damlTypes.Party>;
};

export declare const AssetSettlementChain:
  damlTypes.Template<AssetSettlementChain, undefined, 'f2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc:DA.Finance.Rule.Asset:AssetSettlementChain'> & {
  AssetSettlementChain_AllocateNext: damlTypes.Choice<AssetSettlementChain, AssetSettlementChain_AllocateNext, damlTypes.ContractId<AssetSettlementChain>, undefined>;
  AssetTransferAllocation_Archive: damlTypes.Choice<AssetSettlementChain, AssetTransferAllocation_Archive, {}, undefined>;
  AssetSettlementChain_Process: damlTypes.Choice<AssetSettlementChain, AssetSettlementChain_Process, damlTypes.ContractId<DA_Finance_Fact_Asset.AssetDeposit>[], undefined>;
  Archive: damlTypes.Choice<AssetSettlementChain, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
};

export declare namespace AssetSettlementChain {
  export type CreateEvent = damlLedger.CreateEvent<AssetSettlementChain, undefined, typeof AssetSettlementChain.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<AssetSettlementChain, typeof AssetSettlementChain.templateId>
  export type Event = damlLedger.Event<AssetSettlementChain, undefined, typeof AssetSettlementChain.templateId>
  export type QueryResult = damlLedger.QueryResult<AssetSettlementChain, undefined, typeof AssetSettlementChain.templateId>
}



export declare type AssetSettlementStep = {
  sender: damlTypes.Party;
  receiver: damlTypes.Party;
  depositCid: damlTypes.Optional<damlTypes.ContractId<DA_Finance_Fact_Asset.AssetDeposit>>;
  creditSettlementCid: damlTypes.ContractId<AssetSettlement>;
  debitSettlementCid: damlTypes.ContractId<AssetSettlement>;
};

export declare const AssetSettlementStep:
  damlTypes.Serializable<AssetSettlementStep> & {
  }
;


export declare type AssetSettlement_Debit_Signatories = {
  asset: DA_Finance_Types.Asset;
};

export declare const AssetSettlement_Debit_Signatories:
  damlTypes.Serializable<AssetSettlement_Debit_Signatories> & {
  }
;


export declare type AssetSettlement_Debit = {
  asset: DA_Finance_Types.Asset;
};

export declare const AssetSettlement_Debit:
  damlTypes.Serializable<AssetSettlement_Debit> & {
  }
;


export declare type AssetSettlement_SetObservers = {
  newObservers: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set<damlTypes.Party>;
};

export declare const AssetSettlement_SetObservers:
  damlTypes.Serializable<AssetSettlement_SetObservers> & {
  }
;


export declare type AssetSettlement_Transfer = {
  receiver: damlTypes.Party;
  depositCid: damlTypes.ContractId<DA_Finance_Fact_Asset.AssetDeposit>;
  debitSettlementCid: damlTypes.ContractId<AssetSettlement>;
};

export declare const AssetSettlement_Transfer:
  damlTypes.Serializable<AssetSettlement_Transfer> & {
  }
;


export declare type AssetSettlement_Credit = {
  depositCid: damlTypes.ContractId<DA_Finance_Fact_Asset.AssetDeposit>;
};

export declare const AssetSettlement_Credit:
  damlTypes.Serializable<AssetSettlement_Credit> & {
  }
;


export declare type AssetSettlement = {
  account: DA_Finance_Types.Account;
  observers: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set<damlTypes.Party>;
};

export declare const AssetSettlement:
  damlTypes.Template<AssetSettlement, undefined, 'f2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc:DA.Finance.Rule.Asset:AssetSettlement'> & {
  AssetSettlement_Credit: damlTypes.Choice<AssetSettlement, AssetSettlement_Credit, DA_Finance_Types.Asset, undefined>;
  AssetSettlement_Transfer: damlTypes.Choice<AssetSettlement, AssetSettlement_Transfer, damlTypes.ContractId<DA_Finance_Fact_Asset.AssetDeposit>, undefined>;
  AssetSettlement_SetObservers: damlTypes.Choice<AssetSettlement, AssetSettlement_SetObservers, damlTypes.ContractId<AssetSettlement>, undefined>;
  AssetSettlement_Debit: damlTypes.Choice<AssetSettlement, AssetSettlement_Debit, damlTypes.ContractId<DA_Finance_Fact_Asset.AssetDeposit>, undefined>;
  AssetSettlement_Debit_Signatories: damlTypes.Choice<AssetSettlement, AssetSettlement_Debit_Signatories, damlTypes.ContractId<DA_Finance_Fact_Asset.AssetDeposit>, undefined>;
  Archive: damlTypes.Choice<AssetSettlement, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
};

export declare namespace AssetSettlement {
  export type CreateEvent = damlLedger.CreateEvent<AssetSettlement, undefined, typeof AssetSettlement.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<AssetSettlement, typeof AssetSettlement.templateId>
  export type Event = damlLedger.Event<AssetSettlement, undefined, typeof AssetSettlement.templateId>
  export type QueryResult = damlLedger.QueryResult<AssetSettlement, undefined, typeof AssetSettlement.templateId>
}



export declare type AssetFungible_Merge = {
  depositCids: damlTypes.ContractId<DA_Finance_Fact_Asset.AssetDeposit>[];
};

export declare const AssetFungible_Merge:
  damlTypes.Serializable<AssetFungible_Merge> & {
  }
;


export declare type AssetFungible_Split = {
  depositCid: damlTypes.ContractId<DA_Finance_Fact_Asset.AssetDeposit>;
  quantities: damlTypes.Numeric[];
};

export declare const AssetFungible_Split:
  damlTypes.Serializable<AssetFungible_Split> & {
  }
;


export declare type AssetFungible = {
  account: DA_Finance_Types.Account;
  observers: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set<damlTypes.Party>;
};

export declare const AssetFungible:
  damlTypes.Template<AssetFungible, undefined, 'f2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc:DA.Finance.Rule.Asset:AssetFungible'> & {
  AssetFungible_Split: damlTypes.Choice<AssetFungible, AssetFungible_Split, damlTypes.ContractId<DA_Finance_Fact_Asset.AssetDeposit>[], undefined>;
  AssetFungible_Merge: damlTypes.Choice<AssetFungible, AssetFungible_Merge, damlTypes.ContractId<DA_Finance_Fact_Asset.AssetDeposit>, undefined>;
  Archive: damlTypes.Choice<AssetFungible, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
};

export declare namespace AssetFungible {
  export type CreateEvent = damlLedger.CreateEvent<AssetFungible, undefined, typeof AssetFungible.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<AssetFungible, typeof AssetFungible.templateId>
  export type Event = damlLedger.Event<AssetFungible, undefined, typeof AssetFungible.templateId>
  export type QueryResult = damlLedger.QueryResult<AssetFungible, undefined, typeof AssetFungible.templateId>
}


