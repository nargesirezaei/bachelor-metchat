/* Ikke bruk. Nun fir testing */
import React, { useState, useEffect } from "react";
//import "./home.css";

const { useState } = React;

const [email_log, setEmail_log] = useState("");
const [password_log, setPassword_log] = useState("");

function handleSubmit(e) {
  e.preventDefault(); // prevents the page form refreshing or moving to another url.
  console.log("email", email_log);
  console.log("password", password_log);
}

function LogIn() {
  return (
    <div className="content active inactive" id="log_in">
      <form id="form_log" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Epost</label>
          <input
            type="text"
            required
            id="email_log"
            value={email_log}
            onInput={(e) => setEmail_log(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label>Passord</label>
          <input
            type="password"
            required
            id="password_log"
            value={password_log}
            onInput={(e) => setPassword_log(e.target.value)}
          />
        </div>
        <div className="form-row">
          <input type="checkbox" />
          <label className="chang-color">Husk meg</label>
        </div>
        <button type="submit" className="btn">
          Logg Inn
        </button>
      </form>
    </div>
  );
}
// Create div with id in html and import this script
//<div id=login-form></div>
//<script src="./login.jsx"></script>
ReactDOM.render(<LogIn />, document.querySelector("#login-form"));
