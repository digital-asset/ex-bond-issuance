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

var DA_Finance_Fact_Trade_Dvp = require('../../../DA/Finance/Fact/Trade/Dvp/module');
var DA_Finance_Rule_Asset = require('../../../DA/Finance/Rule/Asset/module');
var DA_Finance_Types = require('../../../DA/Finance/Types/module');


exports.DvpInstruction_Process2 = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({param: exports.DvpInstruction_Process_Param.decoder, }); }),
  encode: function (__typed__) {
  return {
    param: exports.DvpInstruction_Process_Param.encode(__typed__.param),
  };
}
,
};



exports.DvpInstruction_Process1 = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({param: exports.DvpInstruction_Process_Param.decoder, }); }),
  encode: function (__typed__) {
  return {
    param: exports.DvpInstruction_Process_Param.encode(__typed__.param),
  };
}
,
};



exports.DvpInstruction = {
  templateId: 'f2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc:Test.Finance.Helpers:DvpInstruction',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({masterAgreement: DA_Finance_Types.MasterAgreement.decoder, observers: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set(damlTypes.Party).decoder, }); }),
  encode: function (__typed__) {
  return {
    masterAgreement: DA_Finance_Types.MasterAgreement.encode(__typed__.masterAgreement),
    observers: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set(damlTypes.Party).encode(__typed__.observers),
  };
}
,
  Archive: {
    template: function () { return exports.DvpInstruction; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  DvpInstruction_Process2: {
    template: function () { return exports.DvpInstruction; },
    choiceName: 'DvpInstruction_Process2',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.DvpInstruction_Process2.decoder; }),
    argumentEncode: function (__typed__) { return exports.DvpInstruction_Process2.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return exports.DvpInstruction_Process_Result.decoder; }),
    resultEncode: function (__typed__) { return exports.DvpInstruction_Process_Result.encode(__typed__); },
  },
  DvpInstruction_Process1: {
    template: function () { return exports.DvpInstruction; },
    choiceName: 'DvpInstruction_Process1',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.DvpInstruction_Process1.decoder; }),
    argumentEncode: function (__typed__) { return exports.DvpInstruction_Process1.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return exports.DvpInstruction_Process_Result.decoder; }),
    resultEncode: function (__typed__) { return exports.DvpInstruction_Process_Result.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.DvpInstruction);



exports.DvpInstruction_Process_Result = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({dvpCid: damlTypes.ContractId(DA_Finance_Fact_Trade_Dvp.Dvp).decoder, paymentChainCids: damlTypes.List(damlTypes.ContractId(DA_Finance_Rule_Asset.AssetSettlementChain)).decoder, deliveryChainCids: damlTypes.List(damlTypes.ContractId(DA_Finance_Rule_Asset.AssetSettlementChain)).decoder, }); }),
  encode: function (__typed__) {
  return {
    dvpCid: damlTypes.ContractId(DA_Finance_Fact_Trade_Dvp.Dvp).encode(__typed__.dvpCid),
    paymentChainCids: damlTypes.List(damlTypes.ContractId(DA_Finance_Rule_Asset.AssetSettlementChain)).encode(__typed__.paymentChainCids),
    deliveryChainCids: damlTypes.List(damlTypes.ContractId(DA_Finance_Rule_Asset.AssetSettlementChain)).encode(__typed__.deliveryChainCids),
  };
}
,
};



exports.DvpInstruction_Process_Param = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({dvpCid: damlTypes.ContractId(DA_Finance_Fact_Trade_Dvp.Dvp).decoder, paymentSteps: damlTypes.List(damlTypes.List(DA_Finance_Rule_Asset.AssetSettlementStep)).decoder, deliverySteps: damlTypes.List(damlTypes.List(DA_Finance_Rule_Asset.AssetSettlementStep)).decoder, }); }),
  encode: function (__typed__) {
  return {
    dvpCid: damlTypes.ContractId(DA_Finance_Fact_Trade_Dvp.Dvp).encode(__typed__.dvpCid),
    paymentSteps: damlTypes.List(damlTypes.List(DA_Finance_Rule_Asset.AssetSettlementStep)).encode(__typed__.paymentSteps),
    deliverySteps: damlTypes.List(damlTypes.List(DA_Finance_Rule_Asset.AssetSettlementStep)).encode(__typed__.deliverySteps),
  };
}
,
};

