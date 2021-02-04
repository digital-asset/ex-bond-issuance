"use strict";
/* eslint-disable-next-line no-unused-vars */
function __export(m) {
/* eslint-disable-next-line no-prototype-builtins */
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable-next-line no-unused-vars */
var jtv = require('@mojotech/json-type-validation');
/* eslint-disable-next-line no-unused-vars */
var damlTypes = require('@daml/types');
/* eslint-disable-next-line no-unused-vars */
var damlLedger = require('@daml/ledger');

var pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14 = require('@daml.js/52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14');
var pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 = require('@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662');

var DA_Finance_Fact_Asset = require('../../../../DA/Finance/Fact/Asset/module');
var DA_Finance_Types = require('../../../../DA/Finance/Types/module');


exports.AssetLifecycle_Process = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({depositCid: damlTypes.ContractId(DA_Finance_Fact_Asset.AssetDeposit).decoder, decompositionCid: damlTypes.ContractId(DA_Finance_Fact_Asset.AssetDecomposition).decoder, }); }),
  encode: function (__typed__) {
  return {
    depositCid: damlTypes.ContractId(DA_Finance_Fact_Asset.AssetDeposit).encode(__typed__.depositCid),
    decompositionCid: damlTypes.ContractId(DA_Finance_Fact_Asset.AssetDecomposition).encode(__typed__.decompositionCid),
  };
}
,
};



exports.AssetLifecycle = {
  templateId: 'f2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc:DA.Finance.Rule.Asset:AssetLifecycle',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({account: DA_Finance_Types.Account.decoder, observers: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set(damlTypes.Party).decoder, }); }),
  encode: function (__typed__) {
  return {
    account: DA_Finance_Types.Account.encode(__typed__.account),
    observers: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set(damlTypes.Party).encode(__typed__.observers),
  };
}
,
  AssetLifecycle_Process: {
    template: function () { return exports.AssetLifecycle; },
    choiceName: 'AssetLifecycle_Process',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.AssetLifecycle_Process.decoder; }),
    argumentEncode: function (__typed__) { return exports.AssetLifecycle_Process.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.List(damlTypes.ContractId(DA_Finance_Fact_Asset.AssetDeposit)).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.List(damlTypes.ContractId(DA_Finance_Fact_Asset.AssetDeposit)).encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.AssetLifecycle; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.AssetLifecycle);



exports.AssetTransferAllocation_Archive = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.AssetSettlementChain_Process = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.AssetSettlementChain_AllocateNext = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({depositCid: damlTypes.ContractId(DA_Finance_Fact_Asset.AssetDeposit).decoder, }); }),
  encode: function (__typed__) {
  return {
    depositCid: damlTypes.ContractId(DA_Finance_Fact_Asset.AssetDeposit).encode(__typed__.depositCid),
  };
}
,
};



