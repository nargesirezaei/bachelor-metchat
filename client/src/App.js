// lager lenke til test register-filen for å teste tilkobling mellom backend og frontend
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./Welcome";
import MoreInfo from "./MoreInfo";
import Login from "./components/login";
import Register from "./components/Register";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/moreInfo" element={<MoreInfo />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

// Bruke Bootsrap Grid system for å gjøre sidene r
