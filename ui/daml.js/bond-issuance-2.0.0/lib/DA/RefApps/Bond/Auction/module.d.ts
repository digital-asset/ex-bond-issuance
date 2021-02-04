// Generated from DA/RefApps/Bond/Auction.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

import * as pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7 from '@daml.js/40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 from '@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662';
import * as pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc from '@daml.js/finlib-1.0.0';

import * as DA_RefApps_Bond_FixedRateBond from '../../../../DA/RefApps/Bond/FixedRateBond/module';
import * as DA_RefApps_Bond_Lock from '../../../../DA/RefApps/Bond/Lock/module';
import * as DA_RefApps_Bond_Settlement from '../../../../DA/RefApps/Bond/Settlement/module';
import * as DA_RefApps_Bond_Util from '../../../../DA/RefApps/Bond/Util/module';

export declare type AuctionParticipantSettleRequest_Settle = {
};

export declare const AuctionParticipantSettleRequest_Settle:
  damlTypes.Serializable<AuctionParticipantSettleRequest_Settle> & {
  }
;


export declare type AuctionParticipantSettleRequest = {
  investor: damlTypes.Party;
  issuer: damlTypes.Party;
  auctionAgent: damlTypes.Party;
  auctionName: string;
  settleRequestCids: damlTypes.ContractId<DA_RefApps_Bond_Settlement.AuctionSettleRequest>[];
  invalidBidNotificationCids: damlTypes.ContractId<InvalidBidNotification>[];
  cashProvider: damlTypes.Party;
  regulators: damlTypes.Party[];
};

export declare const AuctionParticipantSettleRequest:
  damlTypes.Template<AuctionParticipantSettleRequest, undefined, '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Auction:AuctionParticipantSettleRequest'> & {
  Archive: damlTypes.Choice<AuctionParticipantSettleRequest, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
  AuctionParticipantSettleRequest_Settle: damlTypes.Choice<AuctionParticipantSettleRequest, AuctionParticipantSettleRequest_Settle, damlTypes.ContractId<DA_RefApps_Bond_Settlement.InvestorSettlement>, undefined>;
};

export declare namespace AuctionParticipantSettleRequest {
  export type CreateEvent = damlLedger.CreateEvent<AuctionParticipantSettleRequest, undefined, typeof AuctionParticipantSettleRequest.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<AuctionParticipantSettleRequest, typeof AuctionParticipantSettleRequest.templateId>
  export type Event = damlLedger.Event<AuctionParticipantSettleRequest, undefined, typeof AuctionParticipantSettleRequest.templateId>
  export type QueryResult = damlLedger.QueryResult<AuctionParticipantSettleRequest, undefined, typeof AuctionParticipantSettleRequest.templateId>
}



export declare type InvalidBidNotification = {
  bid: AuctionBid;
  reason: string;
  regulators: damlTypes.Party[];
};

export declare const InvalidBidNotification:
  damlTypes.Template<InvalidBidNotification, undefined, '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Auction:InvalidBidNotification'> & {
  Archive: damlTypes.Choice<InvalidBidNotification, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
};

export declare namespace InvalidBidNotification {
  export type CreateEvent = damlLedger.CreateEvent<InvalidBidNotification, undefined, typeof InvalidBidNotification.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<InvalidBidNotification, typeof InvalidBidNotification.templateId>
  export type Event = damlLedger.Event<InvalidBidNotification, undefined, typeof InvalidBidNotification.templateId>
  export type QueryResult = damlLedger.QueryResult<InvalidBidNotification, undefined, typeof InvalidBidNotification.templateId>
}



export declare type AuctionInvitation_Accept = {
  auctionName: string;
};

export declare const AuctionInvitation_Accept:
  damlTypes.Serializable<AuctionInvitation_Accept> & {
  }
;


export declare type AuctionInvitation = {
  auction: Auction;
};

export declare const AuctionInvitation:
  damlTypes.Template<AuctionInvitation, undefined, '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Auction:AuctionInvitation'> & {
  AuctionInvitation_Accept: damlTypes.Choice<AuctionInvitation, AuctionInvitation_Accept, damlTypes.ContractId<Auction>, undefined>;
  Archive: damlTypes.Choice<AuctionInvitation, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
};

