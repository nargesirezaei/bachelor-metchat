import React, { useState, useEffect } from "react";
import { messageRoute } from "../APIRoutes";
import axios from "axios";
import { IoMdSend } from "react-icons/io";

function ChatContainer() {
  return (
    <>
      {/* HEADER */}
      <div className="chat-header">
        <div className="user-info">
          <div className="convo-patner-img">
            <img src="profile.svg" alt="" />
          </div>
          <div className="username">
            <h3>LOREM NAMEN</h3>
          </div>
        </div>
      </div>
      {/* CHAT MESSAGES */}
      <div className="chat-messages">{/* .map over messages? */}</div>
      {/* INPUT FOR WRITING MESSAGES */}
      <form className="input-container">
        <input type="text" placeholder="Skriv noe her..." />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </>
  );
}

export default ChatContainer;
