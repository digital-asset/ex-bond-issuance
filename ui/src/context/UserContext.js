/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import React from "react";
import { createTokenAll, dablLoginUrl } from "../config";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true, token: action.token, party: action.party };
    case "LOGIN_FAILURE":
      return { ...state, isAuthenticated: false };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  const party = localStorage.getItem("daml.party")
  const token = localStorage.getItem("daml.token")

  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!token,
    token,
    party
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}


// ###########################################################

function loginUser(dispatch, party, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  if (!!party) {
    const token = createTokenAll(party)
    localStorage.setItem("daml.party", party);
    localStorage.setItem("daml.token", token);

    dispatch({ type: "LOGIN_SUCCESS", token, party });
    setError(null);
    setIsLoading(false);
    history.push("/app");
  } else {
    dispatch({ type: "LOGIN_FAILURE" });
    setError(true);
    setIsLoading(false);
  }
}

const redirectToDablLoginPage = () => {
  window.location.assign(`https://${dablLoginUrl}`);
}

function tryUrlBasedDablLogin(userDispatch) {
  const url = new URL(window.location.toString());
  const token = url.searchParams.get('token');
  if (token === null) {
    return;
  }
  const party = url.searchParams.get('party');
  if (party === null) {
    throw Error("When 'token' is passed via URL, 'party' must be passed too.");
  }
  localStorage.setItem("daml.party", party);
  localStorage.setItem("daml.token", token);

  userDispatch({ type: "LOGIN_SUCCESS", token, party });
}

function signOut(event, dispatch, history) {
  event.preventDefault();
  localStorage.removeItem("daml.party");
  localStorage.removeItem("daml.token");

  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}

export { UserProvider, useUserState, useUserDispatch, loginUser, tryUrlBasedDablLogin, redirectToDablLoginPage, signOut };
