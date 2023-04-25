import { Link } from "react-router-dom";
import logo from "../assets/img/Logo.svg";

//header logo on the left side
export const Logo = () => {
  return (
    <Link to="/">
      <img src={logo} alt="logo" />
    </Link>
  );
};