exports.AssetSettlementChain = {
  templateId: 'f2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc:DA.Finance.Rule.Asset:AssetSettlementChain',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({masterAgreement: DA_Finance_Types.MasterAgreement.decoder, tradeId: DA_Finance_Types.Id.decoder, asset: DA_Finance_Types.Asset.decoder, steps: damlTypes.List(exports.AssetSettlementStep).decoder, observers: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set(damlTypes.Party).decoder, }); }),
  encode: function (__typed__) {
  return {
    masterAgreement: DA_Finance_Types.MasterAgreement.encode(__typed__.masterAgreement),
    tradeId: DA_Finance_Types.Id.encode(__typed__.tradeId),
    asset: DA_Finance_Types.Asset.encode(__typed__.asset),
    steps: damlTypes.List(exports.AssetSettlementStep).encode(__typed__.steps),
    observers: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set(damlTypes.Party).encode(__typed__.observers),
  };
}
,
  AssetSettlementChain_AllocateNext: {
    template: function () { return exports.AssetSettlementChain; },
    choiceName: 'AssetSettlementChain_AllocateNext',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.AssetSettlementChain_AllocateNext.decoder; }),
    argumentEncode: function (__typed__) { return exports.AssetSettlementChain_AllocateNext.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.AssetSettlementChain).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.AssetSettlementChain).encode(__typed__); },
  },
  AssetTransferAllocation_Archive: {
    template: function () { return exports.AssetSettlementChain; },
    choiceName: 'AssetTransferAllocation_Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.AssetTransferAllocation_Archive.decoder; }),
    argumentEncode: function (__typed__) { return exports.AssetTransferAllocation_Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  AssetSettlementChain_Process: {
    template: function () { return exports.AssetSettlementChain; },
    choiceName: 'AssetSettlementChain_Process',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.AssetSettlementChain_Process.decoder; }),
    argumentEncode: function (__typed__) { return exports.AssetSettlementChain_Process.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.List(damlTypes.ContractId(DA_Finance_Fact_Asset.AssetDeposit)).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.List(damlTypes.ContractId(DA_Finance_Fact_Asset.AssetDeposit)).encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.AssetSettlementChain; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.AssetSettlementChain);



exports.AssetSettlementStep = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({sender: damlTypes.Party.decoder, receiver: damlTypes.Party.decoder, depositCid: damlTypes.Optional(damlTypes.ContractId(DA_Finance_Fact_Asset.AssetDeposit)).decoder, creditSettlementCid: damlTypes.ContractId(exports.AssetSettlement).decoder, debitSettlementCid: damlTypes.ContractId(exports.AssetSettlement).decoder, }); }),
  encode: function (__typed__) {
  return {
    sender: damlTypes.Party.encode(__typed__.sender),
    receiver: damlTypes.Party.encode(__typed__.receiver),
    depositCid: damlTypes.Optional(damlTypes.ContractId(DA_Finance_Fact_Asset.AssetDeposit)).encode(__typed__.depositCid),
    creditSettlementCid: damlTypes.ContractId(exports.AssetSettlement).encode(__typed__.creditSettlementCid),
    debitSettlementCid: damlTypes.ContractId(exports.AssetSettlement).encode(__typed__.debitSettlementCid),
  };
}
,
};



exports.AssetSettlement_Debit_Signatories = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({asset: DA_Finance_Types.Asset.decoder, }); }),
  encode: function (__typed__) {
  return {
    asset: DA_Finance_Types.Asset.encode(__typed__.asset),
  };
}
,
};



exports.AssetSettlement_Debit = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({asset: DA_Finance_Types.Asset.decoder, }); }),
  encode: function (__typed__) {
  return {
    asset: DA_Finance_Types.Asset.encode(__typed__.asset),
  };
}
,
};



exports.AssetSettlement_SetObservers = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({newObservers: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set(damlTypes.Party).decoder, }); }),
  encode: function (__typed__) {
  return {
    newObservers: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set(damlTypes.Party).encode(__typed__.newObservers),
  };
}
,
};



exports.AssetSettlement_Transfer = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({receiver: damlTypes.Party.decoder, depositCid: damlTypes.ContractId(DA_Finance_Fact_Asset.AssetDeposit).decoder, debitSettlementCid: damlTypes.ContractId(exports.AssetSettlement).decoder, }); }),
  encode: function (__typed__) {
  return {
    receiver: damlTypes.Party.encode(__typed__.receiver),
    depositCid: damlTypes.ContractId(DA_Finance_Fact_Asset.AssetDeposit).encode(__typed__.depositCid),
    debitSettlementCid: damlTypes.ContractId(exports.AssetSettlement).encode(__typed__.debitSettlementCid),
  };
}
,
};



exports.AssetSettlement_Credit = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({depositCid: damlTypes.ContractId(DA_Finance_Fact_Asset.AssetDeposit).decoder, }); }),
  encode: function (__typed__) {
  return {
    depositCid: damlTypes.ContractId(DA_Finance_Fact_Asset.AssetDeposit).encode(__typed__.depositCid),
  };
}
,
};



