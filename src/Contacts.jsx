import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

function Contacts() {
  const [contacts, setContacts] = useState([]);

  return (
    <>
      {/* Pull nav out as a component 
      Add navigation */}
      <nav>
        <Link to="/">
          <img src="Logo.svg" alt="logo" />
        </Link>
        <ul className="main-nav">
          <li>
            <div className="active">
              <Link to="/kontakter">Kontakter</Link>
            </div>
          </li>
          <li>
            <Link to="/samtaler">Samtaler</Link>
          </li>
          <li>
            <Link to="/profil">Profil</Link>
          </li>
          <li className="push">
            <Link to="/logut">Logg ut</Link>
          </li>
        </ul>
      </nav>

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
