import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/index.css";
import "./assets/css/interests.css";
import "./assets/css/style.css";
import "./assets/css/app.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AccountProvider } from "./app/account-context";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AccountProvider>
        <App />
      </AccountProvider>
    </BrowserRouter>
  </React.StrictMode>
);
