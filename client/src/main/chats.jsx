import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { Modal, ModalHeader, ModalTitle } from "react-bootstrap";
import { IoMdSend } from "react-icons/io";
import { Link } from "react-router-dom";
import { apiConfig } from "../api/config";
import { conversationApi } from "../api/conversation-api";
import { messageApi } from "../api/message-api";
import { useAccount } from "../app/account-context";
import DeleteSVG from "../assets/icons/Delete";
import ProfileSVG from "../assets/icons/Profile";
import { Flex } from "../components/Flex";
import Nav from "../components/MainNav";
import { Contact } from "../components/contact";
import { Conversations } from "../components/conversations";
import { Loading } from "../components/loading";
import { useQuery } from "../components/use-query";
import { WebSocketClient } from "./chat/WebSocketClient";
import ArrowBackSVG from "../assets/icons/ArrowBack";
import AddCommentSVG from "../assets/icons/AddComment";
import { useScreenSize } from "../app/theme-context";

export const Chats = () => {
  const account = useAccount();

  const screen = useScreenSize();
  const isMobile = screen.isMobile;

  const q = useQuery();
  const contactId = q.get("contactId") ?? null;
  const [isConnected, setIsConnected] = useState(false);
  const [model, setModel] = useState({
    init: false,
    currentContact: contactId,
    message: "",
    recipientId: contactId,
    conversation: null,
    conversations: [],
    viewConversations: false,
  });

  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const conversationsRef = useRef();
  const contactsRef = useRef();

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

    const msg = {
      message: model.message,
      toId: contactId ?? model.currentContact._id,
      fromId: account.userId,
      conversationId: model.conversation._id,
    };

    webSocket.sendMessage(msg);

    messageApi
      .send(msg)
      .then(({ data }) => {
        setModel({ ...model, message: "" });

        setMessages((prevMessages) => [...prevMessages, JSON.stringify(msg)]);
      })
      .catch(() => alert("error"));
  };

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  }

  useEffect(() => {
    init();
  }, [contactId]);

  const init = () => {
    messageApi
      .init({ contactId: contactId ?? "" })
      .then(({ data }) => {
        setModel({
          ...model,
          currentContact: data.contact,
          conversations: data.conversations,
          contacts: data.contacts,
          init: true,
          viewConversations: contactId ? true : false,
        });
        conversationsRef.current = data.conversations;
        contactsRef.current = data.contacts;
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
        vertical={isMobile}
        style={{
          height: "100%",
          overflow: "hidden",
          paddingTop: "15px",
        }}
      >
        {!model.conversation && (
          <ChatConversations
            model={model}
            setModel={setModel}
            conversationsRef={conversationsRef}
            contactsRef={contactsRef}
            setMessages={setMessages}
          />
        )}

        <div className="flex-grow-1">
          {model.conversation?._id && (
            <>
              <Flex align="center" className="px-4 border-bottom pb-2">
                <button
                  className="btn bnt-default "
                  onClick={() =>
                    setModel({
                      ...model,

                      conversation: null,
                    })
                  }
                >
                  <ArrowBackSVG
                    className="text-muted"
                    style={{
                      width: 24,
                      height: 24,
                    }}
                  />
                </button>
                {isMobile && (
                  <>
                    <Contact
                      contact={{
                        ...model?.currentContact,
                        name:
                          model.currentContact?.firstName +
                          " " +
                          model.currentContact?.lastName,
                      }}
                      inContact
                      isInMyContacts
                      showEmail={false}
                      className="ms-3"
                      mb="mb-0"
                    />
                  </>
                )}
                <Flex align="center" content="center" className="ms-3 ">
                  <span
                    className={classNames("status", {
                      connected: isConnected,
                      disConnected: !isConnected,
                    })}
                  ></span>
                  <h5 className="m-0 me-3">{model.conversation.title}</h5>
                </Flex>
              </Flex>
              <Flex vertical content="space-between">
                <div className="p-3">
                  <div
                    className="message-container chat triangle-clip"
                    style={{
                      minHeight: 200,
                    }}
                  >
                    {messages?.map((x, index) => {
                      const message = JSON.parse(x);
                      console.log(
                        "message.toId",
                        message.toId === account.userId
                      );
                      console.log(
                        "message.fromId",
                        message.fromId === account.userId
                      );
                      console.log(
                        "message.curentContact",
                        message.fromId === model.currentContact._id
                      );

                      console.log("account.userId", account.userId);
                      console.log("toId", message.toId);
                      console.log("fromId", message.fromId);
                      console.log("curentContact", model.currentContact._id);
                      return (
                        <div
                          key={index}
                          className={classNames("message ", {
                            "sent rounded-start rounded-bottom":
                              message.fromId === account.userId,
                            "received rounded-end rounded-bottom":
                              message.fromId !== account.userId,
                          })}
                        >
                          <span>{message.message}</span>
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
                      style={{
                        margin: "0px",
                        border: 0,
                      }}
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
              Velg en samtale for å starte chat
            </div>
          )}
        </div>

        {model.currentContact && (
          <div
            className="border-start p-3 text-center d-none d-lg-block"
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
              justifyContent="center"
              textInBottom
            />

            <Flex content="space-between" className="w-100 px-4">
              <Flex align="center" vertical className="mt-4">
                <ProfileSVG />
                <Link to={`/profil?contactId=${contactId}`}>Profil</Link>
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
                            conversations: model.conversations.filter(
                              (x) => x._id !== model.conversation._id
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
      {model.currentContact && (
        <SelectConversations
          show={model.conversationsModal}
          onHide={() => setModel({ ...model, conversationsModal: false })}
          model={model}
          setModel={setModel}
          contactId={contactId ?? model.currentContact._id}
          setMessages={setMessages}
        />
      )}
    </>
  );
};

const SelectConversations = ({
  show,
  onHide,
  model,
  contactId,
  setModel,
  setMessages,
}) => {
  const screen = useScreenSize();
  const isMobile = screen.isMobile;
  const addConversation = () => {
    conversationApi
      .add({ toUserId: contactId, title: model.conversationTitle })
      .then(({ data }) => {
        setModel({
          ...model,
          conversations: data.isExist
            ? model.conversations
            : data.conversations,
          conversation: data.conversation,
          conversationsModal: false,
        });
        setMessages([]);
      })
      .catch(() => alert("error"));
  };
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <ModalHeader closeButton>
        <ModalTitle style={{ fontSize: isMobile ? 20 : 40 }}>
          Samtaler med [
          {model.currentContact.firstName + " " + model.currentContact.lastName}
          ]
        </ModalTitle>
      </ModalHeader>
      <Modal.Body className="p-0 mb-4">
        <Flex
          className="mx-3 my-2"
          align="center"
          vertical={isMobile}
          content="center"
        >
          <input
            placeholder="Skriv en tittel..."
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
            className={classNames("btn btn-dark", {
              "ms-3": !isMobile,
              "ms-0 mt-2": isMobile,
            })}
            onClick={addConversation}
          >
            Opprett samtale
          </button>
        </Flex>
      </Modal.Body>
    </Modal>
  );
};

const ChatConversations = ({
  model,
  setModel,
  conversationsRef,
  contactsRef,
  setMessages,
}) => {
  return (
    <div className={classNames("border-end pt-0")} style={{ minWidth: 350 }}>
      <div className="px-3 ">
        <Flex content="space-between" align="center" className="border-bottom ">
          {model.currentContact && (
            <>
              <Contact
                contact={{
                  ...model?.currentContact,
                  name:
                    model.currentContact?.firstName +
                    " " +
                    model.currentContact?.lastName,
                }}
                inContact
                isInMyContacts
              />

              <button
                className="btn bnt-default "
                onClick={() =>
                  setModel({
                    ...model,
                    viewConversations: false,
                    currentContact: null,
                    conversation: null,
                  })
                }
              >
                <ArrowBackSVG
                  className="text-muted"
                  style={{
                    width: 24,
                    height: 24,
                  }}
                  alt="tilbake"
                />
              </button>
            </>
          )}
        </Flex>

        {model.viewConversations && (
          <>
            <input
              type="search"
              className="form-control rounded mb-4"
              placeholder="Søk"
              onChange={(e) =>
                setModel({
                  ...model,
                  conversations: conversationsRef.current.filter((x) =>
                    x.title.toLowerCase().includes(e.target.value.toLowerCase())
                  ),
                })
              }
            />

            <Flex content="space-between" className="mb-2 mt-2">
              <small className="text-muted">
                Samtaler ({model.conversations?.length})
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
                <AddCommentSVG
                  className="text-muted"
                  style={{
                    width: 24,
                    height: 24,
                  }}
                  alt="start samtale"
                />
              </button>
            </Flex>
            <Conversations
              conversations={model.conversations}
              currentId={model.conversation?._id}
              onSelectConversation={(conversation) =>
                messageApi
                  .getAllMessagesByConversationId(conversation._id)
                  .then(({ data }) => {
                    setModel({
                      ...model,
                      fromUser: data.fromUser,
                      conversation,
                    });

                    setMessages(
                      data.messages.map((x) => {
                        return JSON.stringify(x);
                      })
                    );
                    conversationsRef.current = data.conversations;
                  })
                  .catch(() => alert("error"))
              }
            />
          </>
        )}
        {!model.viewConversations && (
          <>
            <input
              type="search"
              className="form-control rounded mb-4"
              placeholder="Søk"
              onChange={(e) =>
                setModel({
                  ...model,
                  contacts: contactsRef.current.filter((x) =>
                    x.firstName
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase())
                  ),
                })
              }
            />
            {model.contacts?.map((x) => (
              <React.Fragment key={x._id}>
                <Contact
                  contact={{
                    ...x,
                    name: x.firstName + " " + x.lastName,
                  }}
                  inContact
                  isInMyContacts
                  onSelectContact={(contact) =>
                    conversationApi
                      .getAll({
                        contactId: contact._id,
                      })
                      .then(({ data }) => {
                        setModel({
                          ...model,
                          viewConversations: true,
                          currentContact: contact,
                          conversations: data.conversations,
                        });
                        conversationsRef.current = data.conversations;
                      })
                      .catch(() => alert("error"))
                  }
                />
              </React.Fragment>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
