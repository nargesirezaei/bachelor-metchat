import Logo from "../assets/img/Logo.svg";
import { Link } from "react-router-dom";
import "../assets/css/home.css";

export const Nav = () => {
  return (
    <nav className="nav-center">
      <div className="nav-header">
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>
      </div>
    </nav>
  );
};
