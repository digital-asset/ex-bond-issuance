// Generated from GHC/Stack/Types.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

import * as pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7 from '@daml.js/40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7';

export declare type CallStack =
  |  { tag: 'EmptyCallStack'; value: {} }
  |  { tag: 'PushCallStack'; value: pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple3<string, SrcLoc, CallStack> }
  |  { tag: 'FreezeCallStack'; value: CallStack }
;

export declare const CallStack:
  damlTypes.Serializable<CallStack> & {
  }
;


export declare type SrcLoc = {
  srcLocPackage: string;
  srcLocModule: string;
  srcLocFile: string;
  srcLocStartLine: damlTypes.Int;
  srcLocStartCol: damlTypes.Int;
  srcLocEndLine: damlTypes.Int;
  srcLocEndCol: damlTypes.Int;
};

export declare const SrcLoc:
  damlTypes.Serializable<SrcLoc> & {
  }
;

