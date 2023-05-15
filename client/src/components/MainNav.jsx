import { Link } from "react-router-dom";
import { HiBars3 } from "react-icons/hi2";
import { useState } from "react";
import logo from "../assets/img/Logo.svg";

function Nav() {
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
                    <a className="item" href="/samtaler">
                        Samtaler
                    </a>
                    <Link className="item" to="/profil">
                        Profil
                    </Link>
                    <Link className="item" to="/logut">
                        Logg ut
                    </Link>
                </div>

                <HiBars3 className="nav-toggle" onClick={toggleLinks} />
            </div>
            <div className={showLinks ? "links-container show-container" : "links-container"}>
                <Link className="item" to="/kontakter">
                    Kontakter
                </Link>
                <a className="item" href="/samtaler">
                    Samtaler
                </a>
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

/*<nav className="main-menu">
      <Link to="/">
        <img src="Logo.svg" alt="logo" />
      </Link>
      <ul className="main-nav">
        <li className="nav-item">
          <Link to="/kontakter">Kontakter</Link>
        </li>
        <li className="nav-item">
          <Link to="/samtaler">Samtaler</Link>
        </li>
        <li className="nav-item">
          <Link to="/profil">Profil</Link>
        </li>
        <li className="nav-item">
          <Link to="/logut">Logg ut</Link>
        </li>
      </ul>
  </nav>*/

export default Nav;
