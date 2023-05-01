import { useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { accountApi } from "../api/account-api";
import { useAccount } from "../app/account-context";
import { Flex } from "../components/Flex";
import { Nav } from "../components/nav";

import { Login } from "../components/login";
import { Register } from "../components/Register";

export const Welcome = () => {
    const [model, setModel] = useState({ auth: "login" });
    const registerFormRef = useRef();
    const history = useNavigate();
    const account = useAccount();

    const onSubmitRegister = () => {
        const values = registerFormRef.current.values;
        accountApi
            .register(values)
            .then(() => {
                setModel({ ...model, showRegisterModal: false });

                account
                    .login(values.email, values.password)
                    .then(() => history("/interests"))
                    .catch(() => alert("Error in Login"));
            })
            .catch(() => alert("error!"));
    };
    return (
        <div className="container-fluid">
            <Nav />
            <div className="liness">
                <Flex content="end" className="pe-5">
                    <div className="mt-5">
                        <Flex vertical>
                            <div>
                                <button
                                    className="tab-btn active"
                                    onClick={() =>
                                        setModel({ ...model, auth: "login" })
                                    }
                                >
                                    Logg Inn
                                </button>
                                <button
                                    className="tab-btn reg"
                                    onClick={() =>
                                        setModel({ ...model, auth: "reg" })
                                    }
                                >
                                    Register
                                </button>
                            </div>
                            {model.auth === "login" && <Login />}
                            {model.auth === "reg" && (
                                <Register
                                    registerFormRef={registerFormRef}
                                    model={model}
                                    setModel={setModel}
                                />
                            )}
                        </Flex>
                    </div>
                </Flex>
            </div>
            <Flex content="space-between" style={{ marginTop: "-200px" }}>
                <div className="photo"></div>
                <div className="liness2"></div>
            </Flex>
            <Flex
                content="end"
                className="mb-5"
                style={{ marginTop: "-100px" }}
            >
                <div className="bubbleBox">
                    <h3 className="text-white">Hva Er NLP</h3>
                    <p className="text-white" style={{ width: 490 }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Officia ab placeat saepe? Ex, maxime! Quis, commodi.
                        Labore error iusto a, ipsa, optio architecto vero
                        aperiam nesciunt facilis pariatur, nostrum itaque.
                    </p>
                    <Flex content="end" className="me-5">
                        <button className="btn"> Les mer..</button>
                    </Flex>
                </div>
            </Flex>
            <div
                className="liness"
                style={{
                    marginTop: "-200px",
                    width: 685,
                    height: 400,
                }}
            ></div>
            <Toc
                show={model.showRegisterModal}
                onHide={() => setModel({ ...model, showRegisterModal: false })}
                onSubmitHandler={onSubmitRegister}
            />
        </div>
    );
};

const Toc = ({ show, onHide, onSubmitHandler }) => {
    const [acceptToc, setAcceptToc] = useState(false);
    return (
        <Modal show={show} onHide={onHide} size="xl">
            <Modal.Body className="p-0">
                <div className="heading">
                    <Flex
                        content="center"
                        align="center"
                        className="text-muted"
                    >
                        Vilkår for tjenesten
                    </Flex>
                </div>
                <div className="scroll-div-object text-muted">
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Repellendus expedita iusto, eaque, aut maiores
                        quas at unde delectus eius voluptatum, corrupti ex vitae
                        commodi dolorem in quaerat cumque labore repellat!
                    </p>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Repellendus expedita iusto, eaque, aut maiores
                        quas at unde delectus eius voluptatum, corrupti ex vitae
                        commodi dolorem in quaerat cumque labore repellat!
                    </p>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Repellendus expedita iusto, eaque, aut maiores
                        quas at unde delectus eius voluptatum, corrupti ex vitae
                        commodi dolorem in quaerat cumque labore repellat!
                    </p>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Repellendus expedita iusto, eaque, aut maiores
                        quas at unde delectus eius voluptatum, corrupti ex vitae
                        commodi dolorem in quaerat cumque labore repellat!
                    </p>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Repellendus expedita iusto, eaque, aut maiores
                        quas at unde delectus eius voluptatum, corrupti ex vitae
                        commodi dolorem in quaerat cumque labore repellat!
                    </p>
                </div>
                <div className="btns">
                    <Flex vertical content="center" align="center">
                        <Flex align="center">
                            <input
                                type="checkbox"
                                className="me-2"
                                onChange={(e) => setAcceptToc(e.target.checked)}
                            />
                            <label> Jeg har lest alt, og samtrykker..</label>
                        </Flex>
                        <Flex>
                            <button
                                className="btn ms-0 mb-3 text-dark"
                                onClick={onHide}
                            >
                                Tilbake
                            </button>
                            <button
                                className="btn mb-3 text-dark"
                                disabled={!acceptToc}
                                onClick={onSubmitHandler}
                            >
                                Gå Videre
                            </button>
                        </Flex>
                    </Flex>
                </div>
            </Modal.Body>
        </Modal>
    );
};
