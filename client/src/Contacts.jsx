import React, { useState, useEffect } from "react";
import axios from "axios";
import { /*Link,*/ useNavigate } from "react-router-dom";
import { /*profileRoute,*/ contactRoute, userInterestRoute } from "./APIRoutes";
import Nav from "./components/MainNav";

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

  useEffect(() => {
    if (Object.keys(self).length !== 0) {
      async function getUsers() {
        await axios.get(`${contactRoute}/getAllUsers`, {
          params: { id: self._id }
        })
        .then(async (response) => {
          let users = response.data.users;
          const count = users.length;
  
          for (let i = 0; i < count; i++) {
            await axios.get(`${userInterestRoute}`, {
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

                  <img
                    className="pluss"
                    src="pluss.svg"
                    alt="pluss-icon"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleAddContact(user)}
                  />
                  <img className="mail" src="mail.jpg" alt="mail-icon" />
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
