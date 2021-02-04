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

var pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 = require('@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662');
var pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc = require('@daml.js/finlib-1.0.0');

var DA_RefApps_Bond_Lock = require('../../../../../DA/RefApps/Bond/Lock/module');


exports.CentralBankRole_CreateLockRule = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({account: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Account.decoder, }); }),
  encode: function (__typed__) {
  return {
    account: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Account.encode(__typed__.account),
  };
}
,
};



exports.CentralBankRole_CreateFungibleRule = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({account: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Account.decoder, }); }),
  encode: function (__typed__) {
  return {
    account: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Account.encode(__typed__.account),
  };
}
,
};



exports.CentralBankRole_CreateSettlementRule = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({account: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Account.decoder, observers: damlTypes.List(damlTypes.Party).decoder, }); }),
  encode: function (__typed__) {
  return {
    account: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Account.encode(__typed__.account),
    observers: damlTypes.List(damlTypes.Party).encode(__typed__.observers),
  };
}
,
};



exports.CentralBankRole_IssueCash = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({account: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Account.decoder, currency: damlTypes.Text.decoder, quantity: damlTypes.Numeric(10).decoder, }); }),
  encode: function (__typed__) {
  return {
    account: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Account.encode(__typed__.account),
    currency: damlTypes.Text.encode(__typed__.currency),
    quantity: damlTypes.Numeric(10).encode(__typed__.quantity),
  };
}
,
};



exports.CentralBankRole = {
  templateId: '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Roles.CentralBankRole:CentralBankRole',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({centralBank: damlTypes.Party.decoder, operator: damlTypes.Party.decoder, regulators: damlTypes.List(damlTypes.Party).decoder, }); }),
  encode: function (__typed__) {
  return {
    centralBank: damlTypes.Party.encode(__typed__.centralBank),
    operator: damlTypes.Party.encode(__typed__.operator),
    regulators: damlTypes.List(damlTypes.Party).encode(__typed__.regulators),
  };
}
,
  CentralBankRole_IssueCash: {
    template: function () { return exports.CentralBankRole; },
    choiceName: 'CentralBankRole_IssueCash',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.CentralBankRole_IssueCash.decoder; }),
    argumentEncode: function (__typed__) { return exports.CentralBankRole_IssueCash.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit).encode(__typed__); },
  },
  CentralBankRole_CreateSettlementRule: {
    template: function () { return exports.CentralBankRole; },
    choiceName: 'CentralBankRole_CreateSettlementRule',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.CentralBankRole_CreateSettlementRule.decoder; }),
    argumentEncode: function (__typed__) { return exports.CentralBankRole_CreateSettlementRule.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement).encode(__typed__); },
  },
  CentralBankRole_CreateFungibleRule: {
    template: function () { return exports.CentralBankRole; },
    choiceName: 'CentralBankRole_CreateFungibleRule',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.CentralBankRole_CreateFungibleRule.decoder; }),
    argumentEncode: function (__typed__) { return exports.CentralBankRole_CreateFungibleRule.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetFungible).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetFungible).encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.CentralBankRole; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  CentralBankRole_CreateLockRule: {
    template: function () { return exports.CentralBankRole; },
    choiceName: 'CentralBankRole_CreateLockRule',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.CentralBankRole_CreateLockRule.decoder; }),
    argumentEncode: function (__typed__) { return exports.CentralBankRole_CreateLockRule.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(DA_RefApps_Bond_Lock.AssetLockRule).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(DA_RefApps_Bond_Lock.AssetLockRule).encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.CentralBankRole);



exports.CentralBankRoleInvitation_Revoke = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.CentralBankRoleInvitation_Reject = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.CentralBankRoleInvitation_Accept = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.CentralBankRoleInvitation = {
  templateId: '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Roles.CentralBankRole:CentralBankRoleInvitation',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({centralBank: damlTypes.Party.decoder, operator: damlTypes.Party.decoder, regulators: damlTypes.List(damlTypes.Party).decoder, }); }),
  encode: function (__typed__) {
  return {
    centralBank: damlTypes.Party.encode(__typed__.centralBank),
    operator: damlTypes.Party.encode(__typed__.operator),
    regulators: damlTypes.List(damlTypes.Party).encode(__typed__.regulators),
  };
}
,
  CentralBankRoleInvitation_Accept: {
    template: function () { return exports.CentralBankRoleInvitation; },
    choiceName: 'CentralBankRoleInvitation_Accept',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.CentralBankRoleInvitation_Accept.decoder; }),
    argumentEncode: function (__typed__) { return exports.CentralBankRoleInvitation_Accept.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.CentralBankRole).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.CentralBankRole).encode(__typed__); },
  },
  CentralBankRoleInvitation_Reject: {
    template: function () { return exports.CentralBankRoleInvitation; },
    choiceName: 'CentralBankRoleInvitation_Reject',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.CentralBankRoleInvitation_Reject.decoder; }),
    argumentEncode: function (__typed__) { return exports.CentralBankRoleInvitation_Reject.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  CentralBankRoleInvitation_Revoke: {
    template: function () { return exports.CentralBankRoleInvitation; },
    choiceName: 'CentralBankRoleInvitation_Revoke',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.CentralBankRoleInvitation_Revoke.decoder; }),
    argumentEncode: function (__typed__) { return exports.CentralBankRoleInvitation_Revoke.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.CentralBankRoleInvitation; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.CentralBankRoleInvitation);

