import { Link, useLocation } from "react-router-dom";
import { Flex } from "./Flex";
import { Logo } from "./logo";
import classNames from "classnames";

export const TopNav = () => {
    const page = useLocation().pathname;

    return (
        <nav>
            <div className="container-fluid" style={{ zIndex: 9999 }}>
                <Flex content="space-between" align="center" className="pe-3">
                    <Logo />
                    <Flex className="m-0" gap={3}>
                        <li>
                            <Link
                                to="/contacts"
                                className={classNames("text-light", {
                                    active: page == "/contacts",
                                })}
                            >
                                Kontakter
                            </Link>
                        </li>
                        <li className="push">
                            <Link
                                to="/messages"
                                className={classNames("text-light", {
                                    active: page == "/messages",
                                })}
                            >
                                Meldinger
                            </Link>
                        </li>
                        <li className="push">
                            <Link
                                to="/profile"
                                className={classNames("text-light", {
                                    active: page == "/profile",
                                })}
                            >
                                Profil
                            </Link>
                        </li>
                        <li className="push">
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