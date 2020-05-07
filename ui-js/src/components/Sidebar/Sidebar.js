/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect } from "react";
import { useParty } from '@daml/react';
import { Drawer, IconButton, List } from "@material-ui/core";
import { green} from '@material-ui/core/colors';
import { List as ListIcon, TouchApp, Gavel, Update, CompareArrows, AttachMoney, Warning, ArrowBack, Build, CardMembership, DirectionsRun, ListAlt } from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import useStyles from "./styles";
import SidebarLink from "./components/SidebarLink/SidebarLink";
import { useLayoutState, useLayoutDispatch, toggleSidebar } from "../../context/LayoutContext";

const allParties = "All"

function Sidebar({ location }) {

  var sigObsMap = new Map([
    ['auctionAgentInvitationView', ["Operator"]],
    ['auctionAgentRoleView', ["AuctionAgent", "Operator", "Regulator"]],
    ['auctionRequestView', ["AuctionAgent"]],
    ['balanceView', ["AuctionAgent", "Bank1", "Bank2", "Bank3", "CentralBank", "CSD", "Issuer", "Regulator"]],
    ['bankInvitationView', ["Operator"]],
    ['bankRoleView', ["Bank1", "Bank2", "Bank3", "Operator", "Regulator"]],
    ['bidderParticipationView', ["AuctionAgent"]],
    ['bidView', ["AuctionAgent", "Bank1", "Bank2", "Bank3"]],
    ['centralBankInvitationView', ["Operator"]],
    ['centralBankRoleView', ["CentralBank", "Operator", "Regulator"]],
    ['csdInvitationView', ["Operator"]],
    ['csdRedemptionView', ["CSD"]],
    ['csdRoleView', ["CSD", "Operator", "Regulator"]],
    ['depositNewAssetView', ["CSD", "Issuer"]],
    ['invalidBidsView', ["AuctionAgent", "Bank1", "Bank2", "Bank3"]],
    ['issuerInvitationView', ["Operator"]],
    ['issuerRoleView', ["Issuer", "Operator", "Regulator"]],
    ['ongoingAuctionsForBiddersView', ["Bank1", "Bank2", "Bank3"]],
    ['ongoingAuctionsView', ["AuctionAgent", "Issuer"]],
    ['operatorRoleView', ["Regulator"]],
    ['pendingSettlementsViewForBanks', ["Bank1", "Bank2", "Bank3"]],
    ['pendingSettlementsViewForIssuer', ["Issuer"]],]);
  var panelNames = new Map([
    ['auctionAgentInvitationView', "Auction Agent Invitations"],
    ['centralBankInvitationView', "Central Bank Invitations"],
    ['csdInvitationView', "CSD Invitations"],
    ['bankInvitationView', "Bank Invitations"],
    ['issuerInvitationView', "Issuer Invitations"],
    ['auctionAgentRoleView', "Auction Agent Actions"],
    ['operatorRoleView', "Operator Actions"],
    ['centralBankRoleView', "Central Bank Actions"],
    ['csdRoleView', "CSD Actions"],
    ['csdRedemptionView', "Redemption Requests"],
    ['bankRoleView', "Bank Actions"],
    ['invalidBidsView', "Invalid Bids"],
    ['bidderParticipationView', "Participating Bidders"],
    ['ongoingAuctionsForBiddersView', "Ongoing Auctions"],
    ['issuerRoleView',"Issuer Actions"],
    ['ongoingAuctionsView',"Ongoing Auctions"],
    ['bidView',"Bids"],
    ['depositNewAssetView',"Issuance and ISIN Request"],
    ['pendingSettlementsViewForBanks',"Pending Settlements"],
    ['pendingSettlementsViewForIssuer',"Pending Settlements"],
    ['auctionRequestView',"Auction Request"],
    ['balanceView','Balance view']
  ]);

  var classes = useStyles();
  var theme = useTheme();
  const party = useParty();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function () {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  function AuctionAgentInvitation() {
    var panelMap = sigObsMap.get('auctionAgentInvitationView');
    if (panelMap.includes(party) || panelMap.includes(allParties)) {
      return (
        <SidebarLink
          key="AuctionAgentRole"
          label={panelNames.get('auctionAgentInvitationView') || "unassigned"}
          path="/app/auctionAgentInvitation"
          icon={(<CardMembership style={{ color: '#536DFE' }} />)}
          location={location}
          isSidebarOpened={isSidebarOpened}
        />
      );
    }
    return null;
  }
  function AuctionAgentRole() {
    var panelMap = sigObsMap.get('auctionAgentRoleView');
    if (panelMap.includes(party) || panelMap.includes(allParties)) {
      return (
        <SidebarLink
          key="AuctionAgentRole"
          label={panelNames.get('auctionAgentRoleView') || "unassigned"}
          path="/app/auctionAgentRole"
          icon={(<Build style={{ color: '#536DFE' }} />)}
          location={location}
          isSidebarOpened={isSidebarOpened}
        />
      );
    }
    return null;
  }
  function AuctionRequest() {
    var panelMap = sigObsMap.get('auctionRequestView');
    if (panelMap.includes(party) || panelMap.includes("All")) {
      return (
        <SidebarLink
          key="AuctionRequest"
          label={panelNames.get('auctionRequestView') || "unassigned"}
          path="/app/auctionRequest"
          icon={(<ListAlt style={{ color: '#536DFE' }}/>)}
          location={location}
          isSidebarOpened={isSidebarOpened}
        />);
    }
    return null;
  }
  function Balance() {
    var panelMap = sigObsMap.get('balanceView');
    if (panelMap.includes(party) || panelMap.includes("All")) {
      return (
        <SidebarLink
          key="Balance"
          label={panelNames.get('balanceView') || "unassigned"}
          path="/app/balance"
          icon={(<AttachMoney style={{ color: green[400] }} />)}
          location={location}
          isSidebarOpened={isSidebarOpened}
        />);
    }
    return null;
  }
  function BankInvitation() {
    var panelMap = sigObsMap.get('bankInvitationView');
    if (panelMap.includes(party) || panelMap.includes("All")) {
      return (
        <SidebarLink
          key="BankInvitation"
          label={panelNames.get('bankInvitationView') || "unassigned"}
          path="/app/bankInvitation"
          icon={(<CardMembership style={{ color: '#536DFE' }} />)}
          location={location}
          isSidebarOpened={isSidebarOpened}
        />);
    }
    return null;
  }
  function BankRole() {
    var panelMap = sigObsMap.get('bankRoleView');
    if (panelMap.includes(party) || panelMap.includes("All")) {
      return (
        <SidebarLink
          key="BankRole"
          label={panelNames.get('bankRoleView') || "unassigned"}
          path="/app/bankRole"
          icon={(<Build style={{ color: '#536DFE' }} />)}
          location={location}
          isSidebarOpened={isSidebarOpened}
        />);
    }
    return null;
  }
  function BidderParticipation() {
    var panelMap = sigObsMap.get('bidderParticipationView');
    if (panelMap.includes(party) || panelMap.includes("All")) {
      return (
        <SidebarLink
          key="BidderParticipation"
          label={panelNames.get('bidderParticipationView') || "unassigned"}
          path="/app/bidderParticipation"
          icon={(<DirectionsRun style={{ color: '#536DFE' }} />)}
          location={location}
          isSidebarOpened={isSidebarOpened}
        />);
    }
    return null;

  }
  function Bid() {
    var panelMap = sigObsMap.get('bidView');
    if (panelMap.includes(party) || panelMap.includes("All")) {
      return (
        <SidebarLink
          key="Bid"
          label={panelNames.get('bidView') || "unassigned"}
          path="/app/bid"
          icon={(<CompareArrows style={{ color: '#536DFE' }} />)}
          location={location}
          isSidebarOpened={isSidebarOpened}
        />);
    }
    return null;

  }
  function CentralBankInvitation() {
    var panelMap = sigObsMap.get('centralBankInvitationView');
    if (panelMap.includes(party) || panelMap.includes("All")) {
      return (
        <SidebarLink
          key="CentralBankInvitation"
          label={panelNames.get('centralBankInvitationView') || "unassigned"}
          path="/app/centralBankInvitation"
          icon={(<CardMembership style={{ color: '#536DFE' }} />)}
          location={location}
          isSidebarOpened={isSidebarOpened}
        />);
    }
    return null;

  }
  function CentralBankRole() {
    var panelMap = sigObsMap.get('centralBankRoleView');
    if (panelMap.includes(party) || panelMap.includes("All")) {
      return (
        <SidebarLink
          key="CentralBankRole"
          label={panelNames.get('centralBankRoleView') || "unassigned"}
          path="/app/centralBankRole"
          icon={(<Build style={{ color: '#536DFE' }} />)}
          location={location}
          isSidebarOpened={isSidebarOpened}
        />);
    }
    return null;

  }
  function CsdInvitation() {
    var panelMap = sigObsMap.get('csdInvitationView');
    if (panelMap.includes(party) || panelMap.includes("All")) {
      return (
        <SidebarLink
          key="CsdInvitation"
          label={panelNames.get('csdInvitationView') || "unassigned"}
          path="/app/csdInvitation"
          icon={(<CardMembership style={{ color: '#536DFE' }} />)}
          location={location}
          isSidebarOpened={isSidebarOpened}
        />);
    }
    return null;

  }
  function CsdRedemption() {
    var panelMap = sigObsMap.get('csdRedemptionView');
    if (panelMap.includes(party) || panelMap.includes("All")) {
      return (
        <SidebarLink
          key="CsdRedemption"
          label={panelNames.get('csdRedemptionView') || "unassigned"}
          path="/app/csdRedemption"
          icon={(<ListIcon style={{ color: '#536DFE' }} />)}
          location={location}
          isSidebarOpened={isSidebarOpened}
        />);
    }
    return null;

  }
  function CsdRole() {
    var panelMap = sigObsMap.get('csdRoleView');
    if (panelMap.includes(party) || panelMap.includes("All")) {
      return (
        <SidebarLink
          key="CsdRole"
          label={panelNames.get('csdRoleView') || "unassigned"}
          path="/app/csdRole"
          icon={(<Build style={{ color: '#536DFE' }} />)}
          location={location}
          isSidebarOpened={isSidebarOpened}
        />);
    }
    return null;

  }
  function DepositNewAsset() {
    var panelMap = sigObsMap.get('depositNewAssetView');
    if (panelMap.includes(party) || panelMap.includes("All")) {
      return (
        <SidebarLink
          key="DepositNewAsset"
          label={panelNames.get('depositNewAssetView') || "unassigned"}
          path="/app/depositNewAsset"
          icon={(<ListIcon style={{ color: '#536DFE' }} />)}
          location={location}
          isSidebarOpened={isSidebarOpened}
        />);
    }
    return null;

  }
  function InvalidBids() {
    var panelMap = sigObsMap.get('invalidBidsView');
    if (panelMap.includes(party) || panelMap.includes("All")) {
      return (
        <SidebarLink
          key="InvalidBids"
          label={panelNames.get('invalidBidsView') || "unassigned"}
          path="/app/invalidBids"
          icon={(<Warning style={{ color: '#e97300de' }} />)}
          location={location}
          isSidebarOpened={isSidebarOpened}
        />);
    }
    return null;

  }
  function IssuerInvitation() {
    var panelMap = sigObsMap.get('issuerInvitationView');
    if (panelMap.includes(party) || panelMap.includes("All")) {
      return (
        <SidebarLink
          key="IssuerInvitation"
          label={panelNames.get('issuerInvitationView') || "unassigned"}
          path="/app/issuerInvitation"
          icon={(<CardMembership style={{ color: '#536DFE' }} />)}
          location={location}
          isSidebarOpened={isSidebarOpened}
        />);
    }
    return null;

  }
  function IssuerRole() {
    var panelMap = sigObsMap.get('issuerRoleView');
    if (panelMap.includes(party) || panelMap.includes("All")) {
      return (
        <SidebarLink
          key="IssuerRole"
          label={panelNames.get('issuerRoleView') || "unassigned"}
          path="/app/issuerRole"
          icon={(<Build style={{ color: '#536DFE' }} />)}
          location={location}
          isSidebarOpened={isSidebarOpened}
        />);
    }
    return null;

  }
  function OngoingAuctionsForBidders() {
    var panelMap = sigObsMap.get('ongoingAuctionsForBiddersView');
    if (panelMap.includes(party) || panelMap.includes("All")) {
      return (
        <SidebarLink
          key="OngoingAuctionsForBidders"
          label={panelNames.get('ongoingAuctionsForBiddersView') || "unassigned"}
          path="/app/ongoingAuctionsForBidders"
          icon={(<Gavel style={{ color: '#536DFE' }} />)}
          location={location}
          isSidebarOpened={isSidebarOpened}
        />);
    }
    return null;

  }
  function OngoingAuctions() {
    var panelMap = sigObsMap.get('ongoingAuctionsView');
    if (panelMap.includes(party) || panelMap.includes("All")) {
      return (
        <SidebarLink
          key="OngoingAuctions"
          label={panelNames.get('ongoingAuctionsView') || "unassigned"}
          path="/app/ongoingAuctions"
          icon={(<Gavel style={{ color: '#536DFE' }} />)}
          location={location}
          isSidebarOpened={isSidebarOpened}
        />);
    }
    return null;

  }
  function OperatorRole() {
    var panelMap = sigObsMap.get('operatorRoleView');
    if (panelMap.includes(party) || panelMap.includes("All")) {
      return (
        <SidebarLink
          key="OperatorRole"
          label={panelNames.get('operatorRoleView') || "unassigned"}
          path="/app/operatorRole"
          icon={(<Build style={{ color: '#536DFE' }} />)}
          location={location}
          isSidebarOpened={isSidebarOpened}
        />);
    }
    return null;

  }
  function PendingSettlementsForBanks() {
    var panelMap = sigObsMap.get('pendingSettlementsViewForBanks');
    if (panelMap.includes(party) || panelMap.includes("All")) {
      return (
        <SidebarLink
          key="PendingSettlementsForBanks"
          label={panelNames.get('pendingSettlementsViewForBanks') || "unassigned"}
          path="/app/pendingSettlementsForBanks"
          icon={(<Update style={{ color: '#536DFE' }} />)}
          location={location}
          isSidebarOpened={isSidebarOpened}
        />);
    }
    return null;

  }
  function PendingSettlementsForIssuer() {
    var panelMap = sigObsMap.get('pendingSettlementsViewForIssuer');
    if (panelMap.includes(party) || panelMap.includes("All")) {
      return (
        <SidebarLink
          key="PendingSettlementsForIssuer"
          label={panelNames.get('pendingSettlementsViewForIssuer') || "unassigned"}
          path="/app/pendingSettlementsForIssuer"
          icon={(<Update style={{ color: '#536DFE' }} />)}
          location={location}
          isSidebarOpened={isSidebarOpened}
        />);
    }
    return null;

  }
  function Default() {
    
    // var panelMap = sigObsMap.get('pendingSettlementsViewForIssuer');
      return (
        <SidebarLink
          key="Default"
          label="Contracts"
          path="/app/default"
          icon={(<TouchApp style={{ color: '#536DFE' }} />)}
          location={location}
          isSidebarOpened={isSidebarOpened}
        />);
  }

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBack
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        <Default/>
        <AuctionAgentInvitation/>
        <AuctionAgentRole />
        <AuctionRequest />
        <Balance />
        <BankInvitation />
        <BankRole />
        <BidderParticipation />
        <Bid />
        <CentralBankInvitation />
        <CentralBankRole />
        <CsdInvitation />
        <CsdRedemption />
        <CsdRole />
        <DepositNewAsset />
        <InvalidBids />
        <IssuerInvitation />
        <IssuerRole />
        <OngoingAuctionsForBidders />
        <OngoingAuctions />
        <OperatorRole />
        <PendingSettlementsForBanks />
        <PendingSettlementsForIssuer />
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
