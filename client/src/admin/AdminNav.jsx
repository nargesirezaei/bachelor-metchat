import { Link } from "react-router-dom";
import logo from "../img/Logo.svg";
import { HiBars3 } from "react-icons/hi2";
import { useState } from "react";

function AdminNav() {
  /* Toggle Nav*/
  const [showLinks, setShowLinks] = useState(false);
  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };
  return (
    <nav className="nav-center">
      <div className="nav-header">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" />
        </Link>
        <div className="nav-items">
          <Link className="item" to="/admin/brukere">
            Brukere
          </Link>
          <Link className="item" to="/admin/samtaler">
            Samtaler
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
        <Link className="item" to="/admin/brukere">
          Brukere
        </Link>
        <Link className="item" to="/admin/samtaler">
          Samtaler
        </Link>
        <Link className="item" to="/logut">
          Logg ut
        </Link>
      </div>
    </nav>
  );
}
/* <nav className="nav-center">
      <Link to="/admin">
       
      </Link>
      <ul className="main-nav">
        <li className="nav-item">
          <Link to="/admin/brukere" className="nav-item">
            Brukere
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/samtaler">Samtaler</Link>
        </li>
        <li className="nav-item">
          <Link to="/logut">Logg ut</Link>
        </li>
      </ul>
      </nav>*/

export default AdminNav;