export declare namespace AuctionInvitation {
  export type CreateEvent = damlLedger.CreateEvent<AuctionInvitation, undefined, typeof AuctionInvitation.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<AuctionInvitation, typeof AuctionInvitation.templateId>
  export type Event = damlLedger.Event<AuctionInvitation, undefined, typeof AuctionInvitation.templateId>
  export type QueryResult = damlLedger.QueryResult<AuctionInvitation, undefined, typeof AuctionInvitation.templateId>
}



export declare type AuctionBid_DiscardInvalid = {
  reason: string;
};

export declare const AuctionBid_DiscardInvalid:
  damlTypes.Serializable<AuctionBid_DiscardInvalid> & {
  }
;


export declare type AuctionBid = {
  bidder: damlTypes.Party;
  auctionAgent: damlTypes.Party;
  issuer: damlTypes.Party;
  bidData: BidData;
  auctionName: string;
  bondAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id;
  investorBondAssetSettlementCid: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement>;
  regulators: damlTypes.Party[];
};

export declare const AuctionBid:
  damlTypes.Template<AuctionBid, undefined, '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Auction:AuctionBid'> & {
  Archive: damlTypes.Choice<AuctionBid, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
  AuctionBid_DiscardInvalid: damlTypes.Choice<AuctionBid, AuctionBid_DiscardInvalid, damlTypes.ContractId<InvalidBidNotification>, undefined>;
};

export declare namespace AuctionBid {
  export type CreateEvent = damlLedger.CreateEvent<AuctionBid, undefined, typeof AuctionBid.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<AuctionBid, typeof AuctionBid.templateId>
  export type Event = damlLedger.Event<AuctionBid, undefined, typeof AuctionBid.templateId>
  export type QueryResult = damlLedger.QueryResult<AuctionBid, undefined, typeof AuctionBid.templateId>
}



export declare type PlaceBidBotTrigger_Revoke = {
};

export declare const PlaceBidBotTrigger_Revoke:
  damlTypes.Serializable<PlaceBidBotTrigger_Revoke> & {
  }
;


export declare type PlaceBidBotTrigger_LockCash = {
  cashDepositCids: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit>[];
  cashAssetFungibleCid: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetFungible>;
  lockRuleCid: damlTypes.ContractId<DA_RefApps_Bond_Lock.AssetLockRule>;
  investorBondAssetSettlementCid: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Rule.Asset.AssetSettlement>;
};

export declare const PlaceBidBotTrigger_LockCash:
  damlTypes.Serializable<PlaceBidBotTrigger_LockCash> & {
  }
;


export declare type PlaceBidBotTrigger = {
  cashAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id;
  cashProvider: damlTypes.Party;
  bondProvider: damlTypes.Party;
  bidder: damlTypes.Party;
  auctionAgent: damlTypes.Party;
  issuer: damlTypes.Party;
  bidData: BidData;
  auctionName: string;
  bondAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id;
  regulators: damlTypes.Party[];
};

export declare const PlaceBidBotTrigger:
  damlTypes.Template<PlaceBidBotTrigger, undefined, '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Auction:PlaceBidBotTrigger'> & {
  PlaceBidBotTrigger_LockCash: damlTypes.Choice<PlaceBidBotTrigger, PlaceBidBotTrigger_LockCash, pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Either<damlTypes.ContractId<InvalidBidNotification>, pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple3<damlTypes.ContractId<DA_RefApps_Bond_Lock.AuctionLockedCash>, damlTypes.ContractId<AuctionBid>, damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit>[]>>, undefined>;
  PlaceBidBotTrigger_Revoke: damlTypes.Choice<PlaceBidBotTrigger, PlaceBidBotTrigger_Revoke, {}, undefined>;
  Archive: damlTypes.Choice<PlaceBidBotTrigger, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
};

export declare namespace PlaceBidBotTrigger {
  export type CreateEvent = damlLedger.CreateEvent<PlaceBidBotTrigger, undefined, typeof PlaceBidBotTrigger.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<PlaceBidBotTrigger, typeof PlaceBidBotTrigger.templateId>
  export type Event = damlLedger.Event<PlaceBidBotTrigger, undefined, typeof PlaceBidBotTrigger.templateId>
  export type QueryResult = damlLedger.QueryResult<PlaceBidBotTrigger, undefined, typeof PlaceBidBotTrigger.templateId>
}



