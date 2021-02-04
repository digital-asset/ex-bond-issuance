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
var DA_RefApps_Bond_Roles_IssuerRole = require('../../../../../DA/RefApps/Bond/Roles/IssuerRole/module');


exports.MarketSetup_Sign = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({signer: damlTypes.Party.decoder, }); }),
  encode: function (__typed__) {
  return {
    signer: damlTypes.Party.encode(__typed__.signer),
  };
}
,
};



exports.MarketSetup_SetupMarket = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.MarketSetup = {
  templateId: '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.MarketSetup.MarketSetup:MarketSetup',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({operator: damlTypes.Party.decoder, regulator: damlTypes.Party.decoder, auctionAgent: damlTypes.Party.decoder, bank1: damlTypes.Party.decoder, bank2: damlTypes.Party.decoder, bank3: damlTypes.Party.decoder, csd: damlTypes.Party.decoder, issuer: damlTypes.Party.decoder, centralBank: damlTypes.Party.decoder, signatories: damlTypes.List(damlTypes.Party).decoder, }); }),
  encode: function (__typed__) {
  return {
    operator: damlTypes.Party.encode(__typed__.operator),
    regulator: damlTypes.Party.encode(__typed__.regulator),
    auctionAgent: damlTypes.Party.encode(__typed__.auctionAgent),
    bank1: damlTypes.Party.encode(__typed__.bank1),
    bank2: damlTypes.Party.encode(__typed__.bank2),
    bank3: damlTypes.Party.encode(__typed__.bank3),
    csd: damlTypes.Party.encode(__typed__.csd),
    issuer: damlTypes.Party.encode(__typed__.issuer),
    centralBank: damlTypes.Party.encode(__typed__.centralBank),
    signatories: damlTypes.List(damlTypes.Party).encode(__typed__.signatories),
  };
}
,
  MarketSetup_SetupMarket: {
    template: function () { return exports.MarketSetup; },
    choiceName: 'MarketSetup_SetupMarket',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.MarketSetup_SetupMarket.decoder; }),
    argumentEncode: function (__typed__) { return exports.MarketSetup_SetupMarket.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return exports.MarketSetupData.decoder; }),
    resultEncode: function (__typed__) { return exports.MarketSetupData.encode(__typed__); },
  },
  MarketSetup_Sign: {
    template: function () { return exports.MarketSetup; },
    choiceName: 'MarketSetup_Sign',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.MarketSetup_Sign.decoder; }),
    argumentEncode: function (__typed__) { return exports.MarketSetup_Sign.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.MarketSetup).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.MarketSetup).encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.MarketSetup; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.MarketSetup);



exports.MarketSetupSignatureCreator_CreateSignature = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({marketParticipant: damlTypes.Party.decoder, }); }),
  encode: function (__typed__) {
  return {
    marketParticipant: damlTypes.Party.encode(__typed__.marketParticipant),
  };
}
,
};



exports.MarketSetupSignatureCreator_SetupMarket = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({signatures: damlTypes.List(damlTypes.ContractId(exports.MarketSetupSignature)).decoder, }); }),
  encode: function (__typed__) {
  return {
    signatures: damlTypes.List(damlTypes.ContractId(exports.MarketSetupSignature)).encode(__typed__.signatures),
  };
}
,
};



