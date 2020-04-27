import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import classnames from "classnames";
import useStyles from "./styles";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { useLayoutState } from "../../context/LayoutContext";

// import Report from "../../pages/report/Report";
// import Orders from "../../pages/orders/Orders";
import AuctionAgentRole from "../../pages/auctionAgentRole/AuctionAgentRole";
import Default from "../../pages/default/Default";
// import SharedOrders from "../../pages/sharedorders/SharedOrders";
// import News from "../../pages/news/News";
// import Alerts from "../../pages/alerts/Alerts";

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
                {/* <Route path="/app/report" component={Report} /> */}
                {/* <Route path="/app/orders" component={Orders} /> */}
                <Route path="/app/auctionAgentRole" component={AuctionAgentRole} />
                {/* <Route path="/app/sharedorders" component={SharedOrders} /> */}
                {/* <Route path="/app/news" component={News} /> */}
                {/* <Route path="/app/alerts" component={Alerts} /> */}
              </Switch>
            </div>
          </>
      </div>
    </DamlLedger>
  );
}

export default withRouter(Layout);
