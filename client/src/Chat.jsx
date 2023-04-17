import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { /*Link,*/ useNavigate } from "react-router-dom";
import { /*profileRoute,*/ contactRoute, conversationRoute, messageRoute } from "./APIRoutes";
// import Nav from "./components/MainNav";
import "./style.css";

function Chat() {
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
        async function fetchData() {
            if (!localStorage.getItem("metchat-user"))
                navigate("/");
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
            await axios.get(`${conversationRoute}/conversations`, {
                params: { id: self._id },
            })
            .then(async (response) => {
                const conversations = response.data,
                    count = conversations.length;
            
                for (let i = 0; i < count; i++) {
                    const contact = conversations[i].toId === self._id
                        ? conversations[i].fromId
                        : conversations[i].toId;
                        
                    await axios.get(`${contactRoute}/getUser`, {
                        params: { id: contact },
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
    }, [self]);

    // get messages
    useEffect(() => {
        if (currentChat) {
            async function getMessages() {
                const response = await axios.get(`${messageRoute}/getConversation`, {
                    params: { conversationId: currentChat._id }
                });
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
          {conversations.map((conversation, i) => (
            <div
                key={i}
                style={{backgroundColor: i === selectedChat ? "skyblue" : "" }} //color chat backround (conversation)
                onClick={() => changeCurrentChat(conversation, i)}
            >
                <h2>{conversation.title}</h2>
                <small>{conversation.toData.firstName} {conversation.toData.lastName}</small>
            </div>
          ))}
          <h2>CONVERSATION NAME</h2>
          <small>CONVERSATION PARTNER</small>
        </div>

        {/* MIDDLE */}
        <div className="col-md-6" id="middel">
          <div className="info">
            <div className="icon-status">
              <img src="profile.svg" alt="profil-icon" />
              <div className="online"></div>
            </div>
            {Object.keys(currentChat).length !== 0 && (
                <a href="/samtaler">{currentChat.title}</a>
            )}
          </div>
          {/* Need to change? */}
          <hr />
            {messages.map((message, i) => (
                <div
                    key={i}
                    ref={scrollRef}
                    style={{
                        width: "100%",
                        margin: "2%",
                        backgroundColor: message.fromId === self._id ? "#112D40" : "#C1C8CD" // message color background
                    }}
                >
                    <p
                        style={{
                            color: message.fromId === self._id ? "white" : "black",
                            textAlign: message.fromId === self._id ? "right" : "left"
                        }}
                    >
                        {message.message}
                    </p>
                </div> 
            ))}
          <hr />
          <form onSubmit={(e) => sendMsg(e)}>
            <input
                type="text"
                placeholder="Type your message here..."
                style={{margin: "0px"}}
                onChange={(e) => setMsg(e.target.value)}
                value={msg}
            />
          </form>
        </div>

        {/* RIGHT*/}
        <div className="col-md-3" id="right-side">
          <img className="part-1" src="face.png" alt="face-icon" />
          <div className="part-2">
            <img src="profile.svg" alt="profile-icon" />
            <div className="search-icon">
              <i className="bi bi-search"></i>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </div>
          </div>
          <div className="part-3">
            <p>Profil</p>
            <p>Søk i chat</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
