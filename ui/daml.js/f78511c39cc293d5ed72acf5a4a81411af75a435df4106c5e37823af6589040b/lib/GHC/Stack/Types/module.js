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

var pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7 = require('@daml.js/40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7');


exports.CallStack = {
  decoder: damlTypes.lazyMemo(function () { return jtv.oneOf(jtv.object({tag: jtv.constant('EmptyCallStack'), value: damlTypes.Unit.decoder, }), jtv.object({tag: jtv.constant('PushCallStack'), value: pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple3(damlTypes.Text, exports.SrcLoc, exports.CallStack).decoder, }), jtv.object({tag: jtv.constant('FreezeCallStack'), value: exports.CallStack.decoder, })); }),
  encode: function (__typed__) {
  switch(__typed__.tag) {
    case 'EmptyCallStack': return {tag: __typed__.tag, value: damlTypes.Unit.encode(__typed__.value)};
    case 'PushCallStack': return {tag: __typed__.tag, value: pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple3(damlTypes.Text, exports.SrcLoc, exports.CallStack).encode(__typed__.value)};
    case 'FreezeCallStack': return {tag: __typed__.tag, value: exports.CallStack.encode(__typed__.value)};
    default: throw 'unrecognized type tag: ' + __typed__.tag + ' while serializing a value of type CallStack';
  }
}
,
};



exports.SrcLoc = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({srcLocPackage: damlTypes.Text.decoder, srcLocModule: damlTypes.Text.decoder, srcLocFile: damlTypes.Text.decoder, srcLocStartLine: damlTypes.Int.decoder, srcLocStartCol: damlTypes.Int.decoder, srcLocEndLine: damlTypes.Int.decoder, srcLocEndCol: damlTypes.Int.decoder, }); }),
  encode: function (__typed__) {
  return {
    srcLocPackage: damlTypes.Text.encode(__typed__.srcLocPackage),
    srcLocModule: damlTypes.Text.encode(__typed__.srcLocModule),
    srcLocFile: damlTypes.Text.encode(__typed__.srcLocFile),
    srcLocStartLine: damlTypes.Int.encode(__typed__.srcLocStartLine),
    srcLocStartCol: damlTypes.Int.encode(__typed__.srcLocStartCol),
    srcLocEndLine: damlTypes.Int.encode(__typed__.srcLocEndLine),
    srcLocEndCol: damlTypes.Int.encode(__typed__.srcLocEndCol),
  };
}
,
};

