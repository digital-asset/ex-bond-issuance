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


exports.RollConventionEnum = {
  decoder: damlTypes.lazyMemo(function () { return jtv.oneOf(jtv.object({tag: jtv.constant('EOM'), value: damlTypes.Unit.decoder, }), jtv.object({tag: jtv.constant('DOM'), value: damlTypes.Int.decoder, })); }),
  encode: function (__typed__) {
  switch(__typed__.tag) {
    case 'EOM': return {tag: __typed__.tag, value: damlTypes.Unit.encode(__typed__.value)};
    case 'DOM': return {tag: __typed__.tag, value: damlTypes.Int.encode(__typed__.value)};
    default: throw 'unrecognized type tag: ' + __typed__.tag + ' while serializing a value of type RollConventionEnum';
  }
}
,
};



exports.PeriodEnum = {
  D: 'D',
  M: 'M',
  W: 'W',
  Y: 'Y',
  keys: ['D','M','W','Y',],
  decoder: damlTypes.lazyMemo(function () { return jtv.oneOf(jtv.constant(exports.PeriodEnum.D), jtv.constant(exports.PeriodEnum.M), jtv.constant(exports.PeriodEnum.W), jtv.constant(exports.PeriodEnum.Y)); }),
  encode: function (__typed__) { return __typed__; },
};



exports.Period = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({period: exports.PeriodEnum.decoder, periodMultiplier: damlTypes.Int.decoder, }); }),
  encode: function (__typed__) {
  return {
    period: exports.PeriodEnum.encode(__typed__.period),
    periodMultiplier: damlTypes.Int.encode(__typed__.periodMultiplier),
  };
}
,
};

