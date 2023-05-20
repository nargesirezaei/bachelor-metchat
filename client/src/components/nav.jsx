import Logo from "../assets/img/Logo.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { HiBars3 } from "react-icons/hi2";
import "../assets/css/home.css";

export const Nav = () => {
  /* Toggle Nav*/
  const [showLinks, setShowLinks] = useState(false);
  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };
  return (
    <nav className="nav-center">
      <div className="nav-header">
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>

        <Link className="push" to="">
          Om Oss
        </Link>

        <HiBars3 className="nav-toggle" onClick={toggleLinks} />
      </div>

      <ul
        className={
          showLinks ? "links-container show-container" : "links-container"
        }
      >
        <li>
          <a href="">Om Oss</a>
        </li>
      </ul>
    </nav>
  );
};
