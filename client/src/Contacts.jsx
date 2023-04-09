import React, { useState, useEffect } from "react";
import axios from "axios";
import { /*Link,*/ useNavigate } from "react-router-dom";
import { /*profileRoute,*/ contactRoute, userInterestRoute } from "./APIRoutes";
import Nav from "./components/MainNav";
import "./style.css";
 
export default function Contacts() {
    const navigate = useNavigate(),
        [self, setSelf] = useState({}),
        [users, setUsers] = useState([]),
        [contacts, setContacts] = useState([]);
        //[selectedUser, setSelectedUser] = useState(null);
    
    useEffect(() => {
        async function fetchData() {
            if (!localStorage.getItem("metchat-user")) {
                navigate("/login");
            } else {
                const data = await JSON.parse(localStorage.getItem("metchat-user"));
                setSelf(data);
            }
        }
        fetchData();
    }, [navigate]);    
    

    useEffect(() => {
        async function getUsers() {
            await axios.get(`${contactRoute}/getAllUsers`, {
                id: self._id
            })
            .then((response) => {
                let users = response.data.users;

                /*
                users.map(async (user) => {
                    await axios.get(`${userInterestRoute}`, {
                        params: { userId: user._id }
                    })
                    .then((response) => {
                        user.interests = response.data;
                    })
                    .catch((err) => {
                        alert(err.response.data);
                    });
                });

                console.log(JSON.stringify(users, null, 4));
                */

                setUsers(users);
            })
            .catch((err) => {
                console.log(err);
                alert(err.response.data);
            });
        }
        getUsers();
    }, [self]);

    const handleAddContact = (user) => {
        if (!contacts.includes(user)) {
            setContacts([...contacts, user]);
            alert("Contact added")
        }
    };

    const userInterests = async (user) => {
        await axios.get(`${userInterestRoute}`, {
            params: { userId: user._id }
        })
        .then((response) => {
            const res = response.data;
            res.forEach(interestId => {
                
                return <button className="btn">{interestId.title}</button>
            });
        })
        .catch((err) => {
            alert(err.response.data);
        });
    };

  return (
    <>
      <Nav />

      <section id="first">
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

      <section id="second">
        {/*<ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.firstName} {user.lastName} ({user.email})
              <button onClick={() => handleAddContact(user)}>
                Add to contacts
              </button>
            </li>
          ))}
        </ul>*/}

        {users.map((user, i) => (
            <div key={i}>
                <div className="info">
                    <img src="profile.svg" alt="profile-icon" />
                    <h2>{user.firstName} {user.lastName}<br />({user.email})</h2>

                    <img
                        className="pluss"
                        src="pluss.svg" alt="pluss-icon"
                        style={{ cursor: "pointer"}}
                        onClick={() => handleAddContact(user)}
                    />
                    <img className="mail" src="mail.jpg" alt="mail-icon" />
                </div>
                <div className="intersts">
                    {userInterests(user)}
                    <button className="btn">Mat</button>
                    <button className="btn">Knust</button>
                    <button className="btn">Litratur</button>
                    <div>....</div>
                    <button className="btn showmore">Vis flere</button>
                </div>
            </div>
        ))}

        <div className="info">
          <img src="profile.svg" alt="profile-icon" />

          <img className="pluss" src="pluss.svg" alt="pluss-icon" />
          <img className="mail" src="mail.jpg" alt="mail-icon" />
        </div>
        <div className="intersts">
          <button className="btn">Mat</button>
          <button className="btn">Knust</button>
          <button className="btn">Litratur</button>
          <div>....</div>
        </div>
        <div className="info">
          <img src="profile.svg" alt="profile-icon" />
          <h2>Navn</h2>
          <img className="pluss" src="pluss.svg" alt="pluss-icon" />
          <img className="mail" src="mail.jpg" alt="mail-icon" />
        </div>
        <div className="intersts">
          <button className="btn">Mat</button>
          <button className="btn">Knust</button>
          <button className="btn">Litratur</button>
          <div>....</div>
        </div>
        <div className="showMore">
          <a href="/kontakter">
            <img src="pluss.svg" alt="pluss-icon" />
          </a>
          <button>Vis flere</button>
        </div>
      </section>

      <footer>
        <p>Laget av Rami, Narges, Aina Og Fatima</p>
      </footer>
    </>
  );
}