exports.AssetSettlement = {
  templateId: 'f2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc:DA.Finance.Rule.Asset:AssetSettlement',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({account: DA_Finance_Types.Account.decoder, observers: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set(damlTypes.Party).decoder, }); }),
  encode: function (__typed__) {
  return {
    account: DA_Finance_Types.Account.encode(__typed__.account),
    observers: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set(damlTypes.Party).encode(__typed__.observers),
  };
}
,
  AssetSettlement_Credit: {
    template: function () { return exports.AssetSettlement; },
    choiceName: 'AssetSettlement_Credit',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.AssetSettlement_Credit.decoder; }),
    argumentEncode: function (__typed__) { return exports.AssetSettlement_Credit.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return DA_Finance_Types.Asset.decoder; }),
    resultEncode: function (__typed__) { return DA_Finance_Types.Asset.encode(__typed__); },
  },
  AssetSettlement_Transfer: {
    template: function () { return exports.AssetSettlement; },
    choiceName: 'AssetSettlement_Transfer',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.AssetSettlement_Transfer.decoder; }),
    argumentEncode: function (__typed__) { return exports.AssetSettlement_Transfer.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(DA_Finance_Fact_Asset.AssetDeposit).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(DA_Finance_Fact_Asset.AssetDeposit).encode(__typed__); },
  },
  AssetSettlement_SetObservers: {
    template: function () { return exports.AssetSettlement; },
    choiceName: 'AssetSettlement_SetObservers',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.AssetSettlement_SetObservers.decoder; }),
    argumentEncode: function (__typed__) { return exports.AssetSettlement_SetObservers.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.AssetSettlement).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.AssetSettlement).encode(__typed__); },
  },
  AssetSettlement_Debit: {
    template: function () { return exports.AssetSettlement; },
    choiceName: 'AssetSettlement_Debit',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.AssetSettlement_Debit.decoder; }),
    argumentEncode: function (__typed__) { return exports.AssetSettlement_Debit.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(DA_Finance_Fact_Asset.AssetDeposit).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(DA_Finance_Fact_Asset.AssetDeposit).encode(__typed__); },
  },
  AssetSettlement_Debit_Signatories: {
    template: function () { return exports.AssetSettlement; },
    choiceName: 'AssetSettlement_Debit_Signatories',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.AssetSettlement_Debit_Signatories.decoder; }),
    argumentEncode: function (__typed__) { return exports.AssetSettlement_Debit_Signatories.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(DA_Finance_Fact_Asset.AssetDeposit).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(DA_Finance_Fact_Asset.AssetDeposit).encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.AssetSettlement; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.AssetSettlement);



exports.AssetFungible_Merge = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({depositCids: damlTypes.List(damlTypes.ContractId(DA_Finance_Fact_Asset.AssetDeposit)).decoder, }); }),
  encode: function (__typed__) {
  return {
    depositCids: damlTypes.List(damlTypes.ContractId(DA_Finance_Fact_Asset.AssetDeposit)).encode(__typed__.depositCids),
  };
}
,
};



exports.AssetFungible_Split = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({depositCid: damlTypes.ContractId(DA_Finance_Fact_Asset.AssetDeposit).decoder, quantities: damlTypes.List(damlTypes.Numeric(10)).decoder, }); }),
  encode: function (__typed__) {
  return {
    depositCid: damlTypes.ContractId(DA_Finance_Fact_Asset.AssetDeposit).encode(__typed__.depositCid),
    quantities: damlTypes.List(damlTypes.Numeric(10)).encode(__typed__.quantities),
  };
}
,
};



exports.AssetFungible = {
  templateId: 'f2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc:DA.Finance.Rule.Asset:AssetFungible',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({account: DA_Finance_Types.Account.decoder, observers: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set(damlTypes.Party).decoder, }); }),
  encode: function (__typed__) {
  return {
    account: DA_Finance_Types.Account.encode(__typed__.account),
    observers: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set(damlTypes.Party).encode(__typed__.observers),
  };
}
,
  AssetFungible_Split: {
    template: function () { return exports.AssetFungible; },
    choiceName: 'AssetFungible_Split',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.AssetFungible_Split.decoder; }),
    argumentEncode: function (__typed__) { return exports.AssetFungible_Split.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.List(damlTypes.ContractId(DA_Finance_Fact_Asset.AssetDeposit)).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.List(damlTypes.ContractId(DA_Finance_Fact_Asset.AssetDeposit)).encode(__typed__); },
  },
  AssetFungible_Merge: {
    template: function () { return exports.AssetFungible; },
    choiceName: 'AssetFungible_Merge',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.AssetFungible_Merge.decoder; }),
    argumentEncode: function (__typed__) { return exports.AssetFungible_Merge.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(DA_Finance_Fact_Asset.AssetDeposit).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(DA_Finance_Fact_Asset.AssetDeposit).encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.AssetFungible; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.AssetFungible);

