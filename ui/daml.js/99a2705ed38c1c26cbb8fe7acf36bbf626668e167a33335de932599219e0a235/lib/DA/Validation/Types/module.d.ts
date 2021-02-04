// Generated from DA/Validation/Types.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

import * as pkge22bce619ae24ca3b8e6519281cb5a33b64b3190cc763248b4c3f9ad5087a92c from '@daml.js/e22bce619ae24ca3b8e6519281cb5a33b64b3190cc763248b4c3f9ad5087a92c';

export declare type Validation<errs, a> =
  |  { tag: 'Errors'; value: pkge22bce619ae24ca3b8e6519281cb5a33b64b3190cc763248b4c3f9ad5087a92c.DA.NonEmpty.Types.NonEmpty<errs> }
  |  { tag: 'Success'; value: a }
;

export declare const Validation :
  (<errs, a>(errs: damlTypes.Serializable<errs>, a: damlTypes.Serializable<a>) => damlTypes.Serializable<Validation<errs, a>>) & {
};

