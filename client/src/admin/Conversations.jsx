import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import { contactRoute, conversationRoute } from "../APIRoutes";

import AdminNav from "./AdminNav";
import "../admin_samtaler.css";
import dummyProfile from "../img/profile.svg";


export default function Conversations() {

  const navigate = useNavigate(),
    [self, setSelf] = useState({}),
    [conversations, setConversations] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (!localStorage.getItem("metchat-user")) navigate("/");
      else {
        const data = await JSON.parse(localStorage.getItem("metchat-user"));
        setSelf(data);
      }
    }
    fetchData();
  }, [navigate]);

  // get conversations
  useEffect(() => {
    async function getConversations() {
      await axios
        .get(`${conversationRoute}/getAllConversations`)
        .then(async (response) => {
          const conversations = response.data,
            count = conversations.length;

          for (let i = 0; i < count; i++) {

            await axios.get(`${contactRoute}/getUser`, {
                params: { id: conversations[i].fromId },
              })
              .then((response) => {
                conversations[i]["fromData"] = response.data;
              })
              .catch((err) => {
                conversations[i]["fromData"] = [];
                alert(err.response.data);
              });

            await axios.get(`${contactRoute}/getUser`, {
                params: { id: conversations[i].toId },
              })
              .then((response) => {
                conversations[i]["toData"] = response.data;
              })
              .catch((err) => {
                conversations[i]["toData"] = [];
                alert(err.response.data);
              });

          }
          setConversations(conversations);
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data);
        });
    }
    getConversations();
  });



  return (
    <>
      <AdminNav />
      <div className="admin-convos">
        <section>
          <h1>Samtaler</h1>

          {/*<!-- Search bar -->
          <!-- Retrived from https://mdbootstrap.com/docs/standard/forms/search/-->*/}
          <div className="search-group input-group rounded">
            <input
              type="search"
              class="form-control rounded"
              placeholder="Søk"
              aria-label="Search"
              aria-describedby="search-addon"
            />
            <button type="button" className="btn btn-outline-primary">
              søk
            </button>
            <p>
              Sorter etter:
              <select>
                <option value="" selected disabled hidden>Velg</option>
                <option value="dato">Dato</option>
                <option value="navn">Navn</option>
              </select>
            </p>
          </div>
        </section>

        <div className="convo-list">
          {conversations.map((conversation, i) => (
            <div
              key={i}
              className="convo-element"
            >

              {/*<!-- List of conversetions -->*/}
              <div className="row conversation-list">
                <div className="col-sm-6 ">
                  {/*<!-- Conversation participants -->*/}
                  <div className="card">
                    <div className="card-body">
                      {/*<!-- Date -->*/}
                      <a className="convo-date" href="./samtaler">
                        {conversation.createdAt}
                      </a>
                      {/*<!-- Conversation participants -->*/}
                      <div className="participants">
                        <div className="participant">
                          <img src={dummyProfile} alt="P" class="rounded-circle" />
                          <div className="ms-3">
                            <p className="fw-bold mb-1">
                              {conversation.fromData.firstName} {conversation.fromData.lastName}
                            </p>
                          </div>
                        </div>

                        <div className="participant d-flex align-items-center">
                          <img src={dummyProfile} alt="P" class="rounded-circle" />
                          <div className="ms-3">
                            <p className="fw-bold mb-1">
                              {conversation.toData.firstName} {conversation.toData.lastName}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/*<!-- Buttons -->*/}
                      <div className="text-end">
                        <button className="btn-download btn-link btn-rounded btn-sm">
                          Last ned samtale
                        </button>
                        <button className="btn-delete btn-link btn-rounded btn-sm">
                          Slett samtale
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/*<!-- List of conversetions -->*/}
        <div className="row conversation-list">
          <div className="col-sm-6 ">
            {/*<!-- Conversation participants -->*/}
            <div className="card">
              <div className="card-body">
                {/*<!-- Date -->*/}
                <a className="convo-date" href="./samtaler">
                  Dato
                </a>
                {/*<!-- Conversation participants -->*/}
                <div className="participants">
                  <div className="participant">
                    <img src={dummyProfile} alt="P" class="rounded-circle" />
                    <div className="ms-3">
                      <p className="fw-bold mb-1">Person En</p>
                    </div>
                  </div>

                  <div className="participant d-flex align-items-center">
                    <img src={dummyProfile} alt="P" class="rounded-circle" />
                    <div className="ms-3">
                      <p className="fw-bold mb-1">Person To</p>
                    </div>
                  </div>
                </div>

                {/*<!-- Buttons -->*/}
                <div className="text-end">
                  <button className="btn-download btn-link btn-rounded btn-sm">
                    Last ned samtale
                  </button>
                  <button className="btn-delete btn-link btn-rounded btn-sm">
                    Slett samtale
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="master-buttons">
          <button className="btn-download-all">Last ned alle</button>
          <button className="btn-delete-all">Slett alle</button>
        </div>
      </div>
    </>
  );
}