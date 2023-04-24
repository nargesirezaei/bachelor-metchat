import { Link } from "react-router-dom";
import { Flex } from "./Flex";
import { Logo } from "./logo";

export const Nav = () => {
  return (
    <nav className="px-3">
      <Flex content="space-between" align="center" className="w-100">
        <Logo />
        <Link to="/about" className="text-light ">
          Om Oss
        </Link>
      </Flex>
    </nav>
  );
};
