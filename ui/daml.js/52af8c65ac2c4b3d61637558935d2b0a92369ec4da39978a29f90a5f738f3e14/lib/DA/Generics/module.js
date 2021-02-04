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


exports.DecidedStrictness = {
  DecidedLazy: 'DecidedLazy',
  DecidedStrict: 'DecidedStrict',
  DecidedUnpack: 'DecidedUnpack',
  keys: ['DecidedLazy','DecidedStrict','DecidedUnpack',],
  decoder: damlTypes.lazyMemo(function () { return jtv.oneOf(jtv.constant(exports.DecidedStrictness.DecidedLazy), jtv.constant(exports.DecidedStrictness.DecidedStrict), jtv.constant(exports.DecidedStrictness.DecidedUnpack)); }),
  encode: function (__typed__) { return __typed__; },
};



exports.SourceStrictness = {
  NoSourceStrictness: 'NoSourceStrictness',
  SourceLazy: 'SourceLazy',
  SourceStrict: 'SourceStrict',
  keys: ['NoSourceStrictness','SourceLazy','SourceStrict',],
  decoder: damlTypes.lazyMemo(function () { return jtv.oneOf(jtv.constant(exports.SourceStrictness.NoSourceStrictness), jtv.constant(exports.SourceStrictness.SourceLazy), jtv.constant(exports.SourceStrictness.SourceStrict)); }),
  encode: function (__typed__) { return __typed__; },
};



exports.SourceUnpackedness = {
  NoSourceUnpackedness: 'NoSourceUnpackedness',
  SourceNoUnpack: 'SourceNoUnpack',
  SourceUnpack: 'SourceUnpack',
  keys: ['NoSourceUnpackedness','SourceNoUnpack','SourceUnpack',],
  decoder: damlTypes.lazyMemo(function () { return jtv.oneOf(jtv.constant(exports.SourceUnpackedness.NoSourceUnpackedness), jtv.constant(exports.SourceUnpackedness.SourceNoUnpack), jtv.constant(exports.SourceUnpackedness.SourceUnpack)); }),
  encode: function (__typed__) { return __typed__; },
};



exports.Associativity = {
  LeftAssociative: 'LeftAssociative',
  RightAssociative: 'RightAssociative',
  NotAssociative: 'NotAssociative',
  keys: ['LeftAssociative','RightAssociative','NotAssociative',],
  decoder: damlTypes.lazyMemo(function () { return jtv.oneOf(jtv.constant(exports.Associativity.LeftAssociative), jtv.constant(exports.Associativity.RightAssociative), jtv.constant(exports.Associativity.NotAssociative)); }),
  encode: function (__typed__) { return __typed__; },
};



exports.Infix0 = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({associativity: exports.Associativity.decoder, fixity: damlTypes.Int.decoder, }); }),
  encode: function (__typed__) {
  return {
    associativity: exports.Associativity.encode(__typed__.associativity),
    fixity: damlTypes.Int.encode(__typed__.fixity),
  };
}
,
};



exports.Fixity = {
  decoder: damlTypes.lazyMemo(function () { return jtv.oneOf(jtv.object({tag: jtv.constant('Prefix'), value: damlTypes.Unit.decoder, }), jtv.object({tag: jtv.constant('Infix'), value: exports.Infix0.decoder, })); }),
  encode: function (__typed__) {
  switch(__typed__.tag) {
    case 'Prefix': return {tag: __typed__.tag, value: damlTypes.Unit.encode(__typed__.value)};
    case 'Infix': return {tag: __typed__.tag, value: exports.Infix0.encode(__typed__.value)};
    default: throw 'unrecognized type tag: ' + __typed__.tag + ' while serializing a value of type Fixity';
  }
}
,
};



exports.K1 = function (i, c, p) { return ({
  decoder: damlTypes.lazyMemo(function () { return jtv.object({unK1: c.decoder, }); }),
  encode: function (__typed__) {
  return {
    unK1: c.encode(__typed__.unK1),
  };
}
,
}); };



exports.Par1 = function (p) { return ({
  decoder: damlTypes.lazyMemo(function () { return jtv.object({unPar1: p.decoder, }); }),
  encode: function (__typed__) {
  return {
    unPar1: p.encode(__typed__.unPar1),
  };
}
,
}); };



exports.U1 = function (p) { return ({
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
}); };

