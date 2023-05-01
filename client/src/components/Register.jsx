import { Field, Form, Formik } from "formik";
import React from "react";
import * as yup from "yup";
import { Flex } from "./Flex";

export const Register = ({ registerFormRef, setModel, model }) => {
    return (
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
                                {({ field }) => (
                                    <input id="last_name" {...field} />
                                )}
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
                                {({ field }) => (
                                    <input id="email_reg" {...field} />
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
                            {errors.confirmPassword &&
                            touched.confirmPassword ? (
                                <div className="text-warning">
                                    {errors.confirmPassword}
                                </div>
                            ) : null}
                        </div>

                        <Flex content="center" className="mt-5">
                            <button type="submit" className="btn">
                                Register
                            </button>
                        </Flex>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
