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
var pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc = require('@daml.js/finlib-1.0.0');


exports.AuctionLockedCash_Unlock = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.AuctionLockedCash = {
  templateId: '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Lock:AuctionLockedCash',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({owner: damlTypes.Party.decoder, auctionAgent: damlTypes.Party.decoder, auctionName: damlTypes.Text.decoder, lockedCashAssetDeposit: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit.decoder, account: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Account.decoder, regulators: damlTypes.List(damlTypes.Party).decoder, }); }),
  encode: function (__typed__) {
  return {
    owner: damlTypes.Party.encode(__typed__.owner),
    auctionAgent: damlTypes.Party.encode(__typed__.auctionAgent),
    auctionName: damlTypes.Text.encode(__typed__.auctionName),
    lockedCashAssetDeposit: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit.encode(__typed__.lockedCashAssetDeposit),
    account: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Account.encode(__typed__.account),
    regulators: damlTypes.List(damlTypes.Party).encode(__typed__.regulators),
  };
}
,
  AuctionLockedCash_Unlock: {
    template: function () { return exports.AuctionLockedCash; },
    choiceName: 'AuctionLockedCash_Unlock',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.AuctionLockedCash_Unlock.decoder; }),
    argumentEncode: function (__typed__) { return exports.AuctionLockedCash_Unlock.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit).encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.AuctionLockedCash; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.AuctionLockedCash);



exports.AssetLockRule_Lock = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({assetDepositCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit).decoder, auctionName: damlTypes.Text.decoder, auctionAgent: damlTypes.Party.decoder, regulators: damlTypes.List(damlTypes.Party).decoder, }); }),
  encode: function (__typed__) {
  return {
    assetDepositCid: damlTypes.ContractId(pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit).encode(__typed__.assetDepositCid),
    auctionName: damlTypes.Text.encode(__typed__.auctionName),
    auctionAgent: damlTypes.Party.encode(__typed__.auctionAgent),
    regulators: damlTypes.List(damlTypes.Party).encode(__typed__.regulators),
  };
}
,
};



exports.AssetLockRule = {
  templateId: '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Lock:AssetLockRule',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({account: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Account.decoder, observers: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set(damlTypes.Party).decoder, }); }),
  encode: function (__typed__) {
  return {
    account: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Account.encode(__typed__.account),
    observers: pkg52af8c65ac2c4b3d61637558935d2b0a92369ec4da39978a29f90a5f738f3e14.DA.Next.Set.Set(damlTypes.Party).encode(__typed__.observers),
  };
}
,
  Archive: {
    template: function () { return exports.AssetLockRule; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  AssetLockRule_Lock: {
    template: function () { return exports.AssetLockRule; },
    choiceName: 'AssetLockRule_Lock',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.AssetLockRule_Lock.decoder; }),
    argumentEncode: function (__typed__) { return exports.AssetLockRule_Lock.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.AuctionLockedCash).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.AuctionLockedCash).encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.AssetLockRule);

