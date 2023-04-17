import React, { useState, useEffect } from "react";
import { messageRoute } from "../APIRoutes";
import axios from "axios";

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
    </>
  );
}

export default ChatContainer;
