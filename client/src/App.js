// lager lenke til test register-filen for å teste tilkobling mellom backend og frontend
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./main/Welcome";
import MoreInfo from "./main/MoreInfo";
import Contacts from "./main/Contacts";
import Chat from "./main/Chat";
import Conversations from "./admin/Conversations";
import Users from "./admin/Users";

import "./assets/css/nav.css";
// Users
import "./assets/css/home.css";
import "./assets/css/chat.css";
import "./assets/css/contacts.css";
import "./assets/css/interests.css";
// Admin
import "./assets/css/admin_brukere.css";
import "./assets/css/admin_samtaler.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />

        <Route path="/kontakter" element={<Contacts />} />
        <Route path="/merInfo" element={<MoreInfo />} />
        <Route path="/samtaler" element={<Chat />} />

        {/* Admin Routes */}
        <Route path="/admin/brukere" element={<Users />} />
        <Route path="/admin/samtaler" element={<Conversations />} />
      </Routes>
    </BrowserRouter>
  );
}

// Bruke Bootsrap Grid system for å gjøre sidene responsive
