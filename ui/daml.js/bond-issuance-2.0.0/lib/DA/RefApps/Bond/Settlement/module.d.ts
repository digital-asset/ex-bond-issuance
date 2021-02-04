// Generated from DA/RefApps/Bond/Settlement.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 from '@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662';
import * as pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc from '@daml.js/finlib-1.0.0';

import * as DA_RefApps_Bond_Lock from '../../../../DA/RefApps/Bond/Lock/module';
import * as DA_RefApps_Bond_Redemption from '../../../../DA/RefApps/Bond/Redemption/module';

export declare type InvestorSettlement_Finalize = {
  auctionLockedCashCids: damlTypes.ContractId<DA_RefApps_Bond_Lock.AuctionLockedCash>[];
  cashAssetFungible: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetFungible>;
  investorCashSettlementCid: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement>;
};

export declare const InvestorSettlement_Finalize:
  damlTypes.Serializable<InvestorSettlement_Finalize> & {
  }
;


export declare type InvestorSettlement = {
  investor: damlTypes.Party;
  issuer: damlTypes.Party;
  auctionAgent: damlTypes.Party;
  auctionName: string;
  settleRequestCids: damlTypes.ContractId<AuctionSettleRequest>[];
  cashProvider: damlTypes.Party;
  regulators: damlTypes.Party[];
};

export declare const InvestorSettlement:
  damlTypes.Template<InvestorSettlement, undefined, '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Settlement:InvestorSettlement'> & {
  Archive: damlTypes.Choice<InvestorSettlement, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
  InvestorSettlement_Finalize: damlTypes.Choice<InvestorSettlement, InvestorSettlement_Finalize, damlTypes.ContractId<DA_RefApps_Bond_Redemption.RedemptionPayoutInfo>[], undefined>;
};

export declare namespace InvestorSettlement {
  export type CreateEvent = damlLedger.CreateEvent<InvestorSettlement, undefined, typeof InvestorSettlement.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<InvestorSettlement, typeof InvestorSettlement.templateId>
  export type Event = damlLedger.Event<InvestorSettlement, undefined, typeof InvestorSettlement.templateId>
  export type QueryResult = damlLedger.QueryResult<InvestorSettlement, undefined, typeof InvestorSettlement.templateId>
}



export declare type AuctionSettleRequest = {
  investor: damlTypes.Party;
  issuer: damlTypes.Party;
  auctionAgent: damlTypes.Party;
  auctionName: string;
  issuerCashAccountProvider: damlTypes.Party;
  issuerBondAssetDepositCid: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit>;
  issuerBondAssetDeposit: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit;
  cashAmountToPay: damlTypes.Numeric;
  bondSettlementChainCid: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlementChain>;
  issuerCashSettlementCid: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement>;
  cashAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id;
  regulators: damlTypes.Party[];
};

export declare const AuctionSettleRequest:
  damlTypes.Template<AuctionSettleRequest, undefined, '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Settlement:AuctionSettleRequest'> & {
  Archive: damlTypes.Choice<AuctionSettleRequest, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
};

export declare namespace AuctionSettleRequest {
  export type CreateEvent = damlLedger.CreateEvent<AuctionSettleRequest, undefined, typeof AuctionSettleRequest.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<AuctionSettleRequest, typeof AuctionSettleRequest.templateId>
  export type Event = damlLedger.Event<AuctionSettleRequest, undefined, typeof AuctionSettleRequest.templateId>
  export type QueryResult = damlLedger.QueryResult<AuctionSettleRequest, undefined, typeof AuctionSettleRequest.templateId>
}


