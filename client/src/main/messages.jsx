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

export const Messages = () => {
  const q = useQuery();
  const contactId = q.get("contactId") ?? "";

  const [model, setModel] = useState({
    init: false,
    currentContact: contactId,
  });
  const myContactsRef = useRef();

  useEffect(() => {
    init();
  }, [contactId]);

  const init = () => {
    messageApi
      .init({ contactId: contactId ?? "" })
      .then((result) => {
        setModel({
          currentContact: result.data.contact,
          myContacts: result.data.myContacts,
          init: true,
        });

        myContactsRef.current = result.data.myContacts;
      })
      .catch(() => alert("error"));
  };

  if (!model.init) return <Loading />;
  return (
    <>
      <Nav />
      <Flex
        content="space-between "
        className="position-relative"
        style={{ top: 15 }}
      >
        <div className="border-end pt-0">
          <div className="px-3">
            <input
              type="search"
              className="form-control rounded mb-4"
              placeholder="Search"
              onChange={(e) =>
                setModel({
                  ...model,
                  myContacts: myContactsRef.current.filter(
                    (x) =>
                      x.firstName
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase()) ||
                      x.lastName
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                  ),
                })
              }
            />
          </div>
          <div className="px-3">
            {model?.myContacts?.map((x) => (
              <React.Fragment key={x._id}>
                <Link to={`/samtaler?contactId=${x._id}`} replace>
                  <Contact
                    contact={{
                      ...x,
                      name: x.firstName + " " + x.lastName,
                    }}
                    inContact
                    showEmail={false}
                    className={classNames({
                      "border-bottom pb-2 border-2 border-info":
                        x._id === contactId,
                    })}
                  />
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="flex-grow-1">
          {model.currentContact && (
            <>
              <Flex align="center" content="center" className="border-bottom">
                <Contact
                  contact={{
                    ...model.currentContact,
                    name:
                      model.currentContact.firstName +
                      " " +
                      model.currentContact.lastName,
                  }}
                  inContact
                  showEmail={false}
                />
              </Flex>
              <Flex vertical content="space-between" style={{ height: 500 }}>
                <div className="p-3">chats</div>

                <input
                  type="text"
                  className="message-input m-2 p-3"
                  placeholder="message..."
                />
              </Flex>
            </>
          )}
          {!model.currentContact && (
            <div className="text-center p-5">Select a user to start chat</div>
          )}
        </div>
        {model.currentContact && (
          <div className="border-start p-3 text-center" style={{ width: 350 }}>
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
              displayText={false}
              justifyContent="center"
            />

            <Flex content="space-between" className="w-100 px-4">
              <Flex align="center" vertical className="mt-4">
                <img
                  src={profile}
                  alt="profil-icon"
                  style={{ width: 35, height: 35 }}
                />
                <Link to={`/profil?contactId=${contactId}`}>profile</Link>
              </Flex>
              <Flex
                align="center"
                vertical
                className="mt-4"
                content="space-between"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                </svg>
                <a href="">Søk i chat</a>
              </Flex>
            </Flex>
          </div>
        )}
      </Flex>
    </>
  );
};