exports.MarketSetupSignatureCreator = {
  templateId: '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.MarketSetup.MarketSetup:MarketSetupSignatureCreator',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({operator: damlTypes.Party.decoder, regulator: damlTypes.Party.decoder, auctionAgent: damlTypes.Party.decoder, bank1: damlTypes.Party.decoder, bank2: damlTypes.Party.decoder, bank3: damlTypes.Party.decoder, csd: damlTypes.Party.decoder, issuer: damlTypes.Party.decoder, centralBank: damlTypes.Party.decoder, signatories: damlTypes.List(damlTypes.Party).decoder, }); }),
  encode: function (__typed__) {
  return {
    operator: damlTypes.Party.encode(__typed__.operator),
    regulator: damlTypes.Party.encode(__typed__.regulator),
    auctionAgent: damlTypes.Party.encode(__typed__.auctionAgent),
    bank1: damlTypes.Party.encode(__typed__.bank1),
    bank2: damlTypes.Party.encode(__typed__.bank2),
    bank3: damlTypes.Party.encode(__typed__.bank3),
    csd: damlTypes.Party.encode(__typed__.csd),
    issuer: damlTypes.Party.encode(__typed__.issuer),
    centralBank: damlTypes.Party.encode(__typed__.centralBank),
    signatories: damlTypes.List(damlTypes.Party).encode(__typed__.signatories),
  };
}
,
  Archive: {
    template: function () { return exports.MarketSetupSignatureCreator; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  MarketSetupSignatureCreator_SetupMarket: {
    template: function () { return exports.MarketSetupSignatureCreator; },
    choiceName: 'MarketSetupSignatureCreator_SetupMarket',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.MarketSetupSignatureCreator_SetupMarket.decoder; }),
    argumentEncode: function (__typed__) { return exports.MarketSetupSignatureCreator_SetupMarket.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return exports.MarketSetupData.decoder; }),
    resultEncode: function (__typed__) { return exports.MarketSetupData.encode(__typed__); },
  },
  MarketSetupSignatureCreator_CreateSignature: {
    template: function () { return exports.MarketSetupSignatureCreator; },
    choiceName: 'MarketSetupSignatureCreator_CreateSignature',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.MarketSetupSignatureCreator_CreateSignature.decoder; }),
    argumentEncode: function (__typed__) { return exports.MarketSetupSignatureCreator_CreateSignature.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.MarketSetupSignature).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.MarketSetupSignature).encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.MarketSetupSignatureCreator);



exports.MarketSetupSignature_UseSignature = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({targetContractId: damlTypes.ContractId(exports.MarketSetup).decoder, }); }),
  encode: function (__typed__) {
  return {
    targetContractId: damlTypes.ContractId(exports.MarketSetup).encode(__typed__.targetContractId),
  };
}
,
};



exports.MarketSetupSignature = {
  templateId: '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.MarketSetup.MarketSetup:MarketSetupSignature',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({operator: damlTypes.Party.decoder, marketParticipant: damlTypes.Party.decoder, }); }),
  encode: function (__typed__) {
  return {
    operator: damlTypes.Party.encode(__typed__.operator),
    marketParticipant: damlTypes.Party.encode(__typed__.marketParticipant),
  };
}
,
  MarketSetupSignature_UseSignature: {
    template: function () { return exports.MarketSetupSignature; },
    choiceName: 'MarketSetupSignature_UseSignature',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.MarketSetupSignature_UseSignature.decoder; }),
    argumentEncode: function (__typed__) { return exports.MarketSetupSignature_UseSignature.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.MarketSetup).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.MarketSetup).encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.MarketSetupSignature; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.MarketSetupSignature);



exports.MarketSetupData = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({issuer: damlTypes.Party.decoder, issuerRole: damlTypes.ContractId(DA_RefApps_Bond_Roles_IssuerRole.IssuerRole).decoder, csd: damlTypes.Party.decoder, auctionAgent: damlTypes.Party.decoder, bank1: damlTypes.Party.decoder, funIss: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetFungible).decoder, settIss: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement).decoder, settIssCash: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement).decoder, cashBank1: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit).decoder, funBank1Cash: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetFungible).decoder, settBank1: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement).decoder, settBank1Cash: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement).decoder, lockBank1: damlTypes.ContractId(DA_RefApps_Bond_Lock.AssetLockRule).decoder, }); }),
  encode: function (__typed__) {
  return {
    issuer: damlTypes.Party.encode(__typed__.issuer),
    issuerRole: damlTypes.ContractId(DA_RefApps_Bond_Roles_IssuerRole.IssuerRole).encode(__typed__.issuerRole),
    csd: damlTypes.Party.encode(__typed__.csd),
    auctionAgent: damlTypes.Party.encode(__typed__.auctionAgent),
    bank1: damlTypes.Party.encode(__typed__.bank1),
    funIss: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetFungible).encode(__typed__.funIss),
    settIss: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement).encode(__typed__.settIss),
    settIssCash: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement).encode(__typed__.settIssCash),
    cashBank1: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit).encode(__typed__.cashBank1),
    funBank1Cash: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetFungible).encode(__typed__.funBank1Cash),
    settBank1: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement).encode(__typed__.settBank1),
    settBank1Cash: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement).encode(__typed__.settBank1Cash),
    lockBank1: damlTypes.ContractId(DA_RefApps_Bond_Lock.AssetLockRule).encode(__typed__.lockBank1),
  };
}
,
};

