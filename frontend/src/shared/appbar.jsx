import logo from "../assets/img/Logo.svg";
import { Flex } from "../components/Flex";

export default function Appbar() {
    return (
        <nav>
            <div className="container">
                <Flex content="space-between" align="center">
                    <a href="index.html">
                        <img src={logo} alt="logo" />
                    </a>
                    <ul className="m-0">
                        <li className="push">
                            <a href="" className="text-light">
                                Om Oss
                            </a>
                        </li>
                    </ul>
                </Flex>
            </div>
        </nav>
    );
}
