import { Navigate, Route, Routes } from "react-router-dom";
import { Index } from "./main";
import { PublicLayout } from "./shared/public-layout";
import { Protected } from "./shared/protected";
import { Interests } from "./main/interests";
import { Contacts } from "./main/contacts";
import { useAccount } from "./app/account-context";
import { Messages } from "./main/messages";
import { Profile } from "./main/profile";
import { About } from "./main/about";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<PublicLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/about" element={<About />} />

                <Route element={<Protected />}>
                    <Route path="/interests" element={<Interests />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
            </Route>
        </Routes>
    );
}

const Logout = () => {
    const account = useAccount();
    account.logout();
    return <Navigate to="/" />;
};
