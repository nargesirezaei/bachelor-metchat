import profile from "../assets/img/profile.svg";
export const Contact = ({ contact, width = 50, height = 50, textStyle }) => {
    return (
        <div class="info">
            <img
                src={profile}
                alt="profil-icon"
                style={{ width: width, height: height }}
            />
            <span className="ps-2" style={{ ...textStyle }}>
                {contact.name}
            </span>
        </div>
    );
};
