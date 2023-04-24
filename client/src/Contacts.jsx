import React, { useState, useEffect } from "react";
import axios from "axios";
import { /*Link,*/ useNavigate } from "react-router-dom";
import { /*profileRoute,*/ contactRoute, userInterestRoute } from "./APIRoutes";
import Nav from "./components/MainNav";
import { IoIosMail, IoIosAdd } from "react-icons/io";

export default function Contacts() {
  const navigate = useNavigate(),
    [self, setSelf] = useState({}),
    [users, setUsers] = useState([]),
    [contacts, setContacts] = useState([]);
  //[selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (!localStorage.getItem("metchat-user")) {
        navigate("/");
      } else {
        const data = await JSON.parse(localStorage.getItem("metchat-user"));
        setSelf(data);
      }
    }
    fetchData();
  }, [navigate]);

  // Fetching users added to contact-list
  /*useEffect(() => {
    async function getContacts() {
      await axios
        .get(`${contactRoute}/mycontacts`, { params: { userId: self._id } })
        .then(async (response) => {
          console.log(response.data[0]);
          setContacts(response.data);
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data);
        });
    }
    getContacts();
  }, [self]);*/

  // Fetching registered users
  useEffect(() => {
    if (Object.keys(self).length !== 0) {
      async function getUsers() {
        await axios
          .get(`${contactRoute}/getAllUsers`, {
            params: { id: self._id },
          })
          .then(async (response) => {
            let users = response.data.users;
            const count = users.length;

            for (let i = 0; i < count; i++) {
              await axios
                .get(`${userInterestRoute}`, {
                  params: { userId: users[i]._id },
                })
                .then((response) => {
                  users[i]["interests"] = response.data;
                })
                .catch((err) => {
                  users[i]["interests"] = [];
                  alert(err.response.data);
                });
            }

            setUsers(users);
          })
          .catch((err) => {
            console.log(err);
            alert(err.response.data);
          });
      }
      getUsers();
    }
  }, [self]);

  const handleAddContact = (user) => {
    if (!contacts.includes(user)) {
      setContacts([...contacts, user]);
      alert("Contact added");
    }
  };

  return (
    <>
      <Nav />

      <div className="row" id="conacts-body">
        {/* List of contacts, in cotact list */}
        <div className="col-lg-3" id="contacts-list">
          <h2>Mine Kontakter</h2>
          {contacts.map((contact, i) => (
            <div key={i} className="contact-element">
              <h3>{contact.name}</h3>
            </div>
          ))}
        </div>

        {/* Column with users, that can be added to cotact list */}
        <div className="col-lg-9" id="users">
          <section id="users-header">
            <h1>Finn Kontakter</h1>
            <hr></hr>
            <input
              type="search"
              className="form-control rounded"
              placeholder="Søk"
              aria-label="Search"
              aria-describedby="search-addon"
            />
          </section>

          {/* List of users, that can be added to cotact list */}
          <section id="users-list">
            {users.map((user, i) => (
              <div key={i}>
                <div className="info">
                  <img src="profile.svg" alt="profile-icon" />
                  <h2>
                    {user.firstName} {user.lastName}
                    <br />({user.email})
                  </h2>

                  <button
                    className="pluss"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleAddContact(user)}
                  >
                    {" "}
                    <IoIosAdd />
                  </button>
                  {/*<img className="mail" src="mail.jpg" alt="mail-icon" />*/}
                  <button className="mail">
                    <IoIosMail />
                  </button>
                </div>
                <div className="intersts">
                  {user["interests"].map((interest, i) => (
                    <button className="btn" key={i}>
                      {interest.interestId.title}
                    </button>
                  ))}
                  <button className="btn showmore">Vis flere</button>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>

      <footer>
        <p>Laget av Rami, Narges, Aina og Fatima</p>
      </footer>
    </>
  );
}
