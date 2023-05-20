import { Link } from "react-router-dom";
import { HiBars3 } from "react-icons/hi2";
import { useState } from "react";
import logo from "../assets/img/Logo.svg";

function MainNav() {
  /* Toggle Nav*/
  const [showLinks, setShowLinks] = useState(false);
  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };
  return (
    <nav className="nav-center">
      <div className="nav-header">
        <Link to="/" className="logo">
          <img src={logo} alt="logo" />
        </Link>
        <div className="nav-items">
          <Link className="item" to="/kontakter">
            Kontakter
          </Link>
          <Link className="item" to="/samtaler">
            Samtaler
          </Link>
          <Link className="item" to="/profil">
            Profil
          </Link>
          <Link className="item" to="/logut">
            Logg ut
          </Link>
        </div>

        <HiBars3 className="nav-toggle" onClick={toggleLinks} />
      </div>
      <div
        className={
          showLinks ? "links-container show-container" : "links-container"
        }
      >
        <Link className="item" to="/kontakter">
          Kontakter
        </Link>
        <Link className="item" to="/samtaler">
          Samtaler
        </Link>
        <Link className="item" to="/profil">
          Profil
        </Link>
        <Link className="item" to="/logut">
          Logg ut
        </Link>
      </div>
    </nav>
  );
}

export default MainNav;
