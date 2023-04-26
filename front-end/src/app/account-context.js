//for å sende data mellom komponentene så bruker vi redux. redux kan handle sending av data mellom komponentene
//redux er litt vanskeligere å lære d abruker vi context
//useState = moteghayer

import React, { useState, createContext, useEffect, useContext } from "react";
import { accountApi } from "../api/account-api";
import { api } from "../api/api";

export const accountStatuses = {
  Connecting: "connecting",
  ConnectionFailed: "connection-failed",
  Connected: "connected",
  LoggedIn: "logged-in",
  LoggedOut: "logged-out",
  Forbidden: "forbidden",
};

//lager vi ny context med navnet accountContexxt
export const AccountContext = createContext();
//fra accountContext useAccount
export const useAccount = () => useContext(AccountContext);

//data/parameter vi gir putter vi det i props. og provider han sine methoder, hver gjør noe forskjellige.denne accountprovider har en return:
// <AccountContext.Provider value={account}>
//{props.children}
//</AccountContext.Provider>
// denne accountContext returnerer en value = account og med denne valuen fra andre steder kan vi bruke alle properties vi har inne i account
//for eksemple informasjon om useren validity, username, status. account.getStatus.og denne accounten er en context og derfor lagrer verdier
//inne i seg
//inne i account har vi andre methoder som init, login og logout
//det viktigste er når vi bruker accountapi => login da sender vi user og pass til back og back checker if token er valid. og vi
//lager token og sender vi ut ved bruk context,account

export const AccountProvider = (props) => {
  const [data, setData] = useState({
    status: "",
    displayName: "",
  });

  function logout(sync) {
    if (!api.token) return;
    if (sync) {
      accountApi.logout();
      api.token = null;
    }
    api.token = null;
    account.setStatus(accountStatuses.LoggedOut);
  }

  const account = {
    userName: data.email,
    displayName: data.displayName,

    isUnAuthorized: () => api.token === null,
    getStatus: () => data.status,
    isConnected: () => data.status === accountStatuses.Connected,
    isConnecting: () => data.status === accountStatuses.Connecting,

    setStatus: (value) => setData({ ...data, status: value }),

    init: () => {
      account.setStatus(accountStatuses.Connecting);
      return new Promise((resolve, reject) => {
        accountApi
          .userInfo()
          .then((result) => {
            api.token = result.data.token;
            api.expiry = result.data.expiry;
            var x = {
              status: accountStatuses.Connected,
              displayName: result.data.displayName,
              userName: result.data.email,
            };
            setData(x);

            resolve(x);
          })
          .catch(reject);
      });
    },

    login: (userName, password) =>
      new Promise((resolve, reject) => {
        accountApi
          .login(userName, password)
          .then((result) => {
            api.token = result.data.token;
            api.expiry = result.data.expiry;
            setData({
              status: accountStatuses.Connected,
              displayName: result.data.displayName,
              userName: result.data.email,
            });
            resolve(result);
          })
          .catch(reject);
      }),
    logout: () => logout(true),
  };

  useEffect(() => {
    if (account.getStatus() === null) return;
    // api.onUnauthorized(() => account.setAsLoggedOut());
  }, [api, account]);

  return (
    <AccountContext.Provider value={account}>
      {props.children}
    </AccountContext.Provider>
  );
};
