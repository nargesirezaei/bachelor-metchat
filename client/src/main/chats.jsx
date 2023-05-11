import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { messageApi } from "../api/message-api";
import profile from "../assets/img/profile.svg";
import { Flex } from "../components/Flex";
import Nav from "../components/MainNav";
import { Contact } from "../components/contact";
import { Loading } from "../components/loading";
import { useQuery } from "../components/use-query";
import { WebSocketClient } from "./chat/WebSocketClient";
import { useAccount } from "../app/account-context";
import { apiConfig } from "../api/config";
import { IoMdSend } from "react-icons/io";
import { Modal, ModalHeader, ModalTitle } from "react-bootstrap";
import { conversationApi } from "../api/conversation-api";
import { Conversations } from "../components/conversations";
import EditSVG from "../assets/icons/Edit";
import ProfileSVG from "../assets/icons/Profile";
import DeleteSVG from "../assets/icons/Delete";

export const Chats = () => {
    const account = useAccount();
    const q = useQuery();
    const contactId = q.get("contactId") ?? "";
    const [isConnected, setIsConnected] = useState(false);
    const [model, setModel] = useState({
        init: false,
        currentContact: contactId,
        message: "",
        recipientId: contactId,
        conversation: null,
        conversations: [],
    });
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);
    const conversationsRef = useRef();
    const [forceUpdate, setForceUpdate] = useState(0);

    const onConnected = (status) => setIsConnected(status);

    const receiveMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    const webSocket = WebSocketClient(
        apiConfig.chatUrl,
        receiveMessage,
        onConnected
    );

    const sendMessage = () => {
        if (!model.message) return;

        webSocket.sendMessage({
            message: model.message,
            toId: contactId,
            fromId: account.userId,
            conversationId: model.conversation._id,
        });

        setModel({ ...model, message: "" });
        setForceUpdate(forceUpdate + 1);
    };
    function handleKeyDown(event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    }
    useEffect(() => {
        init();
    }, [contactId]);

    useEffect(() => {
        if (!model.conversation) return;

        messageApi
            .getAllMessagesByConversationId(model.conversation._id)
            .then(({ data }) => {
                setMessages(
                    data.messages.map((x) => {
                        return JSON.stringify(x);
                    })
                );
            })
            .catch(() => alert("error"));
    }, [model.conversation]);

    const init = () => {
        messageApi
            .init({ contactId: contactId ?? "" })
            .then(({ data }) => {
                setModel({
                    ...model,
                    currentContact: data.contact,
                    conversations: data.conversations,
                    init: true,
                });
                conversationsRef.current = data.conversations;
            })
            .catch(() => alert("error"));
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    if (!model.init) return <Loading />;
    return (
        <>
            <Nav />
            <Flex
                content="space-between "
                className="position-relative"
                style={{ top: 15, height: "100%" }}
            >
                <div className="border-end pt-0" style={{ minWidth: 350 }}>
                    <div className="px-3">
                        <input
                            type="search"
                            className="form-control rounded mb-4"
                            placeholder="Search"
                            onChange={(e) =>
                                setModel({
                                    ...model,
                                    conversations:
                                        conversationsRef.current.filter(
                                            (x) =>
                                                x.firstName
                                                    .toLowerCase()
                                                    .includes(
                                                        e.target.value.toLowerCase()
                                                    ) ||
                                                x.lastName
                                                    .toLowerCase()
                                                    .includes(
                                                        e.target.value.toLowerCase()
                                                    )
                                        ),
                                })
                            }
                        />
                    </div>
                    <div className="px-3">
                        <Flex content="space-between" className="mb-2">
                            <small className="text-muted">
                                conversations ({model.conversations?.length})
                            </small>
                            <button
                                className="btn bnt-default "
                                style={{ fontSize: 15 }}
                                onClick={() =>
                                    setModel({
                                        ...model,
                                        conversationsModal: true,
                                    })
                                }
                            >
                                +
                            </button>
                        </Flex>
                        <Conversations
                            conversations={model.conversations}
                            currentId={model.conversation?._id}
                            onSelectConversation={(conversation) =>
                                setModel({
                                    ...model,
                                    conversation: conversation,
                                })
                            }
                        />
                    </div>
                </div>
                <div className="flex-grow-1">
                    {model.conversation?._id && (
                        <>
                            <Flex align="center" content="center">
                                <span
                                    className={classNames("status", {
                                        connected: isConnected,
                                        disConnected: !isConnected,
                                    })}
                                ></span>
                                <h5 className="m-0 me-3">
                                    {model.conversation.title}
                                </h5>
                            </Flex>
                            <Flex vertical content="space-between">
                                <div className="p-3">
                                    <div className="message-container chat">
                                        {messages?.map((x, index) => {
                                            const message = JSON.parse(x);

                                            return (
                                                <div
                                                    key={index}
                                                    className={classNames(
                                                        "message ",
                                                        {
                                                            "sent rounded-start rounded-bottom":
                                                                message.fromId ===
                                                                account.userId,
                                                            "received rounded-end rounded-bottom":
                                                                message.fromId ===
                                                                contactId,
                                                        }
                                                    )}
                                                >
                                                    <span>
                                                        {message.message}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                        <div
                                            ref={messagesEndRef}
                                            style={{
                                                float: "left",
                                                clear: "both",
                                            }}
                                        />
                                    </div>
                                </div>
                                <Flex align="center" className="w-100">
                                    <div className="input-container m-3">
                                        <input
                                            type="text"
                                            placeholder="Skriv noe her..."
                                            style={{ margin: "0px", border: 0 }}
                                            onChange={(e) =>
                                                setModel({
                                                    ...model,
                                                    message: e.target.value,
                                                })
                                            }
                                            value={model.message}
                                            onKeyDown={handleKeyDown}
                                        />
                                        <button onClick={sendMessage}>
                                            <IoMdSend />
                                        </button>
                                    </div>
                                </Flex>
                            </Flex>
                        </>
                    )}
                    {!model.conversation?._id && (
                        <div className="text-center p-5">
                            Select a conversation to start chat
                        </div>
                    )}
                </div>
                {model.currentContact && (
                    <div
                        className="border-start p-3 text-center"
                        style={{ minWidth: 350 }}
                    >
                        <Contact
                            width={200}
                            height={200}
                            contact={{
                                ...model.currentContact,
                                name:
                                    model.currentContact.firstName +
                                    " " +
                                    model.currentContact.lastName,
                            }}
                            inContact
                            showEmail={false}
                            justifyContent="center"
                            textInBottom
                        />

                        <Flex content="space-between" className="w-100 px-4">
                            <Flex align="center" vertical className="mt-4">
                                <ProfileSVG />
                                <Link to={`/profil?contactId=${contactId}`}>
                                    Profil
                                </Link>
                            </Flex>
                            {model.conversation && (
                                <Flex
                                    align="center"
                                    vertical
                                    className="mt-4"
                                    content="space-between"
                                >
                                    <DeleteSVG />
                                    <span
                                        className="cur-p"
                                        onClick={() =>
                                            conversationApi
                                                .delete(model.conversation?._id)
                                                .then(({ data }) => {
                                                    setModel({
                                                        ...model,
                                                        conversation: null,
                                                        conversations:
                                                            model.conversations.filter(
                                                                (x) =>
                                                                    x._id !==
                                                                    model
                                                                        .conversation
                                                                        ._id
                                                            ),
                                                    });
                                                })
                                                .catch(() => alert("error"))
                                        }
                                    >
                                        Slett
                                    </span>
                                </Flex>
                            )}
                        </Flex>
                    </div>
                )}
            </Flex>
            <SelectConversations
                show={model.conversationsModal}
                onHide={() => setModel({ ...model, conversationsModal: false })}
                model={model}
                setModel={setModel}
                contactId={contactId}
            />
        </>
    );
};

const SelectConversations = ({ show, onHide, model, contactId, setModel }) => {
    const addConversation = () => {
        conversationApi
            .add({ toUserId: contactId, title: model.conversationTitle })
            .then(({ data }) => {
                setModel({
                    ...model,
                    conversations: data.conversations,
                    conversation: data.conversation,
                    conversationsModal: false,
                });
            })
            .catch(() => alert("error"));
    };
    return (
        <Modal show={show} onHide={onHide} size="lg">
            <ModalHeader closeButton>
                <ModalTitle>
                    Conversations with [
                    {model.currentContact.firstName +
                        " " +
                        model.currentContact.lastName}
                    ]
                </ModalTitle>
            </ModalHeader>
            <Modal.Body className="p-0 mb-4">
                <Flex className="mx-3 my-2" align="center" content="center">
                    <input
                        placeholder="enter conversation title here..."
                        className="form-control"
                        style={{ maxWidth: 400 }}
                        value={model.conversationTitle}
                        onChange={(e) =>
                            setModel({
                                ...model,
                                conversationTitle: e.target.value,
                            })
                        }
                    />
                    <button
                        className="btn btn-dark ms-3"
                        onClick={addConversation}
                    >
                        Create New Conversation
                    </button>
                </Flex>
            </Modal.Body>
        </Modal>
    );
};
