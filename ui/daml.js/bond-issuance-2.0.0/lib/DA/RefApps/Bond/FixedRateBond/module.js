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


exports.FixedRateBondFact = {
  templateId: '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.FixedRateBond:FixedRateBondFact',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({provider: damlTypes.Party.decoder, instrumentId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id.decoder, observers: damlTypes.List(damlTypes.Party).decoder, isin: damlTypes.Text.decoder, cashAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id.decoder, denomination: damlTypes.Numeric(10).decoder, rate: damlTypes.Numeric(10).decoder, paymentLag: damlTypes.Int.decoder, couponDates: damlTypes.List(damlTypes.Date).decoder, couponDatesTriggered: damlTypes.List(damlTypes.Date).decoder, issueDate: damlTypes.Date.decoder, maturityDate: damlTypes.Date.decoder, }); }),
  encode: function (__typed__) {
  return {
    provider: damlTypes.Party.encode(__typed__.provider),
    instrumentId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id.encode(__typed__.instrumentId),
    observers: damlTypes.List(damlTypes.Party).encode(__typed__.observers),
    isin: damlTypes.Text.encode(__typed__.isin),
    cashAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id.encode(__typed__.cashAssetId),
    denomination: damlTypes.Numeric(10).encode(__typed__.denomination),
    rate: damlTypes.Numeric(10).encode(__typed__.rate),
    paymentLag: damlTypes.Int.encode(__typed__.paymentLag),
    couponDates: damlTypes.List(damlTypes.Date).encode(__typed__.couponDates),
    couponDatesTriggered: damlTypes.List(damlTypes.Date).encode(__typed__.couponDatesTriggered),
    issueDate: damlTypes.Date.encode(__typed__.issueDate),
    maturityDate: damlTypes.Date.encode(__typed__.maturityDate),
  };
}
,
  Archive: {
    template: function () { return exports.FixedRateBondFact; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.FixedRateBondFact);

