import { Link } from "react-router-dom";

function AdminNav() {
  return (
    <nav className="main-menu">
      <Link to="/admin">
        <img src="Logo.svg" alt="Logo" />
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
    </nav>
  );
}

export default AdminNav;
