import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { profileRoute, contactRoute, userInterestRoute } from "./APIRoutes";
import Nav from "./components/MainNav";
import "./style.css";

function Contacts() {
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`${profileRoute}`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAddContact = (user) => {
    if (!contacts.includes(user)) {
      setContacts([...contacts, user]);
    }
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
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} ({user.email})
              <button onClick={() => handleAddContact(user)}>
                Add to contacts
              </button>
            </li>
          ))}
        </ul>
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
          <a href="">
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

export default Contacts;
