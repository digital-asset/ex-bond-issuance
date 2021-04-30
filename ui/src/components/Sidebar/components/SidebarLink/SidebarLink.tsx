/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import classnames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import useStyles from "./styles";

type SidebarLinkProps = {
  path : string
  icon : JSX.Element
  label : string
  location : any
  isSidebarOpened : any
}

const SidebarLink = ({ path, icon, label, location, isSidebarOpened } : SidebarLinkProps) => {
  const classes = useStyles();
  const isLinkActive = path && (location.pathname === path || location.pathname.indexOf(path) !== -1);

  return (
    <ListItem button component={Link} to={path} className={classes.link} classes={{ root: isLinkActive ? classes.linkActive : classes.linkRoot }} disableRipple>
    <ListItemIcon
        className={classnames(classes.linkIcon, {
          [classes.linkIconActive]: isLinkActive,
        })}
      >
        {icon}
      </ListItemIcon>
      <ListItemText
        classes={{
          primary: classnames(classes.linkText, {
            [classes.linkTextActive]: isLinkActive,
            [classes.linkTextHidden]: !isSidebarOpened,
          }),
        }}
        primary={label}
      />
    </ListItem>
  );
}

export default SidebarLink;