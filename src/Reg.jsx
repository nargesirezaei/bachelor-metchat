import React from "react";
import "./LogReg.css";
import { useState } from "react";

function LogReg() {
  const [toggleState, setToggleState] = useState(1);
  const toggelTab = (index) => {
    setToggleState(index);
  };

  return (
    <div id="LogReg">
      <div id="btn-tabs">
        <button
          id="btn-log"
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggelTab(1)}
        >
          Logg Inn
        </button>
        <button
          id="btn-reg"
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggelTab(2)}
        >
          Register
        </button>
      </div>
      <div className="content-tabs">
        <div
          id="log-content"
          className={toggleState === 1 ? "content active-content" : "content"}
        >
          <form id="form-log">
            <div className="form-row">
              <label>Epost</label>
              <input type="text" required id="email_log" />
            </div>
            <div className="form-row">
              <label>Passord</label>
              <input type="password" required id="password_log" />
            </div>
            <div className="form-check">
              <input type="checkbox" />
              <label className="chang-color">Husk meg</label>
            </div>
            <div className="form-row">
              <button type="submit" className="btn-form-log">
                Logg Inn
              </button>
            </div>
          </form>
        </div>

        <div
          id="reg-content"
          className={toggleState === 2 ? "content active-content" : "content"}
        >
          <form id="form-reg">
            <div className="form-row">
              <label>Fornavn</label>
              <input type="text" required id="first_name" />
            </div>
            <div className="form-row">
              <label>Etternavn</label>
              <input type="text" required id="last_name" />
            </div>
            <div className="form-row">
              <label>Epost</label>
              <input type="text" required id="email_reg" />
            </div>
            <div className="form-row">
              <label>Passord</label>
              <input type="password" required id="password_reg" />
            </div>
            <div className="form-row">
              <label>Gjente Passord</label>
              <input type="password" required id="repeat_passowrd" />
            </div>
            <div className="form-row">
              <button className="btn-form-reg">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LogReg;
