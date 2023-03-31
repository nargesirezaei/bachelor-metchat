import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { contactRoute, userInterestRoute } from "./APIRoutes";
import Nav from "./components/MainNav";
import "./style.css";

function Contacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch(contactRoute)
      .then((response) => response.json())
      .then((data) => setContacts(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      {/* Pull nav out as a component 
      Add navigation */}
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
        <div className="info">
          <img src="profile.svg" alt="profile-icon" />
          {contacts.map((contact) => (
            <li key={contact.id}>
              {contact.name} ({contact.email})
            </li>
          ))}
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
        <div className="third">
          <button>Hopp Over</button>
          <button>Gå Videre</button>
        </div>
      </section>

      <footer>
        <p>Laget av Rami, Narges, Aina Og Fatima</p>
      </footer>
    </>
  );
}
export default Contacts;
