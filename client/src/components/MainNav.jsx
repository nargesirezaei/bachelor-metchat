import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="main-menu">
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
    </nav>
  );
}

export default Nav;
