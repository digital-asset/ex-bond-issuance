/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import { Button, CircularProgress, Fade, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import rp from "request-promise";
import { addPath, addSpacesBetweenWords, getDablPartyParticipants } from "../../components/Util";
import { createTokenAll, httpBaseUrl, isLocalDev } from "../../config";
import { loginUser, useUserDispatch } from "../../context/UserContext";
import participants from '../../participants.json';
import logo from "./logo.svg";
import useStyles from "./styles";


async function getParties(): Promise<any[]> {
  const defaultUser = "Operator";
  const baseUrl = httpBaseUrl(defaultUser);
  const token = createTokenAll(defaultUser);
  const options = {
      url: addPath(baseUrl, 'v1/parties'),
      headers: {
          Authorization: `Bearer ${token}`
      }
  };
  if (!isLocalDev) {
    return getDablPartyParticipants(participants)
  }
  else{
  const response = await rp(options).catch(e => console.error(e))
  const { result } = JSON.parse(response);
  return result;
}
}

function compareByDisplayName(p1: { displayName: string; }, p2: { displayName: string; }): number {
  if ( p1.displayName < p2.displayName ){
    return -1;
  }
  if ( p1.displayName > p2.displayName ){
    return 1;
  }
  return 0;
}

function addSpacesBetweenWordsInDisplayName(p: any) {
  return {...p, displayName: addSpacesBetweenWords(p.displayName)};
}

function sortParties(parties: any[]): any[] {
  return parties
      .sort(compareByDisplayName)
      .map(addSpacesBetweenWordsInDisplayName);
}

// getDisplayPartyNames
export function useSortedPartyNames(): any[] {
  var [parties, setParties] = useState([] as any[]);
  useEffect(() => {
    getParties().then(ps => setParties((ps)));
  }, []);
  return parties;
}

export function getDisplayPartyNames(parties:any[]) {
  return sortParties(parties);
}

export function getIdentifier(parties:any[],party : string) {
  return parties.find(x => x.displayName === party).identifier
}

const Login = (props: any) => {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(false);
  var [loginValue, setLoginValue] = useState("");

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>BOND Issuance</Typography>
      </div>
      <div className="makeStyles-formContainer-8">
        <div className="makeStyles-form-12">
            <React.Fragment>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login
                </Typography>
              </Fade>
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel id="email">Select Party</InputLabel>
              <Select
                value={loginValue}
                onChange={(e:any) => setLoginValue(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    loginUser(
                      userDispatch,
                      loginValue,
                      props.history,
                      setIsLoading,
                      setError,
                    )
                  }
                }}
                fullWidth
              >
                <MenuItem id="parties1" value={"Operator"}>Operator</MenuItem>,
                <MenuItem id="parties2" value={"Regulator"}>Regulator</MenuItem>,
                <MenuItem id="parties3" value={"AuctionAgent"}>AuctionAgent</MenuItem>,
                <MenuItem id="parties4" value={"Bank1"}>Bank1</MenuItem>,
                <MenuItem id="parties5" value={"Bank2"}>Bank2</MenuItem>,
                <MenuItem id="parties6" value={"Bank3"}>Bank3</MenuItem>,
                <MenuItem id="parties7" value={"Csd"}>Csd</MenuItem>,
                <MenuItem id="parties8" value={"Issuer"}>Issuer</MenuItem>,
                <MenuItem id="parties9" value={"CentralBank"}>CentralBank</MenuItem>
              </Select>
            </FormControl>
              <div className={classes.formButtons}>
                {isLoading ?
                  <CircularProgress size={26} className={classes.loginLoader} />
                : <Button
                    disabled={loginValue.length === 0}
                    onClick={() =>
                      loginUser(
                        userDispatch,
                        loginValue,
                        props.history,
                        setIsLoading,
                        setError,
                      )
                    }
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Login
                  </Button>}
              </div>
            </React.Fragment>
        </div>
      </div>
    </Grid>
  );
}

export default withRouter(Login);
