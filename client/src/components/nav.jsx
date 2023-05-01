import { Link } from "react-router-dom";
import { Flex } from "./Flex";
import { Logo } from "./logo";

export const Nav = () => {
    return (
        <nav>
            <Flex content="space-between" align="center" className="w-100">
                <Logo />
                <Link to="/about" className="text-light pe-3">
                    Om Oss
                </Link>
            </Flex>
        </nav>
    );
};
