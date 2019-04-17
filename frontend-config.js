/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import { DamlLfValue } from '@da/ui-core';

export const version = {
    schema: 'navigator-config',
    major: 2,
    minor: 0
};


// --- Creating views --------------------------------------------------------------------

const auctionAgentInvitationView = createTab("Auction Agent Invitations", ":AuctionAgentRoleInvitation@", [
    createIdCol(),
    createCol("auctionAgent"),
    createCol("regulators")
]);

const centralBankInvitationView = createTab("Central Bank Invitations", ":CentralBankRoleInvitation@", [
    createIdCol(),
    createCol("centralBank"),
    createCol("regulators")
]);

const csdInvitationView = createTab("CSD Invitations", ":CsdRoleInvitation@", [
    createIdCol(),
    createCol("csd", "CSD"),
    createCol("regulators")
]);

const bankInvitationView = createTab("Bank Invitations", ":BankRoleInvitation@", [
    createIdCol(),
    createCol("bank"),
    createCol("regulators")
]);

const issuerInvitationView = createTab("Issuer Invitations", ":IssuerRoleInvitation@", [
    createIdCol(),
    createCol("issuer"),
    createCol("regulators")
]);

const auctionAgentRoleView = createTab("Auction Agent Actions", ":AuctionAgentRole@", [
    createIdCol(),
    createCol("auctionAgent", "Auction Agent", 80, r => r.auctionAgent),
    createCol("regulators")
]);

const operatorRoleView = createTab("Operator Actions", ":OperatorRole@", [
    createIdCol(),
    createCol("operator"),
    createCol("regulators")
]);

const centralBankRoleView = createTab("Central Bank Actions", ":CentralBankRole@", [
    createIdCol(),
    createCol("centralBank"),
    createCol("regulators")
]);

const csdRoleView = createTab("CSD Actions", ":CsdRole@", [
    createIdCol(),
    createCol("csd", "CSD"),
    createCol("regulators")
]);

const csdRedemptionView = createTab("Redemption Requests", ":RedemptionRequest@", [
    createIdCol(),
    createCol("issuer", "Issuer"),
    createCol("instrument", "Instrument", null, r => r.bondInstrumentId.label),
]);

const bankRoleView = createTab("Bank Actions", ":BankRole@", [
    createIdCol(),
    createCol("bank"),
    createCol("regulators")
]);

const invalidBidsView = createTab("Invalid Bids", ":InvalidBidNotification@", [
    createIdCol(),
    createCol("auctionAgent", "Auction Agent", null, r => r.bid.auctionAgent),
    createCol("auctionName", "Auction Name", null, r => r.bid.auctionName),
    createCol("bidPrice", "Price", null, r => r.bid.bidData.price),
    createCol("bidQuantity", "Quantity", null, r => r.bid.bidData.quantity),
    createCol("reason", null, 500),
]);

const bidderParticipationView = createTab("Participating Bidders", ":BidderParticipation@", [
    createIdCol(),
    createCol("auctionAgent"),
    createCol("auctionName"),
    createCol("bidder"),
    createCol("issuer"),
    createCol("size"),
    createCol("startDate"),
    createCol("endDate"),
]);

const ongoingAuctionsForBiddersView = createTab("Ongoing Auctions", ":BidderParticipation@", [
    createIdCol(),
    createCol("auctionAgent"),
    createCol("auctionName"),
    createCol("bidder"),
    createCol("issuer"),
    createCol("size"),
    createCol("startDate"),
    createCol("endDate"),
    createCol("bondName", null, null, r => r.fixedRateBondFact.instrumentId.label),
    createCol("denomination", null, null, r => r.fixedRateBondFact.denomination),
    createCol("rate", null, null, r => r.fixedRateBondFact.rate),
    createCol("maturityDate", null, null, r => r.fixedRateBondFact.maturityDate),
]);


const issuerRoleView = createTab("Issuer Actions", ":IssuerRole@", [
    createIdCol(),
    createCol("issuer"),
    createCol("regulators")
]);

const ongoingAuctionsView = createTab("Ongoing Auctions", ":Auction@", [
    createIdCol(),
    createCol("auctionName", null, 120),
    createCol("issuer"),
    createCol("asset", "Asset", null, r => r.bondBundleData.assetLabel),
    createCol("size"),
    createCol("auctionType", "Type", null, r => "Dutch"),
    createCol("from", "Auction start", 80, r => r.startDate),
    createCol("to", "Auction end", 80, r => r.endDate),
    createCol("minPrice"),
    createCol("auctionAgent")
]);

function accountBalanceView(owner) {
    return createTab("Balance", ":AssetFact@",
        [
            createIdCol(),
            createCol("owner", "Owner", 80, r => r.accountId.owner),
            createCol("account", "Account", 80, r => r.accountId.identifier),
            createCol("account", "Account Provider", 80, r => r.accountId.provider),
            createCol("quantity"),
            createCol("asset", "Asset Id", 80, r => r.assetId.instrumentId.label),
            createCol("issuer", "Issuer", 80, r => r.assetId.issuer),
        ],
        {
            field: "argument.accountId.owner",
            value: owner
        }
    );
}

const accountsView = createTab("Accounts", ":AccountFact@", [
    createIdCol(),
    createCol("identifier", null, null, r => r.accountId.identifier),
    createCol("owner", null, null, r => r.accountId.owner),
    createCol("priovider", null, null, r => r.accountId.provider),
    createCol("observers", null, 120),
]);

const bidView = createTab("Bids", ":AuctionBid@", [
    createIdCol(),
    createCol("auctionAgent"),
    createCol("auctionName"),
    createCol("bidder"),
    createCol("bidPrice", "Price", null, r => r.bidData.price),
    createCol("bidQuantity", "Quantity", null, r => r.bidData.quantity),
]);

