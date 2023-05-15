import React, { useEffect, useState } from "react";
import WebSocketClient from "./WebSocketClient";

const Chat = () => {
    const [message, setMessage] = useState("");
    const [userId, setUserId] = useState("");
    const [recipientId, setRecipientId] = useState("");
    const [messages, setMessages] = useState([]);

    const receiveMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    const webSocket = WebSocketClient(`ws://localhost:8000`, receiveMessage);

    const sendMessage = () => {
        webSocket.sendMessage({ message, recipientId, userId });
        setMessage("");
    };

    const handleChange = (event) => {
        setMessage(event.target.value);
    };

    return (
        <div>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
            <ul>
                <li>
                    {" "}
                    <input
                        placeholder="userId"
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                </li>
                <li>
                    {" "}
                    <input
                        placeholder="recipientId"
                        type="text"
                        value={recipientId}
                        onChange={(e) => setRecipientId(e.target.value)}
                    />
                </li>
            </ul>
            <input type="text" value={message} onChange={handleChange} />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
