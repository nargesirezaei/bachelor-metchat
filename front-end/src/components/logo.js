import { Link } from "react-router-dom";
import logo from "../assets/img/Logo.svg";
export const Logo = () => {
    return (
        <Link to="/">
            <img src={logo} alt="logo" />
        </Link>
    );
};
