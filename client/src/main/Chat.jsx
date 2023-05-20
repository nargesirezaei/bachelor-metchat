import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
// import { io } from "socket.io-client";
import { /*Link,*/ useNavigate } from "react-router-dom";
import { contactRoute, conversationRoute, messageRoute } from "../APIRoutes";
import { IoMdSend } from "react-icons/io";
import Nav from "../components/MainNav";
// import ChatContainer from "./components/ChatContainer";
import dummyProfile from "../assets/img/profile.svg";

function Chat() {
  const navigate = useNavigate(),
    scrollRef = useRef(),
    // socket = useRef(),
    [self, setSelf] = useState({}),
    [msg, setMsg] = useState(""),
    [messages, setMessages] = useState([]),
    // [incomingMessage, setIncomingMessage] = useState(null),
    [conversations, setConversations] = useState([]),
    [currentChat, setCurrentChat] = useState({}),
    [selectedChat, setSelectedChat] = useState(null);

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
        .get(`${conversationRoute}/conversations/${self._id}`)
        .then(async (response) => {
          const conversations = response.data,
            count = conversations.length;

          for (let i = 0; i < count; i++) {
            const contact =
              conversations[i].toId === self._id
                ? conversations[i].fromId
                : conversations[i].toId;

            await axios
              .get(`${contactRoute}/getUser/${contact}`)
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
  }, [self]);

  // get messages
  useEffect(() => {
    if (currentChat) {
      async function getMessages() {
        const response = await axios.get(
          `${messageRoute}/getConversation/${currentChat._id}`
        );
        // console.log(response.data[0]);
        setMessages(response.data);
      }
      getMessages();
    }
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, scrollRef]);

  const sendMsg = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  const handleSendMsg = async (msg) => {
    await axios.post(`${messageRoute}/send`, {
      conversationId: currentChat._id,
      fromId: self._id,
      toId: currentChat,
      message: msg,
    });

    const newMsg = {
      conversationId: currentChat._id,
      fromId: self._id,
      toId: currentChat,
      message: msg,
    };

    /*socket.current.emit("msg-send", {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });*/

    const msgs = [...messages];
    msgs.push(newMsg);

    setMessages(msgs);
  };

  const changeCurrentChat = (conversation, i) => {
    setCurrentChat(conversation);
    setSelectedChat(i);
    // console.log(conversation);
  };

  return (
    <>
      <Nav />
      <div className="row" id="msg-body">
        {/* LEFT */}
        <div className="col-lg-3" id="conversations-list">
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
          <div className="convo-list">
            {conversations.map((conversation, i) => (
              <div
                key={i}
                style={{ backgroundColor: i === selectedChat ? "skyblue" : "" }} //color chat backround (conversations - left side)
                onClick={() => changeCurrentChat(conversation, i)}
                className="convo-element"
              >
                <h2>{conversation.title}</h2>
                <small>
                  {conversation.toData.firstName} {conversation.toData.lastName}
                </small>
              </div>
            ))}
          </div>
        </div>

        {/* MIDDLE */}
        <div className="col-md-6" id="middel">
          {/* HEADER */}
          <div className="chat-header">
            <div className="user-info">
              <div className="convo-patner-img">
                <img src={dummyProfile} alt="" />
              </div>
              <div className="convo-title">
                <h3>
                  {Object.keys(currentChat).length !== 0 && (
                    <a href="/samtaler">{currentChat.title}</a>
                  )}
                </h3>
              </div>
            </div>
          </div>
          {/* CHAT MESSAGES */}
          <div className="chat-messages">
            {messages.map((message, i) => (
              <div key={i} ref={scrollRef}>
                <div
                  className={`message ${
                    message.fromId === self._id ? "sender" : "reciever"
                  }`}
                >
                  <div className="message-content">
                    <p>{message.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* INPUT FOR WRITING MESSAGES */}
          <form className="input-container" onSubmit={(e) => sendMsg(e)}>
            <input
              type="text"
              placeholder="Skriv noe her..."
              style={{ margin: "0px" }}
              onChange={(e) => setMsg(e.target.value)}
              value={msg}
            />
            <button type="submit">
              <IoMdSend />
            </button>
          </form>
        </div>

        {/* RIGHT */}
        <div className="col-md-3" id="right-side">
          <div className="user-info">
            <img class="part-1" src={dummyProfile} alt="profile-icon" />
            <h3>LOREM NAMEN</h3>
          </div>
          <div class="part-2">
            <img src="profile.svg" alt={dummyProfile} />
            <p>Til profil</p>
          </div>
          <div className="convo-options">
            <button className="delete-convo">Slett samtale</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
