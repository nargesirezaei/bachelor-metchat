import { useEffect, useState } from "react";
import { profileApi } from "../api/profile-api";
import { useAccount } from "../app/account-context";
import cover from "../assets/img/cover.png";
import { Flex } from "../components/Flex";
import { Contact } from "../components/contact";
import { Interesser } from "../components/interesser";
import { TopNav } from "../components/top-nav";
import classNames from "classnames";
export const Profile = () => {
    var account = useAccount();
    var [model, setModel] = useState();

    useEffect(() => {
        if (model) return;

        profileApi
            .me()
            .then((result) => setModel(result))
            .catch(() => alert("error in init profile"));
    }, [model]);
    return (
        <>
            <TopNav />

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
                            contact={{ name: account.displayName }}
                        />
                    </div>
                    <button
                        className="profile-edit-button btn"
                        onClick={() => setModel({ ...model, readOnly: false })}
                    >
                        Rediger
                    </button>
                </Flex>

                <div className="ms-5 mt-5 mb-5">
                    <h6>Bio</h6>
                    <textarea
                        style={{ width: 500 }}
                        readOnly={model?.readOnly}
                        className={classNames({ "bg-light": model?.readOnly })}
                    ></textarea>

                    <h6 className="mt-5">Interesser</h6>
                    <Interesser name="Mat" />
                    <Interesser name="Knust" />
                    <Interesser name="Litratur" />
                </div>
            </div>
        </>
    );
};
