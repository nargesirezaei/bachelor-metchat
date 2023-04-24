import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/app.css";
import "./assets/css/interests.css";
import "./assets/css/style.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AccountProvider } from "./app/account-context";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AccountProvider>
      <App />
    </AccountProvider>
  </BrowserRouter>
);
