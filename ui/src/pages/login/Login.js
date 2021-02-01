/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState } from "react";
import { Grid, CircularProgress, Typography, Button, TextField, Fade, Select, MenuItem, InputLabel, FormControl } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import useStyles from "./styles";
import logo from "./logo.svg";
import { useUserDispatch, loginUser, redirectToDablLoginPage } from "../../context/UserContext";
import { isLocalDev, handlePartiesLoad, ledgerId } from "../../config";
import { DablPartiesInput } from '@daml/dabl-react'

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");

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
                  Something is wrong with your login or password
                </Typography>
              </Fade>
              {!isLocalDev &&
                <>
                  <Button className={classes.dablLoginButton} variant="contained" color="primary" size="large" onClick={redirectToDablLoginPage}>
                    Log in with DABL
                  </Button>
                  <Typography>
                    OR
                  </Typography>
                </>}
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
                      passwordValue,
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
                <MenuItem id="parties7" value={"CSD"}>CSD</MenuItem>,
                <MenuItem id="parties8" value={"Issuer"}>Issuer</MenuItem>,
                <MenuItem id="parties9" value={"CentralBank"}>CentralBank</MenuItem>
              </Select>
            </FormControl>
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                    root : classes.passwordShift
                  },
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    loginUser(
                      userDispatch,
                      loginValue,
                      passwordValue,
                      props.history,
                      setIsLoading,
                      setError,
                    )
                  }
                }}
                margin="normal"
                placeholder="Password"
                type="password"
                // fullWidth
              />
              <div className={classes.formButtons}>
                {isLoading ?
                  <CircularProgress size={26} className={classes.loginLoader} />
                : <Button
                    disabled={loginValue.length === 0}
                    onClick={() =>
                      loginUser(
                        userDispatch,
                        loginValue,
                        passwordValue,
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
        <div style={{marginTop: "30%"}}>
          <div>
            <label for="avatar">Upload parties.json (tokens):</label>
          </div>
          <div>
            <DablPartiesInput
              ledgerId={ledgerId}
              onError={error => alert(error)}
              onLoad={handlePartiesLoad}/>
          </div>
        </div>
      </div>
    </Grid>
  );
}

export default withRouter(Login);
