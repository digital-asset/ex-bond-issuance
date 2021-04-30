/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import { History } from 'history';
import React from "react";
import { createTokenAll, dablLoginUrl, damlPartyKey, damlTokenKey } from "../config";

type UserState = {
  isAuthenticated : boolean
  party : string
  token : string
}

type LoginSuccess = {
  type : "LOGIN_SUCCESS"
  token : string
  party : string
}

type LoginFailure = {
  type : "LOGIN_FAILURE"
}

type SignoutSuccess = {
  type : "SIGN_OUT_SUCCESS"
}

type LoginAction = LoginSuccess | LoginFailure | SignoutSuccess

const UserStateContext = React.createContext<UserState>({ isAuthenticated: false, party: "", token: "" });
const UserDispatchContext = React.createContext<React.Dispatch<any>>({} as React.Dispatch<any>);

function tryUrlBasedDablLogin(userDispatch: any) {
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

function userReducer(state : UserState, action : LoginAction) : UserState {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true, token: action.token, party: action.party };
    case "LOGIN_FAILURE":
      return { ...state, isAuthenticated: false };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
  }
}

const UserProvider : React.FC = ({ children }) => {
  const party = localStorage.getItem(damlPartyKey);
  const token = localStorage.getItem(damlTokenKey);

  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!token,
    party: party || "",
    token: token || ""
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
  const context = React.useContext<UserState>(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  const context = React.useContext<React.Dispatch<LoginAction>>(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

function loginUser(
  dispatch : React.Dispatch<LoginAction>,
  party : string,
  history : History,
  setIsLoading : React.Dispatch<React.SetStateAction<boolean>>,
  setError : React.Dispatch<React.SetStateAction<boolean>>) {
setError(false);
setIsLoading(true);

  if (!!party) {

    // in dabl just pick token from config file, ie modify the createToken fn
    const token = createTokenAll(party)
    localStorage.setItem(damlPartyKey, party);
    localStorage.setItem(damlTokenKey, token);

    dispatch({ type: "LOGIN_SUCCESS", token, party });
    setError(false);
    setIsLoading(false);
    history.push("/app");
  } else {
    dispatch({ type: "LOGIN_FAILURE" });
    setError(true);
    setIsLoading(false);
  }
}
const loginDablUser = () => {
  window.location.assign(`https://${dablLoginUrl}`);
}

function signOut(dispatch : React.Dispatch<any>, history : History) {
  // event.preventDefault();
  localStorage.removeItem(damlPartyKey);
  localStorage.removeItem(damlTokenKey);

  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}

export { tryUrlBasedDablLogin, UserProvider, useUserState, useUserDispatch, loginUser, loginDablUser, signOut };
