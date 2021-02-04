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


exports.AuctionAgentRole = {
  templateId: '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Roles.AuctionAgentRole:AuctionAgentRole',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({auctionAgent: damlTypes.Party.decoder, operator: damlTypes.Party.decoder, regulators: damlTypes.List(damlTypes.Party).decoder, }); }),
  encode: function (__typed__) {
  return {
    auctionAgent: damlTypes.Party.encode(__typed__.auctionAgent),
    operator: damlTypes.Party.encode(__typed__.operator),
    regulators: damlTypes.List(damlTypes.Party).encode(__typed__.regulators),
  };
}
,
  Archive: {
    template: function () { return exports.AuctionAgentRole; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.AuctionAgentRole);



exports.AuctionAgentRoleInvitation_Revoke = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.AuctionAgentRoleInvitation_Reject = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.AuctionAgentRoleInvitation_Accept = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.AuctionAgentRoleInvitation = {
  templateId: '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Roles.AuctionAgentRole:AuctionAgentRoleInvitation',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({auctionAgent: damlTypes.Party.decoder, operator: damlTypes.Party.decoder, regulators: damlTypes.List(damlTypes.Party).decoder, }); }),
  encode: function (__typed__) {
  return {
    auctionAgent: damlTypes.Party.encode(__typed__.auctionAgent),
    operator: damlTypes.Party.encode(__typed__.operator),
    regulators: damlTypes.List(damlTypes.Party).encode(__typed__.regulators),
  };
}
,
  Archive: {
    template: function () { return exports.AuctionAgentRoleInvitation; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  AuctionAgentRoleInvitation_Reject: {
    template: function () { return exports.AuctionAgentRoleInvitation; },
    choiceName: 'AuctionAgentRoleInvitation_Reject',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.AuctionAgentRoleInvitation_Reject.decoder; }),
    argumentEncode: function (__typed__) { return exports.AuctionAgentRoleInvitation_Reject.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  AuctionAgentRoleInvitation_Revoke: {
    template: function () { return exports.AuctionAgentRoleInvitation; },
    choiceName: 'AuctionAgentRoleInvitation_Revoke',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.AuctionAgentRoleInvitation_Revoke.decoder; }),
    argumentEncode: function (__typed__) { return exports.AuctionAgentRoleInvitation_Revoke.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  AuctionAgentRoleInvitation_Accept: {
    template: function () { return exports.AuctionAgentRoleInvitation; },
    choiceName: 'AuctionAgentRoleInvitation_Accept',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.AuctionAgentRoleInvitation_Accept.decoder; }),
    argumentEncode: function (__typed__) { return exports.AuctionAgentRoleInvitation_Accept.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.AuctionAgentRole).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.AuctionAgentRole).encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.AuctionAgentRoleInvitation);

