import React from "react";
import { useEffect, useState } from "react";
import { contactApi } from "../api/contact-api";
import mail from "../assets/img/mail.jpg";
import pluss from "../assets/img/pluss.svg";
import profile from "../assets/img/profile.svg";
import { Flex } from "../components/Flex";
import { TopNav } from "../components/top-nav";

export const Contacts = () => {
    var contacts = [
        {
            name: "Sara",
            email: "sara@gmail.com",
            intersts: [
                {
                    id: "1",
                    name: "Mat",
                },
                {
                    id: "2",
                    name: "Knust",
                },
                {
                    id: "3",
                    name: "Litratur",
                },
            ],
        },
        {
            name: "Ali",
            email: "sara@gmail.com",
            intersts: [
                {
                    id: "1",
                    name: "Mat",
                },
                {
                    id: "2",
                    name: "Knust",
                },
                {
                    id: "3",
                    name: "Litratur",
                },
            ],
        },
    ];
    const [model, setModel] = useState();

    useEffect(() => {
        if (model) return;

        contactApi
            .myContacts()
            .then((result) => {
                setModel({ contacts: result.contacts });
            })
            .catch(() => alert("error"));
    }, [model]);
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
                        <div style={{ width: 500 }}>
                            {contacts.map((x) => (
                                <React.Fragment>
                                    <Contact
                                        contact={x}
                                        pluss={pluss}
                                        mail={mail}
                                        profile={profile}
                                    />
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const Contact = ({ contact, pluss, mail, setModel, profile }) => {
    const addToMyContacts = (email) => {
        contactApi
            .addContact()
            .then((result) => setModel(result))
            .catch(() => alert("error"));
    };
    return (
        <>
            <Flex className="info" align="center" content="space-between">
                <div>
                    <img src={profile} className="profile me-3" />
                    <span>{contact.name}</span>
                </div>
                <img src={pluss} className="pluss" />
                <img
                    src={mail}
                    className="mail cur-pointer"
                    onClick={() => addToMyContacts()}
                />
            </Flex>
            <div className="intersts">
                {contact.intersts?.map((x) => (
                    <button className="btn">{x.name}</button>
                ))}
            </div>
        </>
    );
};
