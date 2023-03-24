/*
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/


// lager lenke til test register-filen for å teste tilkobling mellom backend og frontend
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from "./test_pages/Register";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}
