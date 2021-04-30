/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import { useReload } from "@daml/react";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import { ArrowBack, ExitToApp, Menu, Refresh } from "@material-ui/icons";
import classNames from "classnames";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { toggleSidebar, useLayoutDispatch, useLayoutState } from "../../context/LayoutContext";
import { signOut, useUserDispatch, useUserState } from "../../context/UserContext";
import useStyles from "./styles";

const Header = ({ history } : RouteComponentProps) => {

  const classes = useStyles();

  // global
  const layoutState = useLayoutState();
  const layoutDispatch = useLayoutDispatch();
  const userState = useUserState();
  const userDispatch = useUserDispatch();
  const reload = useReload();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          onClick={() => toggleSidebar(layoutDispatch)}
          className={classNames(classes.headerMenuButton, classes.headerMenuButtonCollapse)}
        >
          {layoutState.isSidebarOpened ? (
            <ArrowBack
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          ) : (
            <Menu
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          )}
        </IconButton>
        <Typography variant="h6" className={classes.logotype}>
          BOND Issuance
        </Typography>
        <div className={classes.grow} />
        <Typography variant="h6">User: {userState.party}</Typography>
        <IconButton
          color="inherit"
          aria-haspopup="true"
          onClick={reload}
          className={classes.headerMenuButton}
        >
          <Refresh classes={{ root: classes.headerIcon }} />
        </IconButton>
        <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
          onClick={() => signOut(userDispatch, history)}
        >
          <ExitToApp classes={{ root: classes.headerIcon }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(Header);