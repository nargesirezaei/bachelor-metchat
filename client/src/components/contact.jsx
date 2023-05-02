import profile from "../assets/img/profile.svg";
import { Flex } from "./Flex";
import pluss from "../assets/img/pluss.svg";
import { contactApi } from "../api/contact-api";
export const Contact = ({
    contact,
    width = 50,
    height = 50,
    textStyle,
    onAdd,
}) => {
    return (
        <Flex vertical gap={3}>
            <div className="mb-2">
                <img
                    src={profile}
                    alt="profil-icon"
                    style={{ width: width, height: height }}
                />
                <span className="ps-2" style={{ ...textStyle }}>
                    {contact.name}
                </span>
                <img
                    src={pluss}
                    width={30}
                    className="float-end cursor-pointer"
                    style={{ cursor: "pointer" }}
                    onClick={() => onAdd(contact._id)}
                />
            </div>
        </Flex>
    );
};
