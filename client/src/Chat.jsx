import React, { useState, useEffect } from "react";
import axios from "axios";
import { /*Link,*/ useNavigate } from "react-router-dom";
import "./style.css";

function Chat() {
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (!localStorage.getItem("metchat-user")) {
        navigate("/");
      } else {
        const data = await JSON.parse(localStorage.getItem("metchat-user"));
      }
    }
    fetchData();
  }, [navigate]);

  return (
    <>
      {/*<Nav />*/}

      <div className="row">
        {/* LEFT */}
        <div className="col-lg-3" id="left-side">
          {/* SEARCH */}
          <div className="input-group">
            <input
              type="search"
              className="form-control rounded"
              placeholder="Søk"
              aria-label="Search"
              aria-describedby="search-addon"
            />
            <button type="button" className="btn btn-outline-primary">
              søk
            </button>
          </div>
          {/* CONVERSATIONS */}
        </div>

        {/* MIDDLE */}
        <div className="col-md-6"></div>

        {/* RIGHT*/}
        <div className="col-md-3"></div>
      </div>
    </>
  );
}

export default Chat;
