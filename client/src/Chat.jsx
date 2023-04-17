import React, { useState, useEffect } from "react";
import axios from "axios";
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
          <img class="part-1" src="face.png" alt="face-icon" />
          <div class="part-2">
            <img src="profile.svg" alt="profile-icon" />
            <div class="search-icon">
              <i class="bi bi-search"></i>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                fill="currentColor"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </div>
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
