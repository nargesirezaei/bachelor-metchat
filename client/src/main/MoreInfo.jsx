import React, { useState, useEffect } from "react";
import { /*Link,*/ useNavigate } from "react-router-dom";
import axios from "axios";
import { IoIosAdd } from "react-icons/io";
import { profileRoute } from "../APIRoutes";
import { Nav } from "../components/nav";

export default function MoreInfo() {
  const navigate = useNavigate(),
    [user, setUser] = useState(undefined),
    [userName, setUserName] = useState(undefined);

  const [values, setValues] = useState({
    bio: "",
    interests: "",
  });

  useEffect(() => {
    async function fetchData() {
      if (!localStorage.getItem("metchat-user")) navigate("/");
      else {
        const data = await JSON.parse(localStorage.getItem("metchat-user"));
        setUser(data);
        setUserName(data.firstName);
      }
    }
    fetchData();
  }, [navigate]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { bio, interests } = values;
    if (bio.length < 5) {
      alert("Bio is too short.");
      return false;
    }
    /*else if (interests.length < 3) {
            alert("Select at least three interests",);
            return false;   
        }*/
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      console.log(`${profileRoute}/edit`);
      const { bio /*, interests*/ } = values;
      await axios
        .post(`${profileRoute}/edit`, {
          userId: user._id,
          bio,
          avatarImage: "",
          //interests,
        })
        .then((data) => {
          console.log(data);
          alert("Profile created");
          //navigate("/contacts");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <Nav />
      <section id="more-info">
        <h1>Snart ferdig. Fortell oss litt om deg selv</h1>
        <img class="profile-icon" src="profile.svg" alt="profile-icon" />
        <form class="box" id="infoForm" onSubmit={(e) => handleSubmit(e)}>
          <label class="text">Om Meg</label>
          <textarea name="bio" onChange={(e) => handleChange(e)}></textarea>
          <h2>Intresser</h2>
          <div class="btns-odd">
            <button type="button" class="intress-btn">
              Mat
            </button>
            <button type="button" class="intress-btn">
              Knust
            </button>
            <button type="button" class="intress-btn">
              Litratur
            </button>
          </div>
          <div class="btns-even">
            <button type="button" class="intress-btn">
              Idrett
            </button>
            <button type="button" class="intress-btn">
              Dyr
            </button>
            <button type="button" class="intress-btn">
              Språk
            </button>
            <button type="button" class="intress-btn">
              Musikk
            </button>
          </div>
          <div class="showMore">
            <a href="">
              <IoIosAdd />
            </a>
            <button>Vis flere</button>
          </div>
        </form>
      </section>
      <div class="btns">
        <button>Tilbake</button>
        <a href="">
          <button type="submit" form="infoForm">
            Gå Videre
          </button>
        </a>
      </div>

      <footer>
        <p>Laget av Rami, Narges, Aina Og Fatima</p>
      </footer>
    </>
  );
}
