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

            <section id="first">
                <h1>Find Contacts</h1>
                <hr />
                <input
                    type="search"
                    className="form-control rounded"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="search-addon"
                ></input>
            </section>
            <Flex>
                <div className="flex-grow-1 ps-3" style={{ maxWidth: 350 }}>
                    <h5>search...</h5>
                    <hr />
                    <input
                        type="search"
                        className="form-control rounded"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="search-addon"
                    ></input>
                </div>
                <section id="second" className="ps-5">
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
                </section>
            </Flex>
        </>
    );
};

const Contact = ({ contact, pluss, mail, profile }) => {
    return (
        <>
            <Flex className="info" align="center" content="space-between">
                <img src={profile} className="profile" />
                <span>{contact.name}</span>
                <img src={pluss} className="pluss" />
                <img src={mail} className="mail" />
            </Flex>
            <div className="intersts">
                {contact.intersts?.map((x) => (
                    <button className="btn">{x.name}</button>
                ))}
            </div>
        </>
    );
};
