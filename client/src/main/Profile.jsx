import Nav from "../components/MainNav";
import cover from "../assets/img/talking_hands.jpeg";
import dummyProfile from "../assets/img/profile.svg";

function Profile() {
  return (
    <>
      <Nav />

      <div class="profile-bdy">
        {/* Photo by <a href="https://unsplash.com/@priscilladupreez?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Priscilla Du Preez</a> on <a href="https://unsplash.com/s/photos/cover-photo-chat?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a> */}
        <img class="cover" src={cover} alt="cover" />
        <div class="part-1 profile-header">
          <img src={dummyProfile} alt="avatar" />
          <h1>Namen Lorem</h1>
          <button>Rediger</button>
        </div>

        <div class="info">
          <p class="bio">Bio</p>
          <textarea></textarea>
          <p class="interests">Interesser</p>
          <div class="btns-odd">
            <button class="intress-btn">Mat</button>
            <button class="intress-btn">Knust</button>
            <button class="intress-btn">Litratur</button>
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
