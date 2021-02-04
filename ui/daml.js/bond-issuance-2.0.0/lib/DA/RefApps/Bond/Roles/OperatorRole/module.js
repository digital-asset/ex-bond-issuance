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

var DA_RefApps_Bond_Roles_AuctionAgentRole = require('../../../../../DA/RefApps/Bond/Roles/AuctionAgentRole/module');
var DA_RefApps_Bond_Roles_BankRole = require('../../../../../DA/RefApps/Bond/Roles/BankRole/module');
var DA_RefApps_Bond_Roles_CentralBankRole = require('../../../../../DA/RefApps/Bond/Roles/CentralBankRole/module');
var DA_RefApps_Bond_Roles_CsdRole = require('../../../../../DA/RefApps/Bond/Roles/CsdRole/module');
var DA_RefApps_Bond_Roles_IssuerRole = require('../../../../../DA/RefApps/Bond/Roles/IssuerRole/module');


exports.OperatorRole_InviteCentralBank = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({centralBank: damlTypes.Party.decoder, }); }),
  encode: function (__typed__) {
  return {
    centralBank: damlTypes.Party.encode(__typed__.centralBank),
  };
}
,
};



exports.OperatorRole_InviteIssuer = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({issuer: damlTypes.Party.decoder, bondProvider: damlTypes.Party.decoder, cashProvider: damlTypes.Party.decoder, auctionAgent: damlTypes.Party.decoder, }); }),
  encode: function (__typed__) {
  return {
    issuer: damlTypes.Party.encode(__typed__.issuer),
    bondProvider: damlTypes.Party.encode(__typed__.bondProvider),
    cashProvider: damlTypes.Party.encode(__typed__.cashProvider),
    auctionAgent: damlTypes.Party.encode(__typed__.auctionAgent),
  };
}
,
};



exports.OperatorRole_InviteCsd = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({csd: damlTypes.Party.decoder, }); }),
  encode: function (__typed__) {
  return {
    csd: damlTypes.Party.encode(__typed__.csd),
  };
}
,
};



exports.OperatorRole_InviteBank = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({bank: damlTypes.Party.decoder, }); }),
  encode: function (__typed__) {
  return {
    bank: damlTypes.Party.encode(__typed__.bank),
  };
}
,
};



exports.OperatorRole_InviteAuctionAgent = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({auctionAgent: damlTypes.Party.decoder, }); }),
  encode: function (__typed__) {
  return {
    auctionAgent: damlTypes.Party.encode(__typed__.auctionAgent),
  };
}
,
};



exports.OperatorRole = {
  templateId: '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Roles.OperatorRole:OperatorRole',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({operator: damlTypes.Party.decoder, regulators: damlTypes.List(damlTypes.Party).decoder, }); }),
  encode: function (__typed__) {
  return {
    operator: damlTypes.Party.encode(__typed__.operator),
    regulators: damlTypes.List(damlTypes.Party).encode(__typed__.regulators),
  };
}
,
  OperatorRole_InviteAuctionAgent: {
    template: function () { return exports.OperatorRole; },
    choiceName: 'OperatorRole_InviteAuctionAgent',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.OperatorRole_InviteAuctionAgent.decoder; }),
    argumentEncode: function (__typed__) { return exports.OperatorRole_InviteAuctionAgent.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(DA_RefApps_Bond_Roles_AuctionAgentRole.AuctionAgentRoleInvitation).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(DA_RefApps_Bond_Roles_AuctionAgentRole.AuctionAgentRoleInvitation).encode(__typed__); },
  },
  OperatorRole_InviteBank: {
    template: function () { return exports.OperatorRole; },
    choiceName: 'OperatorRole_InviteBank',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.OperatorRole_InviteBank.decoder; }),
    argumentEncode: function (__typed__) { return exports.OperatorRole_InviteBank.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(DA_RefApps_Bond_Roles_BankRole.BankRoleInvitation).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(DA_RefApps_Bond_Roles_BankRole.BankRoleInvitation).encode(__typed__); },
  },
  OperatorRole_InviteCsd: {
    template: function () { return exports.OperatorRole; },
    choiceName: 'OperatorRole_InviteCsd',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.OperatorRole_InviteCsd.decoder; }),
    argumentEncode: function (__typed__) { return exports.OperatorRole_InviteCsd.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(DA_RefApps_Bond_Roles_CsdRole.CsdRoleInvitation).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(DA_RefApps_Bond_Roles_CsdRole.CsdRoleInvitation).encode(__typed__); },
  },
  OperatorRole_InviteIssuer: {
    template: function () { return exports.OperatorRole; },
    choiceName: 'OperatorRole_InviteIssuer',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.OperatorRole_InviteIssuer.decoder; }),
    argumentEncode: function (__typed__) { return exports.OperatorRole_InviteIssuer.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(DA_RefApps_Bond_Roles_IssuerRole.IssuerRoleInvitation).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(DA_RefApps_Bond_Roles_IssuerRole.IssuerRoleInvitation).encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.OperatorRole; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  OperatorRole_InviteCentralBank: {
    template: function () { return exports.OperatorRole; },
    choiceName: 'OperatorRole_InviteCentralBank',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.OperatorRole_InviteCentralBank.decoder; }),
    argumentEncode: function (__typed__) { return exports.OperatorRole_InviteCentralBank.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(DA_RefApps_Bond_Roles_CentralBankRole.CentralBankRoleInvitation).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(DA_RefApps_Bond_Roles_CentralBankRole.CentralBankRoleInvitation).encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.OperatorRole);

