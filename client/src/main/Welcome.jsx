import { useRef, useState } from "react";
import { Flex } from "../components/Flex";
import { Nav } from "../components/nav";

import { Login } from "../components/login";
import { Register } from "../components/Register";
import { useScreenSize } from "../app/theme-context";
import classNames from "classnames";

export const Welcome = () => {
    const [model, setModel] = useState({ auth: "login" });
    const registerFormRef = useRef();
    const screen = useScreenSize();
    const isMobile = screen.isMobile;

    return (
        <div className="container-fluid">
            <Nav />
            <div className="liness">
                <Flex content="end" className={classNames({ "pe-5": !isMobile })} style={{ marginRight: isMobile ? 0 : 200 }}>
                    <div className="mt-5">
                        <Flex vertical>
                            <div>
                                <button
                                    className="tab-btn active"
                                    onClick={() => setModel({ ...model, auth: "login" })}
                                    style={{
                                        width: isMobile ? "50%" : "220px",
                                    }}
                                >
                                    Logg Inn
                                </button>
                                <button
                                    className="tab-btn reg"
                                    onClick={() => setModel({ ...model, auth: "reg" })}
                                    style={{
                                        width: isMobile ? "50%" : "220px",
                                    }}
                                >
                                    Register
                                </button>
                            </div>
                            {model.auth === "login" && <Login />}
                            {model.auth === "reg" && <Register registerFormRef={registerFormRef} model={model} setModel={setModel} />}
                        </Flex>
                    </div>
                </Flex>
            </div>
            <Flex content="space-between" className={classNames({ "d-none": isMobile })} style={{ marginTop: "-200px" }}>
                <div className="photo"></div>
                <div className="liness2"></div>
            </Flex>
            <Flex content="end" className={classNames("mb-5", { "d-none": isMobile })} style={{ marginTop: "-100px" }}>
                <div className="bubbleBox">
                    <h3 className="text-white">Hva Er NLP</h3>
                    <p className="text-white" style={{ width: 490 }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia ab placeat saepe? Ex, maxime! Quis, commodi. Labore
                        error iusto a, ipsa, optio architecto vero aperiam nesciunt facilis pariatur, nostrum itaque.
                    </p>
                    <Flex content="end" className="me-5">
                        <button className="btn"> Les mer..</button>
                    </Flex>
                </div>
            </Flex>
            <div
                className={classNames("liness", { "d-none": isMobile })}
                style={{
                    marginTop: "-200px",
                    width: 685,
                    height: 400,
                }}
            ></div>
        </div>
    );
};
