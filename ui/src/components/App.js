/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useEffect } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Layout from "./Layout/Layout";
import Error from "../pages/error/Error";
import Login from "../pages/login/Login";
import { useUserState, useUserDispatch, tryUrlBasedDablLogin } from "../context/UserContext";

export default function App() {
  const userState = useUserState();

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={RootRoute} />
        <Route
          exact
          path="/app"
          render={() => <Redirect to="/app/report" />}
        />
        <PrivateRoute path="/app" component={Layout} />
        <PublicRoute path="/login" component={Login} />
        <Route component={Error} />
      </Switch>
    </HashRouter>
  );

  function RootRoute(props) {
    var userDispatch = useUserDispatch();
    useEffect(() => tryUrlBasedDablLogin(userDispatch))

    return (
      <Redirect to="/app/report" />
    )
  }

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          userState.isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          userState.isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}