const depositNewAssetView = createTab("Issuance and ISIN Request", ":IssuanceRequest@", [
    createIdCol(),
    createCol("issuer", "Requestor"),
    createCol("issueSize", "Quantity"),
]);

const pendingSettlementsViewForBanks = createTab("Pending Settlements", ":AuctionParticipantSettleRequest@", [
    createIdCol(),
    createCol("seller", "Seller", "", r => r.issuer),
    // delivery and payment legs are swapped by the FinLib
    createCol("auctionName"),
]);

const pendingSettlementsViewForIssuer = createTab("Pending Settlements", ":AuctionSettleRequest@", [
    createIdCol(),
    // seller and buyer are swapped by the FinLib
    createCol("buyer", "Buyer", "", r => r.allocationResultData.seller),
    // delivery and payment legs are swapped by the FinLib
    createCol("bond", "Bond", null, r => r.allocationResultData.assetId),
    createCol("quantity", "Quantity", null, r => r.allocationResultData.quantity),
    createCol("price", "Price", null, r => r.allocationResultData.amount / r.allocationResultData.quantity),
    createCol("amount", "Consideration", null, r => r.allocationResultData.amount),
    createCol("currency", "Currency", null, r => r.allocationResultData.currency),
]);

const auctionRequestView = createTab("Auction Request", ":AuctionInvitation@", [
    createIdCol(),
    createCol("issuer", "Requestor", null, r => r.auction.issuer),
    createCol("asset", "Asset", null, r => r.auction.bondBundleData.assetLabel),
    createCol("issueSize", "Quantity", null, r => r.auction.size),
]);


// --- Assigning vievs to parties --------------------------------------------------------------------

export const customViews = (userId, party, role) => {
    if (party == 'Operator') {
        return {
            issuerInvitationView,
            centralBankInvitationView,
            auctionAgentInvitationView,
            csdInvitationView,
            bankInvitationView,
            issuerRoleView,
            centralBankRoleView,
            auctionAgentRoleView,
            csdRoleView,
            bankRoleView
        };
    }

    var balanceView = accountBalanceView(party)
    if (party == 'Issuer') {
        return {
            issuerRoleView,
            accountsView,
            balanceView,
            ongoingAuctionsView,
            pendingSettlementsViewForIssuer
        };
    }

    if (party == 'AuctionAgent') {
        return {
            auctionAgentRoleView,
            accountsView,
            balanceView,
            auctionRequestView,
            ongoingAuctionsView,
            bidderParticipationView,
            bidView,
            invalidBidsView,
        };
    }

    if (party == 'CentralBank') {
        return {
            centralBankRoleView,
            accountsView,
            balanceView,
        };
    }

    if (party == 'CSD') {
        return {
            csdRoleView,
            accountsView,
            balanceView,
            depositNewAssetView,
            csdRedemptionView
        };
    }

    if (party == 'Regulator') {
        return {
            operatorRoleView,
            accountsView,
            balanceView,
            centralBankRoleView,
            issuerRoleView,
            auctionAgentRoleView,
            csdRoleView,
            bankRoleView
        };
    }

    if (party == "Bank1" || party == 'Bank2' || party == 'Bank3') {
        return {
            bankRoleView,
            accountsView,
            balanceView,
            ongoingAuctionsForBiddersView,
            bidView,
            invalidBidsView,
            pendingSettlementsViewForBanks
        }
    } else {
        return {
        };
    }
};


// --- Helpers --------------------------------------------------------------------

/**
 title, width and proj are optional

 if proj is null and key is "id" then it will default to the contract id
 if proj is null and key is not "id" then it will default to stringified single or array value of rowData.key
*/
function createCol(key, title = toTitle(key), width = 80, proj) {
    return {
        key: key,
        title: title,
        createCell: ({ rowData }) => ({
            type: "text",
            value: valueFunction(rowData, key, proj)
        }),
        sortable: true,
        width: width,
        weight: 0,
        alignment: "left"
    };
}

function createIdCol() {
    return createCol("id", "Contract ID", 60);
}

function createTab(name, templateId, columns, additionalFilter) {
    var filter;
    if (additionalFilter == null) {
        filter =
        [
            {
                field: "template.id",
                value: templateId
            }
        ]
    } else {
        filter =
        [
            {
                field: "template.id",
                value: templateId
            },
            additionalFilter
        ]
    }
    return {
        type: "table-view",
        title: name,
        source: {
            type: "contracts",
            filter: filter,
            search: "",
            sort: [
                {
                    field: "id",
                    direction: "ASCENDING"
                }
            ]
        },
        columns: columns
    };
}


function formatIfNum(val) {
    var n = Number(val);
    if (Number.isNaN(n)) return val;
    else return n.toLocaleString();
}

function valueFunction(rowData, key, proj) {
    return (
        proj == null
        ?
        (
            Array.isArray(DamlLfValue.toJSON(rowData.argument)[key])
            ?
            DamlLfValue.toJSON(rowData.argument)[key].join(", ")
            :
            (
                key == "id"
                ?
                rowData.id
                :
                formatIfNum(DamlLfValue.toJSON(rowData.argument)[key])
            )
        )
        :
        formatIfNum(proj(DamlLfValue.toJSON(rowData.argument))));
}

// inserts spaces into the usually camel-case key
// e.g. "assetISINCode" -> "Asset ISIN Code"
function toTitle(key) {
    var spaced = key.replace(/([^A-Z])([A-Z])/g, '$1 $2').replace(/([A-Z])([A-Z][^A-Z])/g, '$1 $2');
    return spaced[0].toUpperCase() + spaced.substr(1)
}
