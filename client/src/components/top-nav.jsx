import { Link, useLocation } from "react-router-dom";
import { useAccount } from "../app/account-context";

export const TopNav = () => {
  const account = useAccount();
  const page = useLocation().pathname;

  return (
    <nav>
      <li className="push">
        <Link to="/kontakter">Kontakter</Link>
      </li>
      <li className="push">
        <Link to="/samtaler">Meldinger</Link>
      </li>
      <li className="push">
        <Link to="/profil">Profil</Link>
      </li>
      <li className="push">
        <span style={{ fontSize: 20 }} className="text-warning"></span>
        <Link to="/logout" className="text-light">
          Log ut
        </Link>
      </li>
    </nav>
  );
};
