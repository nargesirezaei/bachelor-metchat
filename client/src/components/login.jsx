import { Field, Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useAccount } from "../app/account-context";
import { Flex } from "./Flex";

export const Login = () => {
    const navigate = useNavigate();
    const account = useAccount();
    return (
        <div className="content active inactive pb-5" id="log_in">
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    savePassword: "",
                }}
                validationSchema={yup.object({
                    email: yup.string().required("Required"),
                    password: yup.string().required("Required"),
                })}
                onSubmit={(values) =>
                    account
                        .login(values.email, values.password)
                        .then(() => navigate("/kontakter"))
                        .catch(() => alert("Error in Login"))
                }
            >
                {({ errors, touched }) => (
                    <Form id="form_log">
                        <div className="form-row">
                            <label>Epost</label>

                            <Field name="email">
                                {({ field }) => (
                                    <input
                                        type="text"
                                        id="email_log"
                                        {...field}
                                    />
                                )}
                            </Field>
                            {errors.email && touched.email ? (
                                <div className="text-warning">
                                    {errors.email}
                                </div>
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
                                    <Flex
                                        align="center"
                                        content="center"
                                        gap={1}
                                    >
                                        <input
                                            type="checkbox"
                                            name="savePassword"
                                            {...field}
                                        />
                                        <label className="chang-color m-0">
                                            Husk meg
                                        </label>
                                    </Flex>
                                )}
                            </Field>
                        </div>
                        <Flex content="center" className="mt-5">
                            <button type="submit" className="btn">
                                Logg Inn
                            </button>
                        </Flex>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
