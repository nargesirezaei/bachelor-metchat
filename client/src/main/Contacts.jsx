import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { contactApi } from "../api/contact-api";
import mail from "../assets/img/mail.jpg";
import pluss from "../assets/img/pluss.svg";
import profile from "../assets/img/profile.svg";
import { Flex } from "../components/Flex";
import { TopNav } from "../components/top-nav";
import { Contact } from "../components/contact";
import Nav from "../components/MainNav";
import { Link } from "react-router-dom";

export const Contacts = () => {
    const [model, setModel] = useState();
    const allContactsRef = useRef();
    const myContactsRef = useRef();

    useEffect(() => {
        if (model) return;

        contactApi
            .init()
            .then((result) => {
                setModel({
                    myContacts: result.data.myContacts,
                    allContacts: result.data.allContacts,
                });

                allContactsRef.current = result.data.allContacts;
                myContactsRef.current = result.data.myContacts;
            })
            .catch(() => alert("error"));
    }, [model]);

    const onAddContactHandler = (id) => {
        contactApi
            .addContact({ contactId: id })
            .then((result) => {
                var contact = model.allContacts.find((x) => x._id === id);

                setModel({
                    ...model,
                    myContacts: [...model.myContacts, contact],
                });
            })
            .catch(() => alert("error"));
    };

    const onDeleteHandler = (id) => {
        contactApi
            .remove({ contactId: id })
            .then((result) => {
                setModel({
                    ...model,
                    myContacts: model.myContacts.filter((x) => x._id !== id),
                });
            })
            .catch(() => alert("error"));
    };

    return (
        <>
            <Nav />

            <div className="container-fluid">
                <section className="my-4 d-inline-block w-100">
                    <h3 className="text-center">Find Contacts</h3>
                </section>
                <div className="row">
                    <div className="col-12 col-md-4">
                        <h5>My Contacts</h5>

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
                        {model?.myContacts?.map((x) => (
                            <React.Fragment key={x._id}>
                                <Link to={`/samtaler?contactId:${x._id}`}>
                                    <Contact
                                        contact={{
                                            ...x,
                                            name:
                                                x.firstName + " " + x.lastName,
                                        }}
                                        pluss={pluss}
                                        mail={mail}
                                        profile={profile}
                                        onAdd={onAddContactHandler}
                                    />
                                </Link>
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="col-12 col-md-8">
                        <h5>Contacts</h5>

                        <input
                            type="search"
                            className="form-control rounded mb-4"
                            placeholder="Search"
                            onChange={(e) =>
                                setModel({
                                    ...model,
                                    allContacts: allContactsRef.current.filter(
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
                            style={{ maxWidth: 500 }}
                        />
                        <div style={{ maxWidth: 500 }}>
                            {model?.allContacts?.map((x) => {
                                const isInMyContacts = model.myContacts.find(
                                    (c) => c._id === x._id
                                );
                                return (
                                    <React.Fragment key={x._id}>
                                        <Contact
                                            contact={{
                                                ...x,
                                                name:
                                                    x.firstName +
                                                    " " +
                                                    x.lastName,
                                            }}
                                            pluss={pluss}
                                            isInMyContacts={isInMyContacts}
                                            mail={mail}
                                            profile={profile}
                                            onAdd={onAddContactHandler}
                                            onDelete={onDeleteHandler}
                                            visibleIcons
                                        />
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const MyContacts = ({ contact, pluss, mail, setModel, profile }) => {
    return (
        <>
            <Flex className="info" align="center" content="space-between">
                <div>
                    <img src={profile} className="profile me-3" />
                    <span>{contact.firstName}</span>
                </div>
                <img src={pluss} className="pluss" />
                <img src={mail} className="mail cur-pointer" />
            </Flex>
            <div className="intersts">
                {contact.intersts?.map((x) => (
                    <button className="btn">{x.name}</button>
                ))}
            </div>
        </>
    );
};
