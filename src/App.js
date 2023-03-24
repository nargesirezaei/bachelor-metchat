import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./Welcome";
import MoreInfo from "./MoreInfo";
import "./home.css";
// Import .jsx files as they are made

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Add Routes as functions in .jsx files are made */}
        <Route path="/" element={<Welcome />} />
        <Route path="/moreInfo" element={<MoreInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
