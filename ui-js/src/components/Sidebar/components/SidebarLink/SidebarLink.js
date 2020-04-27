import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Link } from "react-router-dom";
import classnames from "classnames";
import useStyles from "./styles";

export default function SidebarLink({
  path,
  icon,
  label,
  location,
  isSidebarOpened
}) {
  const classes = useStyles();
  const isLinkActive = path && (location.pathname === path || location.pathname.indexOf(path) !== -1);

  return (
    <ListItem
      button
      component={path && Link}
      to={path}
      className={classes.link}
      classes={{
        root: classnames(classes.linkRoot, {
          [classes.linkActive]: isLinkActive,
        }),
      }}
      disableRipple
    >
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

  // ###########################################################
}
