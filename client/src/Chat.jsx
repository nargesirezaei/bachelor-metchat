import React, { useState, useEffect } from "react";
import axios from "axios";
import { /*Link,*/ useNavigate } from "react-router-dom";

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
        <div className="col-lg-3" id="left-side">
          <div className="search-group">
            <input
              type="search"
              className="form-control"
              placeholder="Søk"
              aria-label="Search"
              aria-describedby="search-addon"
            />
            <span className="input-group-text" id="search-addon">
              <i className="fas fa-search"></i>
            </span>
          </div>

          <div className="accordion" id="contacts-convos">
            <div className="accordion-item">
              <h3 className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Samtaler
                </button>
              </h3>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                data-bs-parent="#contacts-convos"
              >
                <div className="accordion-body">
                  <div className="list-group">
                    <a
                      href="#"
                      className="list-group-item list-group-item-action active"
                      aria-current="true"
                    >
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">Samtaletittel</h5>
                        <small>3 dager siden</small>
                      </div>
                      <p className="mb-1">Samtalepatner</p>
                      <small>And some small print.</small>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h3 className="accordion-header">
                <button
                  classNme="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Kontakter
                </button>
              </h3>
              <div
                id="collapseTwo"
                class="accordion-collapse collapse"
                data-bs-parent="#contacts-convos"
              >
                <div className="accordion-body">
                  <strong>This is the second item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classes that we use to style each element. These
                  classes control the overall appearance, as well as the showing
                  and hiding via CSS transitions. You can modify any of this
                  with custom CSS or overriding our default variables. It's also
                  worth noting that just about any HTML can go within the{" "}
                  <code>.accordion-body</code>, though the transition does limit
                  overflow.
                </div>
              </div>
            </div>
          </div>
          <div className="conversations-list"></div>
          <div className="contacts-list"></div>
        </div>

        <div className="col-md-6"></div>

        <div className="col-md-3"></div>
      </div>
    </>
  );
}

export default Chat;