export declare type AuctionBidderParticipation_Archive = {
};

export declare const AuctionBidderParticipation_Archive:
  damlTypes.Serializable<AuctionBidderParticipation_Archive> & {
  }
;


export declare type AuctionBidderParticipantion_RevokeLockedBid = {
  auctionBidCid: damlTypes.ContractId<AuctionBid>;
  auctionLockedCashCid: damlTypes.ContractId<DA_RefApps_Bond_Lock.AuctionLockedCash>;
};

export declare const AuctionBidderParticipantion_RevokeLockedBid:
  damlTypes.Serializable<AuctionBidderParticipantion_RevokeLockedBid> & {
  }
;


export declare type BidderParticipation_PlaceBid = {
  price: damlTypes.Numeric;
  quantity: damlTypes.Int;
};

export declare const BidderParticipation_PlaceBid:
  damlTypes.Serializable<BidderParticipation_PlaceBid> & {
  }
;


export declare type BidderParticipation = {
  bidder: damlTypes.Party;
  auctionAgent: damlTypes.Party;
  issuer: damlTypes.Party;
  operator: damlTypes.Party;
  regulators: damlTypes.Party[];
  startDate: damlTypes.Date;
  endDate: damlTypes.Date;
  size: damlTypes.Int;
  fixedRateBondFact: DA_RefApps_Bond_FixedRateBond.FixedRateBondFact;
  cashAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id;
  issuerCashAccountProvider: damlTypes.Party;
  auctionName: string;
};

export declare const BidderParticipation:
  damlTypes.Template<BidderParticipation, undefined, '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Auction:BidderParticipation'> & {
  BidderParticipation_PlaceBid: damlTypes.Choice<BidderParticipation, BidderParticipation_PlaceBid, damlTypes.ContractId<PlaceBidBotTrigger>, undefined>;
  AuctionBidderParticipantion_RevokeLockedBid: damlTypes.Choice<BidderParticipation, AuctionBidderParticipantion_RevokeLockedBid, damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit>, undefined>;
  AuctionBidderParticipation_Archive: damlTypes.Choice<BidderParticipation, AuctionBidderParticipation_Archive, {}, undefined>;
  Archive: damlTypes.Choice<BidderParticipation, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
};

export declare namespace BidderParticipation {
  export type CreateEvent = damlLedger.CreateEvent<BidderParticipation, undefined, typeof BidderParticipation.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<BidderParticipation, typeof BidderParticipation.templateId>
  export type Event = damlLedger.Event<BidderParticipation, undefined, typeof BidderParticipation.templateId>
  export type QueryResult = damlLedger.QueryResult<BidderParticipation, undefined, typeof BidderParticipation.templateId>
}



export declare type AuctionFinalizeBotTrigger_AllocateBond = {
  participationCids: damlTypes.ContractId<BidderParticipation>[];
  bidCids: damlTypes.ContractId<AuctionBid>[];
};

export declare const AuctionFinalizeBotTrigger_AllocateBond:
  damlTypes.Serializable<AuctionFinalizeBotTrigger_AllocateBond> & {
  }
;


export declare type AuctionFinalizeBotTrigger = {
  auctionAgent: damlTypes.Party;
  issuer: damlTypes.Party;
  regulators: damlTypes.Party[];
  minPrice: damlTypes.Numeric;
  size: damlTypes.Int;
  issuerCashAccountProvider: damlTypes.Party;
  bondBundleData: DA_RefApps_Bond_Util.BondBundleData;
  cashAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id;
  invitedBidders: damlTypes.Party[];
  auctionName: string;
};

export declare const AuctionFinalizeBotTrigger:
  damlTypes.Template<AuctionFinalizeBotTrigger, undefined, '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Auction:AuctionFinalizeBotTrigger'> & {
  AuctionFinalizeBotTrigger_AllocateBond: damlTypes.Choice<AuctionFinalizeBotTrigger, AuctionFinalizeBotTrigger_AllocateBond, pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2<damlTypes.ContractId<AuctionParticipantSettleRequest>[], damlTypes.Optional<damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit>>>, undefined>;
  Archive: damlTypes.Choice<AuctionFinalizeBotTrigger, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
};

