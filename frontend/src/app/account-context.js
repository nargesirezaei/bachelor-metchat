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
    const [data, setData] = useState({ status: null, name: "" });

    useEffect(() => {
        const onLogoutEvent = (event) => {
            if (event.key === "sync-logout") logout(false);
        };
        window.addEventListener("storage", onLogoutEvent);
        return () => window.removeEventListener("storage", onLogoutEvent);
    }, []);

    function logout(sync) {
        if (!api.token) return;
        if (sync) {
            accountApi.logout();
            api.token = null;
            localStorage.setItem("sync-logout", Date.now());
        }
        api.token = null;
        account.setStatus(accountStatuses.LoggedOut);
    }

    const account = {
        getToken: () => api.token,

        getStatus: () => data.status,
        setStatus: (value) => {
            const x = { ...data, status: value };
            setData(x);
        },

        userName: data.userName,
        displayName: data.displayName,
        companyName: data.companyName,

        isConnecting: () => account.getStatus() === accountStatuses.Connecting,
        isConnectionFailed: () => account.getStatus() === accountStatuses.ConnectionFailed,
        isConnected: () => account.getStatus() === accountStatuses.Connected || account.getStatus() === accountStatuses.LoggedIn,
        isLoggedIn: () => account.getStatus() === accountStatuses.LoggedIn,
        isLoggedOut: () => account.getStatus() === accountStatuses.LoggedOut,

        setAsLoggedOut: () => account.setStatus(accountStatuses.LoggedOut),
        setAsForbidden: () => account.setStatus(accountStatuses.Forbidden),

        init: () => {
            account.setStatus(accountStatuses.Connecting);
            return accountApi
                .userInfo()
                .then((result) => {
                    api.token = result.token;
                    api.expiry = result.expiry;
                    var x = {
                        status: accountStatuses.Connected,
                        userName: result.userName,
                        displayName: result.displayName,
                        companyName: result.companyName,
                    };
                    setData(x);
                    return x;
                })
                .catch((ex) => {
                    if (ex.name === "401") account.setStatus(accountStatuses.LoggedOut);
                    else account.setStatus(accountStatuses.ConnectionFailed);
                    throw ex;
                });
        },

        login: (key, userName, phoneNumber) =>
            accountApi.login(key, userName, phoneNumber).then((result) => {
                api.token = result.token;
                api.expiry = result.expiry;
                var x = {
                    status: accountStatuses.LoggedIn,
                    userName: result.userName,
                    displayName: result.displayName,
                    companyName: result.companyName,
                };
                setData(x);
                return result;
            }),

        logout: () => logout(true),
    };

    useEffect(() => {
        if (account.getStatus() === null) return;
        api.onUnauthorized(() => account.setAsLoggedOut());
        //api.onForbidden(() => account.isConnected() && account.setAsForbidden());
    }, [api, account]);

    return <AccountContext.Provider value={account}>{props.children}</AccountContext.Provider>;
};
