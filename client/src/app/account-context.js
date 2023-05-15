import { createContext, useContext, useEffect, useState } from "react";
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
        userId: "",
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
        getStatus: () => data.status,

        userName: data.email,
        displayName: data.displayName,
        userId: data.userId,

        isConnecting: () => account.getStatus() === accountStatuses.Connecting,
        isConnectionFailed: () => account.getStatus() === accountStatuses.ConnectionFailed,
        isConnected: () => account.getStatus() === accountStatuses.Connected || account.getStatus() === accountStatuses.LoggedIn,
        isLoggedIn: () => account.getStatus() === accountStatuses.LoggedIn,
        isLoggedOut: () => account.getStatus() === accountStatuses.LoggedOut,

        setAsLoggedOut: () => account.setStatus(accountStatuses.LoggedOut),
        setAsForbidden: () => account.setStatus(accountStatuses.Forbidden),

        setStatus: (value) => setData({ ...data, status: value }),

        init: () => {
            return accountApi
                .userInfo()
                .then((result) => {
                    api.token = result.data.token;
                    api.expiry = result.data.expiry;
                    var x = {
                        status: accountStatuses.Connected,
                        displayName: result.data.displayName,
                        userName: result.data.email,
                        userId: result.data.userId,
                    };
                    setData(x);
                })
                .catch((ex) => {
                    if (ex.code === "ERR_NETWORK") account.setStatus(accountStatuses.ConnectionFailed);

                    if (ex.response.status === 401) account.setStatus(accountStatuses.LoggedOut);
                    else account.setStatus(accountStatuses.ConnectionFailed);

                    throw ex;
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

    return <AccountContext.Provider value={account}>{props.children}</AccountContext.Provider>;
};
