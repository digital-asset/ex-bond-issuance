/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState , useEffect} from "react";
import { Grid, CircularProgress, Typography, Button, Fade, Select, MenuItem, InputLabel, FormControl } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import useStyles from "./styles";
import logo from "./logo.svg";
import rp from "request-promise";
import { useUserDispatch, loginUser } from "../../context/UserContext";
import { createTokenAll, httpBaseUrl, isLocalDev } from "../../config";
import { addPath, getDablPartyParticipants } from "../../components/Util";
import participants from '../../participants.json';

export function useSortedPartyNames() {
  var [parties, setParties] = useState([]);
  useEffect(() => {
    getPartiesI().then(ps => setParties((ps)));
  }, []);
  return parties;
}

export function getParties(parties) {
  return parties
    .sort(compareByDisplayName);
}

async function getPartiesI() {
  const defaultUser = "Operator";
  const baseUrl = httpBaseUrl;
  debugger;
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
function compareByDisplayName(p1, p2) {
  if ( p1.displayName < p2.displayName ){
    return -1;
  }
  if ( p1.displayName > p2.displayName ){
    return 1;
  }
  return 0;
}

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [loginValue, setLoginValue] = useState("");
  // var [passwordValue] = useState("");

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
                onChange={e => setLoginValue(e.target.value)}
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
