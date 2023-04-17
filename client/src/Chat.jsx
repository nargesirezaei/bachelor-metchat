import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { /*Link,*/ useNavigate } from "react-router-dom";
import { /*profileRoute,*/ conversationRoute } from "./APIRoutes";
import Nav from "./components/MainNav";
import ChatContainer from "./components/ChatContainer";
import "./style.css";

function Chat() {
  const navigate = useNavigate(),
    [self, setSelf] = useState({}),
    [conversation, setConversation] = useState([]);

  //remove if not needed.
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

  useEffect(() => {
    async function getConversations() {
      await axios
        .get(`${conversationRoute}/conversations`, {
          id: self._id,
        })
        .then(async (response) => {
          let conversation = response.data.conversation;

          setConversation(conversation);
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data);
        });
    }
    getConversations();
  }, [self]);

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
          {/* not currently working, delete if better solution found */}
          {/*{conversation.map((conversation, i) => (
            <div key={i}>
              <h2>{conversation.name}</h2>
              <small>{conversation.conact}</small>
            </div>
          ))}*/}
          <h2>CONVERSATION NAME</h2>
          <small>CONVERSATION PARTNER</small>
        </div>

        {/* MIDDLE */}
        <div className="col-md-6" id="middel">
          <ChatContainer />
        </div>

        {/* RIGHT */}
        <div className="col-md-3" id="right-side">
          <img class="part-1" src="profile.svg" alt="profile-icon" />
          <div class="part-2">
            <img src="profile.svg" alt="profile-icon" />
            <p>Profil</p>
          </div>
          <div class="part-3">
            <p>Profil</p>
            <p>Søk i chat</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
