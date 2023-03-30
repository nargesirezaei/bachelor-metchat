// lager lenke til test register-filen for å teste tilkobling mellom backend og frontend
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./test_pages/Register";
import MoreInfo from "./MoreInfo";
import Welcome from "./Welcome";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/moreInfo" element={<MoreInfo />} />

        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

// Bruke Bootsrap Grid system for å gjøre sidene r
