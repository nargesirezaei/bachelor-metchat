import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AccountProvider } from "./app/account-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <AccountProvider>
            <App />
        </AccountProvider>
    </BrowserRouter>
);
