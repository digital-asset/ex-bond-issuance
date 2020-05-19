/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import classnames from "classnames";
import useStyles from "./styles";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { useLayoutState } from "../../context/LayoutContext";

import AuctionAgentInvitation from      "../../pages/auctionAgentInvitation/AuctionAgentInvitation";
import AuctionAgentRole from            "../../pages/auctionAgentRole/AuctionAgentRole";
import AuctionRequest from              "../../pages/auctionRequest/AuctionRequest";
import Balance from                     "../../pages/balance/Balance";
import BankInvitation from              "../../pages/bankInvitation/BankInvitation";
import BankRole from                    "../../pages/bankRole/BankRole";
import Bid from                         "../../pages/bid/Bid";
import BidderParticipation from         "../../pages/bidderParticipation/BidderParticipation";
import CentralBankInvitation from       "../../pages/centralBankInvitation/CentralBankInvitation";
import CentralBankRole from             "../../pages/centralBankRole/CentralBankRole";
import CsdInvitation from               "../../pages/csdInvitation/CsdInvitation";
import CsdRedemption from               "../../pages/csdRedemption/CsdRedemption";
import CsdRole from                     "../../pages/csdRole/CsdRole";
import Default from                     "../../pages/default/Default";
import IssuanceReqs from                "../../pages/issuanceReqs/IssuanceReqs";
import IssuanceReqsCsd from             "../../pages/issuanceReqsCsd/IssuanceReqsCsd";
import InvalidBids from                 "../../pages/invalidBids/InvalidBids";
import IssuerInvitation from            "../../pages/issuerInvitation/IssuerInvitation";
import IssuerRole from                  "../../pages/issuerRole/IssuerRole";
import OngoingAuctions from             "../../pages/ongoingAuctions/OngoingAuctions";
import OngoingAuctionsForBidders from   "../../pages/ongoingAuctionsForBidders/OngoingAuctionsForBidders";
import OperatorRole from                "../../pages/operatorRole/OperatorRole";
import PendingSettlementsForBanks from  "../../pages/pendingSettlementsForBanks/PendingSettlementsForBanks";
import PendingSettlementsForIssuer from "../../pages/pendingSettlementsForIssuer/PendingSettlementsForIssuer";

import DamlLedger from "@daml/react";
import { useUserState } from "../../context/UserContext";
import { wsBaseUrl, httpBaseUrl } from "../../config";

function Layout() {
  const classes = useStyles();
  const user = useUserState();
  const layoutState = useLayoutState();

  return (
    <DamlLedger party={user.party} token={user.token} httpBaseUrl={httpBaseUrl} wsBaseUrl={wsBaseUrl}>
      <div className={classes.root}>
          <>
            <Header />
            <Sidebar />
            <div
              className={classnames(classes.content, {
                [classes.contentShift]: layoutState.isSidebarOpened,
              })}
            >
              <div className={classes.fakeToolbar} />
              <Switch>
                <Route path="/app/default" component={Default} />
                <Route path="/app/auctionAgentInvitation" component={AuctionAgentInvitation} />
                <Route path="/app/auctionAgentRole" component={AuctionAgentRole} />
                <Route path="/app/auctionRequest" component={AuctionRequest} />
                <Route path="/app/balance" component={Balance} />
                <Route path="/app/bankInvitation" component={BankInvitation} />
                <Route path="/app/bankRole" component={BankRole} />
                <Route path="/app/bid" component={Bid} />
                <Route path="/app/bidderParticipation" component={BidderParticipation} />
                <Route path="/app/centralBankInvitation" component={CentralBankInvitation} />
                <Route path="/app/centralBankRole" component={CentralBankRole} />
                <Route path="/app/csdInvitation" component={CsdInvitation} />
                <Route path="/app/csdRedemption" component={CsdRedemption} />
                <Route path="/app/csdRole" component={CsdRole} />
                <Route path="/app/default" component={Default} />
                <Route path="/app/issuanceReqs" component={IssuanceReqs} />
                <Route path="/app/issuanceReqsCsd" component={IssuanceReqsCsd} />
                <Route path="/app/invalidBids" component={InvalidBids} />
                <Route path="/app/issuerInvitation" component={IssuerInvitation} />
                <Route path="/app/issuerRole" component={IssuerRole} />
                <Route path="/app/ongoingAuctions" component={OngoingAuctions} />
                <Route path="/app/ongoingAuctionsForBidders" component={OngoingAuctionsForBidders} />
                <Route path="/app/operatorRole" component={OperatorRole} />
                <Route path="/app/pendingSettlementsForBanks" component={PendingSettlementsForBanks} />
                <Route path="/app/pendingSettlementsForIssuer" component={PendingSettlementsForIssuer} />              </Switch>
            </div>
          </>
      </div>
    </DamlLedger>
  );
}

export default withRouter(Layout);
