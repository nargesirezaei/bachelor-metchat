import { useState } from "react";
import { Modal, ModalHeader } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Avatars } from "../assets/img/avatars";
import mail from "../assets/img/mail.jpg";
import pluss from "../assets/img/pluss.svg";
import profile from "../assets/img/profile.svg";
import { Flex } from "./Flex";
import classNames from "classnames";

export const Contact = ({
    contact,
    width = 50,
    height = 50,
    textStyle,
    onAdd,
    onDelete,
    visibleIcons,
    isInMyContacts,
    onChangeAvatarHandler,
    allowChangeAvatar = false,
    inContact,
    readOnly = false,
    displayText = true,
    displayIntrests = false,
    showEmail = true,
    className,
    justifyContent,
    allowDelete,
    textInBottom = false,
    onSelectContact,
    mb = "mb-4",
}) => {
    const [model, setModel] = useState({ selectAvatar: false });

    return (
        <div
            className={classNames("cur-p", className, mb)}
            onClick={() => onSelectContact && onSelectContact(contact)}
        >
            <Flex
                className=""
                align="center"
                content={justifyContent ?? "space-between"}
            >
                <div
                    className={classNames("position-relative", {
                        "d-flex": !textInBottom,
                        "d-block": textInBottom,
                    })}
                >
                    {!readOnly && allowChangeAvatar && (
                        <small
                            className="position-absolute border bg-light rounded-5 p-1 "
                            style={{
                                opacity: 0.7,
                                left: 50,
                                fontSize: 15,
                                cursor: "pointer",
                            }}
                            onClick={() =>
                                setModel({ ...model, selectAvatar: true })
                            }
                        >
                            Change...
                        </small>
                    )}
                    <img
                        src={
                            contact?.avatar
                                ? Avatars.find((x) => x.id === contact.avatar)
                                      .value
                                : profile
                        }
                        alt="profil-icon"
                        style={{ width: width, height: height }}
                    />
                    {displayText && (
                        <Flex className="text-muted ps-1" vertical>
                            <span style={{ ...textStyle }}>
                                {" "}
                                {contact?.name}
                            </span>
                            <span
                                className="text-muted"
                                style={{
                                    fontSize: 18,
                                    marginTop: !inContact ? "25px" : "0",
                                }}
                            >
                                {showEmail && <>({contact?.email})</>}
                            </span>
                        </Flex>
                    )}
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
                        {isInMyContacts && allowDelete && (
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

                        <Link to={`/samtaler?contactId=${contact?._id}`}>
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
            {contact?.intrests?.length && displayIntrests && (
                <div className="intersts ps-2">
                    {contact.intrests?.map((i) => (
                        <button className="btn">{i.title}</button>
                    ))}
                </div>
            )}
            {allowChangeAvatar && (
                <SelectAvatar
                    show={model.selectAvatar}
                    onHide={() => setModel({ ...model, selectAvatar: false })}
                    onChangeAvatarHandler={(avatar) => {
                        setModel({ ...model, selectAvatar: false });
                        onChangeAvatarHandler(avatar);
                    }}
                />
            )}
        </div>
    );
};

const SelectAvatar = ({ show, onHide, onChangeAvatarHandler }) => {
    return (
        <Modal show={show} onHide={onHide} size="sm">
            <ModalHeader closeButton></ModalHeader>
            <Modal.Body className="p-0">
                <div className="p-3">
                    <Flex className="row" gap={1}>
                        {Avatars.map((x) => (
                            <div
                                style={{
                                    height: 50,
                                    width: 50,
                                    backgroundImage: `url(${x.value})`,
                                    backgroundSize: "cover",
                                    cursor: "pointer",
                                }}
                                onClick={() => onChangeAvatarHandler(x.id)}
                            ></div>
                        ))}
                    </Flex>
                </div>
            </Modal.Body>
        </Modal>
    );
};
