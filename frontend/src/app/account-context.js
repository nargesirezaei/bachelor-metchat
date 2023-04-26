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

export const AccountContext = createContext();

export const useAccount = () => useContext(AccountContext);

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
