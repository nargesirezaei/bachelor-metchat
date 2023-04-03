import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <Link to="/">
        <img src="Logo.svg" alt="logo" />
      </Link>
      <ul className="main-nav">
        <li>
          <Link to="/kontakter">Kontakter</Link>
        </li>
        <li>
          <Link to="/samtaler">Samtaler</Link>
        </li>
        <li>
          <Link to="/profil">Profil</Link>
        </li>
        <li>
          <Link to="/logut">Logg ut</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
