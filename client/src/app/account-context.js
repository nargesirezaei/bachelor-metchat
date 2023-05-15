import React, { useState, createContext, useEffect, useContext } from "react";
import { accountApi } from "../api/account-api";
import { api } from "../api/api";

export const accountStatuses = {
  //konstanter definert for å representere ulike tilstander en konto kan ha
  Connecting: "connecting",
  ConnectionFailed: "connection-failed",
  Connected: "connected",
  LoggedIn: "logged-in",
  LoggedOut: "logged-out",
  Forbidden: "forbidden",
};
//definerer en react-context ved å bruke createContect()-funksjonen. også eksporterer denne account-context filen til å dele data og
//funksjonalitet mellom andre komponeneter i denne projektet.
export const AccountContext = createContext();
//useAccount()-funksjonen brukes for å hente data fra konteksten i en annen komponent.
export const useAccount = () => useContext(AccountContext);

//dette er det viktigste funksjonen, AccountProvider.
//React ContextProvider er en del av React Context API som gir en mekanisme for å dele data eller funksjonalitet mellom komponenter i en
//React-applikasjon uten å måtte sende ned props(propertiese) gjennom alle nivåene i komponent treet.
//Provider-komponenten fungerer som en kontekst beholder, og den har en value-prop som tar imot data eller funksjonalitet som skal deles
//mellom komponentene. Alle komponenter som trenger tilgang til disse dataene kan abonnere på konteksten ved hjelp av useContext.
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

  //returnerer statusen til kontoen, for eksempel "connected", "logged-in", "logged-out" osv
  const account = {
    getStatus: () => data.status,

    //brukernavnet til kontoen, som vil være en e-postadresse
    userName: data.email,
    //navnet som vises på kontoen, som er forskjellig fra brukernavnet
    displayName: data.displayName,
    //Dette er en unik identifikator for kontoen.
    userId: data.userId,
    //funksjon som sjekker om kontoen er i ferd med å koble til.
    isConnecting: () => account.getStatus() === accountStatuses.Connecting,
    //funksjonen som sjekker om det oppsto en feil mens kontoen prøvde å koble til.
    isConnectionFailed: () =>
      account.getStatus() === accountStatuses.ConnectionFailed,

    //funksjon som sjekker om kontoen er koblet til, enten med eller uten pålogging.
    isConnected: () =>
      account.getStatus() === accountStatuses.Connected ||
      account.getStatus() === accountStatuses.LoggedIn,
    //funksjon som sjekker om kontoen er koblet til og logget inn
    isLoggedIn: () => account.getStatus() === accountStatuses.LoggedIn,
    //funksjon som sjekker om kontoen er koblet fra og logget ut
    isLoggedOut: () => account.getStatus() === accountStatuses.LoggedOut,
    //funksjon som setter kontoen som logget ut.
    setAsLoggedOut: () => account.setStatus(accountStatuses.LoggedOut),

    //funksjon som setter kontoen som forbudt, for eksempel hvis brukeren ikke har tilgang til en bestemt funksjon.
    setAsForbidden: () => account.setStatus(accountStatuses.Forbidden),

    //funksjon som setter statusen til kontoen til en gitt verdi. Denne funksjonen brukes til å oppdatere kontoens status
    //når det skjer en endring, for eksempel når brukeren logger inn eller ut eller sender en forespørsel som trener å være gyldig bruker
    setStatus: (value) => setData({ ...data, status: value }),

    init: () => {
      account.setStatus(accountStatuses.Connecting);
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
          console.log("ex", ex);
          if (ex.code === "ERR_NETWORK")
            account.setStatus(accountStatuses.ConnectionFailed);

          if (ex.response.status === 401)
            account.setStatus(accountStatuses.LoggedOut);
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

  return (
    <AccountContext.Provider value={account}>
      {props.children}
    </AccountContext.Provider>
  );
};