export declare namespace AuctionFinalizeBotTrigger {
  export type CreateEvent = damlLedger.CreateEvent<AuctionFinalizeBotTrigger, undefined, typeof AuctionFinalizeBotTrigger.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<AuctionFinalizeBotTrigger, typeof AuctionFinalizeBotTrigger.templateId>
  export type Event = damlLedger.Event<AuctionFinalizeBotTrigger, undefined, typeof AuctionFinalizeBotTrigger.templateId>
  export type QueryResult = damlLedger.QueryResult<AuctionFinalizeBotTrigger, undefined, typeof AuctionFinalizeBotTrigger.templateId>
}



export declare type Auction_Finalize = {
};

export declare const Auction_Finalize:
  damlTypes.Serializable<Auction_Finalize> & {
  }
;


export declare type Auction_InviteBidders = {
  bidders: damlTypes.Party[];
};

export declare const Auction_InviteBidders:
  damlTypes.Serializable<Auction_InviteBidders> & {
  }
;


export declare type Auction = {
  auctionAgent: damlTypes.Party;
  issuer: damlTypes.Party;
  operator: damlTypes.Party;
  regulators: damlTypes.Party[];
  startDate: damlTypes.Date;
  endDate: damlTypes.Date;
  minPrice: damlTypes.Numeric;
  size: damlTypes.Int;
  fixedRateBondFact: DA_RefApps_Bond_FixedRateBond.FixedRateBondFact;
  cashAssetId: pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Types.Id;
  issuerCashAccountProvider: damlTypes.Party;
  bondBundleData: DA_RefApps_Bond_Util.BondBundleData;
  invitedBidders: damlTypes.Party[];
  auctionName: string;
};

export declare const Auction:
  damlTypes.Template<Auction, undefined, '33f987f8f09c0c7578fa237ab0da7a2a0c75319b08d76a2c9e1fd9db88165bc1:DA.RefApps.Bond.Auction:Auction'> & {
  Auction_InviteBidders: damlTypes.Choice<Auction, Auction_InviteBidders, pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2<damlTypes.ContractId<Auction>, damlTypes.ContractId<BidderParticipation>[]>, undefined>;
  Auction_Finalize: damlTypes.Choice<Auction, Auction_Finalize, damlTypes.ContractId<AuctionFinalizeBotTrigger>, undefined>;
  Archive: damlTypes.Choice<Auction, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
};

export declare namespace Auction {
  export type CreateEvent = damlLedger.CreateEvent<Auction, undefined, typeof Auction.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<Auction, typeof Auction.templateId>
  export type Event = damlLedger.Event<Auction, undefined, typeof Auction.templateId>
  export type QueryResult = damlLedger.QueryResult<Auction, undefined, typeof Auction.templateId>
}



export declare type BidWithAssetData = {
  bidData: BidData;
  auctionBidCid: damlTypes.ContractId<AuctionBid>;
  bondAssetDepositCid: damlTypes.ContractId<pkgf2ed87d6193c1d2cdd7a15a0eed149f58026f6979b2576c59a647257d1cd27fc.DA.Finance.Fact.Asset.AssetDeposit>;
};

export declare const BidWithAssetData:
  damlTypes.Serializable<BidWithAssetData> & {
  }
;


export declare type ResultData = {
  price: damlTypes.Numeric;
  allocatedQuantity: damlTypes.Int;
  awardedBids: SortableBidData[];
  invalidBids: SortableBidData[];
};

export declare const ResultData:
  damlTypes.Serializable<ResultData> & {
  }
;


export declare type SortableBidData = {
  bidData: BidData;
  auctionBidCid: damlTypes.ContractId<AuctionBid>;
};

export declare const SortableBidData:
  damlTypes.Serializable<SortableBidData> & {
  }
;


export declare type BidData = {
  price: damlTypes.Numeric;
  quantity: damlTypes.Int;
  submissionTime: damlTypes.Time;
};

export declare const BidData:
  damlTypes.Serializable<BidData> & {
  }
;


export declare type AuctionData = {
  auctionSize: damlTypes.Int;
  limitPrice: damlTypes.Numeric;
};

export declare const AuctionData:
  damlTypes.Serializable<AuctionData> & {
  }
;

