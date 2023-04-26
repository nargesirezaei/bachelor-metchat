import { Field, Form, Formik } from "formik";
import { useRef, useState } from "react";
import * as yup from "yup";
import { accountApi } from "../api/account-api";
import { Flex } from "../components/Flex";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import { useAccount } from "../app/account-context";
import { Logo } from "../components/logo";
import { Nav } from "../components/nav";

export const Index = () => {
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
        <Flex content="end">
          <div className="mt-5">
            <Flex vertical>
              <div>
                <button
                  className="tab-btn active"
                  onClick={() => setModel({ ...model, auth: "login" })}
                >
                  Logg Inn
                </button>
                <button
                  className="tab-btn reg"
                  onClick={() => setModel({ ...model, auth: "reg" })}
                >
                  Register
                </button>
              </div>
              {model.auth === "login" && (
                <div className="content active inactive pb-5" id="log_in">
                  <Formik
                    initialValues={{
                      email: "bhrajabi@gmail.com",
                      password: "456456",
                      savePassword: "",
                    }}
                    validationSchema={yup.object({
                      email: yup.string().required("Required"),
                      password: yup.string().required("Required"),
                    })}
                    onSubmit={(values) =>
                      account
                        .login(values.email, values.password)
                        .then(() => history("/contacts"))
                        .catch(() => alert("Error in Login"))
                    }
                  >
                    {({ errors, touched }) => (
                      <Form id="form_log">
                        <div className="form-row">
                          <label>Epost</label>

                          <Field name="email">
                            {({ field }) => (
                              <input type="text" id="email_log" {...field} />
                            )}
                          </Field>
                          {errors.email && touched.email ? (
                            <div className="text-warning">{errors.email}</div>
                          ) : null}
                        </div>
                        <div className="form-row">
                          <label>Passord</label>
                          <Field name="password">
                            {({ field }) => (
                              <input
                                type="password"
                                id="password_log"
                                {...field}
                              />
                            )}
                          </Field>
                          {errors.password && touched.password ? (
                            <div className="text-warning">
                              {errors.password}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-row">
                          <Field name="savePassword">
                            {({ field }) => (
                              <>
                                <input
                                  type="checkbox"
                                  name="savePassword"
                                  {...field}
                                />
                                <label className="chang-color">Husk meg</label>
                              </>
                            )}
                          </Field>
                        </div>
                        <button type="submit" className="btn">
                          Logg Inn
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
              )}
              {model.auth === "reg" && (
                <div id="reg" className="pb-5">
                  <Formik
                    initialValues={{
                      firstName: "",
                      lastName: "",
                      email: "",
                      password: "",
                      confirmPassword: "",
                    }}
                    validationSchema={yup.object({
                      firstName: yup.string().required("Required"),
                      lastName: yup.string().required("Required "),
                      email: yup.string().required(" Required"),

                      password: yup
                        .string()
                        .required("Required")
                        .min(6, "password-minimum-length-is-6-characters"),
                      confirmPassword: yup
                        .string()
                        .required("Required")
                        .oneOf(
                          [yup.ref("password"), null],
                          "passwords-must-match"
                        ),
                    })}
                    onSubmit={() =>
                      setModel({
                        ...model,
                        showRegisterModal: true,
                      })
                    }
                    innerRef={registerFormRef}
                  >
                    {({ errors, touched }) => (
                      <Form id="form_reg">
                        <div className="form-row">
                          <label>Fornavn</label>
                          <Field name="firstName">
                            {({ field }) => (
                              <input id="first_name" {...field} />
                            )}
                          </Field>
                          {errors.firstName && touched.firstName ? (
                            <div className="text-warning">
                              {errors.firstName}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-row">
                          <label>Etternavn</label>
                          <Field name="lastName">
                            {({ field }) => <input id="last_name" {...field} />}
                          </Field>
                          {errors.lastName && touched.lastName ? (
                            <div className="text-warning">
                              {errors.lastName}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-row">
                          <label>Epost</label>
                          <Field name="email">
                            {({ field }) => <input id="email_reg" {...field} />}
                          </Field>
                          {errors.email && touched.email ? (
                            <div className="text-warning">{errors.email}</div>
                          ) : null}
                        </div>
                        <div className="form-row">
                          <label>Passord</label>
                          <Field name="password">
                            {({ field }) => (
                              <input
                                type="password"
                                id="password_reg"
                                {...field}
                              />
                            )}
                          </Field>
                          {errors.password && touched.password ? (
                            <div className="text-warning">
                              {errors.password}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-row">
                          <label>Gjente Passord</label>
                          <Field name="confirmPassword">
                            {({ field }) => (
                              <input
                                type="password"
                                id="password_reg"
                                {...field}
                              />
                            )}
                          </Field>
                          {errors.confirmPassword && touched.confirmPassword ? (
                            <div className="text-warning">
                              {errors.confirmPassword}
                            </div>
                          ) : null}
                        </div>

                        <button className="btn-reg">Register</button>
                      </Form>
                    )}
                  </Formik>
                </div>
              )}
            </Flex>
          </div>
        </Flex>
      </div>
      <Flex content="space-between" style={{ marginTop: "-200px" }}>
        <div className="photo"></div>
        <div className="liness2"></div>
      </Flex>
      <Flex content="end" className="mb-5" style={{ marginTop: "-100px" }}>
        <div className="bubbleBox">
          <h3 className="text-white">Hva Er NLP</h3>
          <p className="text-white" style={{ width: 490 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia ab
            placeat saepe? Ex, maxime! Quis, commodi. Labore error iusto a,
            ipsa, optio architecto vero aperiam nesciunt facilis pariatur,
            nostrum itaque.
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
          <Flex content="center" align="center" className="text-muted">
            Vilkår for tjenesten
          </Flex>
        </div>
        <div className="scroll-div-object text-muted">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Repellendus expedita iusto, eaque, aut maiores quas at unde delectus
            eius voluptatum, corrupti ex vitae commodi dolorem in quaerat cumque
            labore repellat!
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Repellendus expedita iusto, eaque, aut maiores quas at unde delectus
            eius voluptatum, corrupti ex vitae commodi dolorem in quaerat cumque
            labore repellat!
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Repellendus expedita iusto, eaque, aut maiores quas at unde delectus
            eius voluptatum, corrupti ex vitae commodi dolorem in quaerat cumque
            labore repellat!
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Repellendus expedita iusto, eaque, aut maiores quas at unde delectus
            eius voluptatum, corrupti ex vitae commodi dolorem in quaerat cumque
            labore repellat!
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Repellendus expedita iusto, eaque, aut maiores quas at unde delectus
            eius voluptatum, corrupti ex vitae commodi dolorem in quaerat cumque
            labore repellat!
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
              <button className="btn ms-0 mb-3 text-dark" onClick={onHide}>
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
