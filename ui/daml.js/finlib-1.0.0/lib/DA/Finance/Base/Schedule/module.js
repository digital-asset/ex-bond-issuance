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

var DA_Finance_Base_HolidayCalendar = require('../../../../DA/Finance/Base/HolidayCalendar/module');
var DA_Finance_Base_RollConvention = require('../../../../DA/Finance/Base/RollConvention/module');


exports.SchedulePeriod = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({adjustedEndDate: damlTypes.Date.decoder, adjustedStartDate: damlTypes.Date.decoder, unadjustedEndDate: damlTypes.Date.decoder, unadjustedStartDate: damlTypes.Date.decoder, }); }),
  encode: function (__typed__) {
  return {
    adjustedEndDate: damlTypes.Date.encode(__typed__.adjustedEndDate),
    adjustedStartDate: damlTypes.Date.encode(__typed__.adjustedStartDate),
    unadjustedEndDate: damlTypes.Date.encode(__typed__.unadjustedEndDate),
    unadjustedStartDate: damlTypes.Date.encode(__typed__.unadjustedStartDate),
  };
}
,
};



exports.PeriodicSchedule = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({effectiveDate: damlTypes.Date.decoder, terminationDate: damlTypes.Date.decoder, firstRegularPeriodStartDate: damlTypes.Optional(damlTypes.Date).decoder, lastRegularPeriodEndDate: damlTypes.Optional(damlTypes.Date).decoder, frequency: exports.Frequency.decoder, businessDayAdjustment: DA_Finance_Base_HolidayCalendar.BusinessDayAdjustment.decoder, effectiveDateBusinessDayAdjustment: damlTypes.Optional(DA_Finance_Base_HolidayCalendar.BusinessDayAdjustment).decoder, terminationDateBusinessDayAdjustment: damlTypes.Optional(DA_Finance_Base_HolidayCalendar.BusinessDayAdjustment).decoder, stubPeriodType: damlTypes.Optional(exports.StubPeriodTypeEnum).decoder, }); }),
  encode: function (__typed__) {
  return {
    effectiveDate: damlTypes.Date.encode(__typed__.effectiveDate),
    terminationDate: damlTypes.Date.encode(__typed__.terminationDate),
    firstRegularPeriodStartDate: damlTypes.Optional(damlTypes.Date).encode(__typed__.firstRegularPeriodStartDate),
    lastRegularPeriodEndDate: damlTypes.Optional(damlTypes.Date).encode(__typed__.lastRegularPeriodEndDate),
    frequency: exports.Frequency.encode(__typed__.frequency),
    businessDayAdjustment: DA_Finance_Base_HolidayCalendar.BusinessDayAdjustment.encode(__typed__.businessDayAdjustment),
    effectiveDateBusinessDayAdjustment: damlTypes.Optional(DA_Finance_Base_HolidayCalendar.BusinessDayAdjustment).encode(__typed__.effectiveDateBusinessDayAdjustment),
    terminationDateBusinessDayAdjustment: damlTypes.Optional(DA_Finance_Base_HolidayCalendar.BusinessDayAdjustment).encode(__typed__.terminationDateBusinessDayAdjustment),
    stubPeriodType: damlTypes.Optional(exports.StubPeriodTypeEnum).encode(__typed__.stubPeriodType),
  };
}
,
};



exports.Frequency = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({period: DA_Finance_Base_RollConvention.PeriodEnum.decoder, periodMultiplier: damlTypes.Int.decoder, rollConvention: DA_Finance_Base_RollConvention.RollConventionEnum.decoder, }); }),
  encode: function (__typed__) {
  return {
    period: DA_Finance_Base_RollConvention.PeriodEnum.encode(__typed__.period),
    periodMultiplier: damlTypes.Int.encode(__typed__.periodMultiplier),
    rollConvention: DA_Finance_Base_RollConvention.RollConventionEnum.encode(__typed__.rollConvention),
  };
}
,
};



exports.StubPeriodTypeEnum = {
  LONG_FINAL: 'LONG_FINAL',
  LONG_INITIAL: 'LONG_INITIAL',
  SHORT_FINAL: 'SHORT_FINAL',
  SHORT_INITIAL: 'SHORT_INITIAL',
  keys: ['LONG_FINAL','LONG_INITIAL','SHORT_FINAL','SHORT_INITIAL',],
  decoder: damlTypes.lazyMemo(function () { return jtv.oneOf(jtv.constant(exports.StubPeriodTypeEnum.LONG_FINAL), jtv.constant(exports.StubPeriodTypeEnum.LONG_INITIAL), jtv.constant(exports.StubPeriodTypeEnum.SHORT_FINAL), jtv.constant(exports.StubPeriodTypeEnum.SHORT_INITIAL)); }),
  encode: function (__typed__) { return __typed__; },
};

