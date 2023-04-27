import Nav from "../components/MainNav";
import cover from "../assets/img/talking_hands.jpeg";
import dummyProfile from "../assets/img/profile.svg";

function Profile() {
  return (
    <>
      <Nav />

      <div className="profile-bdy">
        {/* Photo by <a href="https://unsplash.com/@priscilladupreez?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Priscilla Du Preez</a> on <a href="https://unsplash.com/s/photos/cover-photo-chat?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a> */}
        <img className="cover" src={cover} alt="cover" />
        <div className="part-1 profile-header">
          <img src={dummyProfile} alt="avatar" />
          <h1>Namen Lorem</h1>
          <button>Rediger</button>
        </div>

        <div className="info">
          <p className="bio">Bio</p>
          <textarea></textarea>
          <p className="interests">Interesser</p>
          <div className="btns-odd">
            <button className="intress-btn">Mat</button>
            <button className="intress-btn">Knust</button>
            <button className="intress-btn">Litratur</button>
          </div>
        </div>
      </div>

      <footer>
        <p>Laget av Rami, Narges, Aina Og Fatima</p>
      </footer>
    </>
  );
}

export default Profile;
