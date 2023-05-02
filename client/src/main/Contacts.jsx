import React from "react";
import { useEffect, useState } from "react";
import { contactApi } from "../api/contact-api";
import mail from "../assets/img/mail.jpg";
import pluss from "../assets/img/pluss.svg";
import profile from "../assets/img/profile.svg";
import { Flex } from "../components/Flex";
import { TopNav } from "../components/top-nav";
import { Contact } from "../components/contact";

export const Contacts = () => {
    const [model, setModel] = useState();

    useEffect(() => {
        if (model) return;

        contactApi
            .myContacts()
            .then((result) => {
                setModel({ ...model, myContacts: result.contacts });
            })
            .catch(() => alert("error"));

        contactApi
            .allContacts()
            .then((result) => {
                setModel({ ...model, allContacts: result.data.data[1] });
            })
            .catch(() => alert("error"));
    }, [model]);

    const onAddContactHandler = (id) => {
        contactApi
            .addContact({ contactId: id })
            .then((result) => setModel(result))
            .catch(() => alert("error"));
    };

    if (!model) return <>Loading...</>;

    return (
        <>
            <TopNav />

            <div className="container-fluid">
                <section id="first">
                    <h1>Find Contacts</h1>
                    <hr />
                </section>
                <div className="row">
                    <div className="col-4">
                        <h5>Contacts</h5>

                        <input
                            type="search"
                            className="form-control rounded"
                            placeholder="Search"
                        />
                        <hr />
                        {model?.allContacts?.map((x) => (
                            <React.Fragment>
                                <Contact
                                    contact={{
                                        ...x,
                                        name: x.firstName + " " + x.lastName,
                                    }}
                                    pluss={pluss}
                                    mail={mail}
                                    profile={profile}
                                    onAdd={onAddContactHandler}
                                />
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="col-8 ps-5">
                        <h5>My Contacts</h5>

                        <input
                            type="search"
                            className="form-control rounded"
                            placeholder="Search"
                            style={{ maxWidth: 500 }}
                        />
                        <hr />
                        <div style={{ width: 500 }}></div>
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
