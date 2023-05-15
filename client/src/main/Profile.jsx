import classNames from "classnames";
import * as yup from "yup";

import { Field, Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { accountApi } from "../api/account-api";
import { profileApi } from "../api/profile-api";
import { userInterestApi } from "../api/user-interest-api";
import cover from "../assets/img/cover.png";
import { Flex } from "../components/Flex";
import Nav from "../components/MainNav";
import { Contact } from "../components/contact";
import { Interesser } from "../components/interesser";
import { Loading } from "../components/loading";
import { useQuery } from "../components/use-query";
import { useScreenSize } from "../app/theme-context";

export const Profile = () => {
    const q = useQuery();
    const contactId = q.get("contactId") ?? null;
    const screen = useScreenSize();
    const isMobile = screen.isMobile;
    const [model, setModel] = useState({ readOnly: true, init: false });
    const passwordFormRef = useRef();

    useEffect(() => {
        profileApi
            .profile({ contactId })
            .then((result) =>
                setModel({
                    ...model,
                    ...result.data.user,
                    init: true,
                })
            )
            .catch(() => alert("error in init profile"));
    }, [contactId]);

    const handelEdit = () => {
        if (model.readOnly) setModel({ ...model, readOnly: false });
        else {
            new Promise((resolve, reject) => {
                profileApi.changeBio({ bio: model.bio });

                if (passwordFormRef.current.values.password)
                    accountApi.changePassword({
                        password: passwordFormRef.current.values.password,
                    });

                setModel({ ...model, readOnly: true });
                resolve();
            })
                .then((x) => {
                    alert("Profilen ble endret!");
                })
                .catch(() => alert("error in update profile"));
        }
    };

    const onChangeAvatarHandler = (avatar) => {
        profileApi
            .changeAvatar({ avatar: avatar })
            .then(() => {
                setModel({
                    ...model,
                    avatar,
                });
            })
            .catch(() => alert("error in init profile"));
    };

    const addIntrest = (x) =>
        userInterestApi
            .create({
                interestId: x._id,
            })
            .then((result) => {
                setModel({
                    ...model,
                    userInterests: [...model.userInterests, result.data.userInterest],
                });
            });

    const deleteIntrest = (x) => {
        userInterestApi
            .delete({
                interestId: x._id,
            })
            .then(() => {
                var userInterests = model.userInterests.filter((c) => c.interestId !== x._id);
                setModel({
                    ...model,
                    userInterests,
                });
            });
    };
    const sm = { width: isMobile ? "90%" : 500 };

    if (!model.init) return <Loading />;

    return (
        <>
            <Nav />

            <div
                className=" w-100"
                style={{
                    height: 300,
                    backgroundImage: `url(${cover})`,
                    backgroundSize: "cover",
                }}
            ></div>
            <div className="container-fluid">
                <Flex content="space-between">
                    <div style={{ marginTop: -50 }}>
                        <Contact
                            width={100}
                            height={100}
                            textStyle={{
                                top: 30,
                                position: "relative",
                                fontSize: 35,
                                fontWeight: "bold",
                            }}
                            contact={{
                                name: model.firstName + " " + model.lastName,
                                avatar: model.avatar,
                                email: model.email,
                            }}
                            allowChangeAvatar
                            onChangeAvatarHandler={onChangeAvatarHandler}
                            readOnly={model.readOnly}
                        />
                    </div>
                    {model.allowEdit && (
                        <button
                            className="profile-edit-button btn"
                            onClick={handelEdit}
                            style={{
                                right: isMobile ? 10 : 100,
                                top: isMobile ? 550 : 480,
                            }}
                        >
                            {model.readOnly ? <span>Rediger</span> : <span>save</span>}
                        </button>
                    )}
                </Flex>

                <div
                    className={classNames("mt-5 mb-5", {
                        "ms-0": isMobile,
                        "ms-5": !isMobile,
                    })}
                >
                    <h6 className="border-bottom pb-2">Bio</h6>
                    <textarea
                        style={sm}
                        readOnly={model.readOnly}
                        className={classNames({ "bg-light": model.readOnly })}
                        value={model.bio}
                        onChange={(e) => setModel({ ...model, bio: e.target.value })}
                    ></textarea>

                    {model.interests?.length > 0 && (
                        <>
                            <h6 className="mt-5 border-bottom pb-2">Interesser</h6>
                            <Flex className="flex-wrap" style={{ maxWidth: 1000 }}>
                                {model.interests.map((x) => {
                                    var userInt = model.userInterests.find((i) => i.interestId === x._id);
                                    if (!model.allowEdit && !userInt) return "";
                                    return (
                                        <Interesser
                                            key={x._id}
                                            interess={x}
                                            onClick={() => {
                                                if (model.readOnly) return;

                                                if (!userInt) addIntrest(x);
                                                else deleteIntrest(x);
                                            }}
                                            isActive={userInt}
                                            className="mb-2"
                                        />
                                    );
                                })}
                            </Flex>
                        </>
                    )}

                    {model.allowEdit && (
                        <>
                            {" "}
                            <h6 className="mt-5 border-bottom pb-2">Change password</h6>
                            <Formik
                                initialValues={{
                                    password: "",
                                    confirmPassword: "",
                                }}
                                validationSchema={yup.object({
                                    password: yup.string().required("Required").min(6, "password-minimum-length-is-6-characters"),
                                    confirmPassword: yup
                                        .string()
                                        .required("Required")
                                        .oneOf([yup.ref("password"), null], "passwords-must-match"),
                                })}
                                innerRef={passwordFormRef}
                            >
                                {({ errors, touched }) => (
                                    <Form id="form_reg">
                                        <div className="form-row mt-0 pt-0">
                                            <label>Passord</label>
                                            <Field name="password">
                                                {({ field }) => (
                                                    <input
                                                        type="password"
                                                        id="password_reg"
                                                        style={sm}
                                                        {...field}
                                                        readOnly={model.readOnly}
                                                    />
                                                )}
                                            </Field>
                                            {errors.password && touched.password ? (
                                                <div className="text-warning">{errors.password}</div>
                                            ) : null}
                                        </div>
                                        <div className="form-row mt-0">
                                            <label>Gjente Passord</label>
                                            <Field name="confirmPassword">
                                                {({ field }) => (
                                                    <input
                                                        type="password"
                                                        id="password_reg"
                                                        style={sm}
                                                        {...field}
                                                        readOnly={model.readOnly}
                                                    />
                                                )}
                                            </Field>
                                            {errors.confirmPassword && touched.confirmPassword ? (
                                                <div className="text-warning">{errors.confirmPassword}</div>
                                            ) : null}
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};
