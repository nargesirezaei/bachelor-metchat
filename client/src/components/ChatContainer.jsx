import React, { useState, useEffect } from "react";
import { messageRoute } from "../APIRoutes";
import axios from "axios";
import { IoMdSend } from "react-icons/io";

function ChatContainer() {
  return (
    <>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img src="profile.svg" alt="" />
          </div>
          <div className="username">
            <h3>CURRENT CHAT</h3>
          </div>
        </div>
      </div>
      <div className="chat-messages">{/* .map over messages? */}</div>
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
