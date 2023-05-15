// lager lenke til test register-filen for å teste tilkobling mellom backend og frontend
import { Navigate, Route, Routes } from "react-router-dom";
// import Conversations from "./admin/Conversations";
// import Users from "./admin/Users";

import { Protected } from "./shared/protected";

import "bootstrap/dist/css/bootstrap.min.css";
import Conversations from "./admin/Conversations";
import Users from "./admin/Users";
import { useAccount } from "./app/account-context";
import "./assets/css/admin_brukere.css";
import "./assets/css/admin_samtaler.css";
import "./assets/css/app.css";
import "./assets/css/chat.css";
import "./assets/css/contacts.css";
import "./assets/css/home.css";
import "./assets/css/index.css";
import "./assets/css/interests.css";
import "./assets/css/nav.css";
import "./assets/css/profile.css";
import "./assets/css/style.css";
import { Contacts } from "./main/Contacts";
import MoreInfo from "./main/MoreInfo";
import { Profile } from "./main/Profile";
import { Welcome } from "./main/Welcome";
import { About } from "./main/about";
import { Chats } from "./main/chats";
import { Interests } from "./main/interests";
import { NotFound } from "./shared/not-found";
import { PublicLayout } from "./shared/public-layout";
import { ThemeProvider } from "./app/theme-context";

export default function App() {
    return (
        <ThemeProvider>
            <Routes>
                <Route path="/" element={<PublicLayout />}>
                    <Route path="/logut" element={<Logout />} />
                    <Route path="/" element={<Welcome />} />

                    {/* to handle user is login or not */}
                    <Route element={<Protected />}>
                        <Route path="/kontakter" element={<Contacts />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/merInfo" element={<MoreInfo />} />

                        <Route path="/samtaler" element={<Chats />} />
                        <Route path="/profil" element={<Profile />} />
                        <Route path="/interests" element={<Interests />} />

                        {/* Admin Routes */}
                        <Route path="/admin/brukere" element={<Users />} />
                        <Route
                            path="/admin/samtaler"
                            element={<Conversations />}
                        />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </ThemeProvider>
    );
}

const Logout = () => {
    const account = useAccount();
    account.logout();
    return <Navigate to="/" />;
};

// Bruke Bootsrap Grid system for å gjøre sidene responsive
