import React, { useState, useEffect, useRef } from "react";
import { messageRoute } from "../APIRoutes";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { IoMdSend } from "react-icons/io";

function ChatContainer() {
  const navigate = useNavigate(),
    scrollRef = useRef(),
    [self, setSelf] = useState({}),
    [msg, setMsg] = useState(""),
    [messages, setMessages] = useState([]),
    // [incomingMessage, setIncomingMessage] = useState(null),
    [conversations, setConversations] = useState([]),
    [currentChat, setCurrentChat] = useState({}),
    [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    if (currentChat) {
      async function getMessages() {
        const response = await axios.get(`${messageRoute}/getConversation/${currentChat._id}`);
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

    /*
            socket.current.emit("msg-send", {
                from: currentUser._id,
                to: currentChat._id,
                message: msg,
            })
        */

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
      {/* HEADER */}
      <div className="chat-header">
        <div className="user-info">
          <div className="convo-patner-img">
            <img src="profile.svg" alt="" />
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
        {/* .map over messages? */}
        {messages.map((message, i) => (
          <div
            key={i}
            ref={scrollRef}
            style={{
              width: "100%",
              margin: "2%",
              backgroundColor:
                message.fromId === self._id ? "#112D40" : "#C1C8CD", // message color background
            }}
          >
            <p
              style={{
                color: message.fromId === self._id ? "white" : "black",
                textAlign: message.fromId === self._id ? "right" : "left",
              }}
            >
              {message.message}
            </p>
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
    </>
  );
}

export default ChatContainer;
