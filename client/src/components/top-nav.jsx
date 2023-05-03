import { Link, useLocation } from "react-router-dom";
import { Flex } from "./Flex";
import { Logo } from "./logo";
import classNames from "classnames";
import { useAccount } from "../app/account-context";

export const TopNav = () => {
    const account = useAccount();
    const page = useLocation().pathname;

    return (
        <nav>
            <div className="container-fluid" style={{ zIndex: 9999 }}>
                <Flex content="space-between" align="center" className="pe-3">
                    <Logo />
                    <Flex className="m-0" gap={3}>
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
                            <span
                                style={{ fontSize: 20 }}
                                className="text-warning"
                            ></span>
                            <Link to="/logout" className="text-light">
                                Log ut
                            </Link>
                        </li>
                    </Flex>
                </Flex>
            </div>
        </nav>
    );
};
