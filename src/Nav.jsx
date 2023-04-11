import React from "react";
import "./Nav.css";
import Logo from "./img/Logo.svg";

function Nav() {
  return (
    <nav>
      <a href="index.html">
        <img src={Logo} alt="logo" />
      </a>
      <ul className="main-nav">
        <li className="push">
          <a href="">Om Oss</a>
        </li>
      </ul>
    </nav>
  );
}
export default Nav;
