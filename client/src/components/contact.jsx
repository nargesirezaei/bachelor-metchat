import pluss from "../assets/img/pluss.svg";
import profile from "../assets/img/profile.svg";
import mail from "../assets/img/mail.jpg";
import { Flex } from "./Flex";
import { Link, useNavigate } from "react-router-dom";
export const Contact = ({
    contact,
    width = 50,
    height = 50,
    textStyle,
    onAdd,
    onDelete,
    visibleIcons,
    isInMyContacts,
}) => {
    const navigate = useNavigate();
    return (
        <>
            <Flex className="mb-2" align="center" content="space-between">
                <div>
                    <img
                        src={profile}
                        alt="profil-icon"
                        style={{ width: width, height: height }}
                    />
                    <span className="ps-2" style={{ ...textStyle }}>
                        {contact?.name}
                    </span>
                </div>
                {visibleIcons && (
                    <Flex style={{ minWidth: 150 }} content="space-between">
                        {!isInMyContacts && (
                            <img
                                src={pluss}
                                width={30}
                                className="cursor-pointer"
                                style={{ cursor: "pointer" }}
                                onClick={() => onAdd(contact._id)}
                                alt=""
                            />
                        )}
                        {isInMyContacts && (
                            <span
                                className="text-danger cursor-pointer"
                                style={{
                                    position: "relative",
                                    left: "7px",
                                    fontSize: "28px",
                                    cursor: "pointer",
                                }}
                                onClick={() => onDelete(contact?._id)}
                            >
                                ×
                            </span>
                        )}

                        <Link to={`/samtaler?contactId:${contact?._id}`}>
                            <img
                                src={mail}
                                width={70}
                                className="cur-pointer"
                                style={{ opacity: 0.7 }}
                                alt=""
                            />
                        </Link>
                    </Flex>
                )}
            </Flex>
        </>
    );
};
