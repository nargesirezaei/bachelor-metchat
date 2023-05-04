import { Link } from "react-router-dom";
import { Flex } from "../components/Flex";
import { Logo } from "../components/logo";
import profile from "../assets/img/profile.svg";
import pluss from "../assets/img/pluss.svg";
export const Interests = () => {
  return (
    <>
      <nav>
        <div className="container" style={{ zIndex: 9999 }}>
          <Flex content="space-between" align="center">
            <Logo />
            <Flex className="m-0" gap={3}>
              <li className="push">
                <Link to="/logout" className="text-light">
                  Log ut
                </Link>
              </li>
            </Flex>
          </Flex>
        </div>
      </nav>
      <section id="first">
        <h1 className="text-center">
          Snart ferdig. Fortell oss litt om deg selv
        </h1>
        <img src={profile} className="profile-icon" />
        <div className="box">
          <label className="text">Om Meg</label>
          <textarea></textarea>
          <h2>Intresser</h2>
          <div className="btns-odd">
            <button className="intress-btn">Mat</button>
            <button className="intress-btn">Knust</button>
            <button className="intress-btn">Litratur</button>
          </div>
          <div className="btns-even">
            <button className="intress-btn">Idrett</button>
            <button className="intress-btn">Dyr</button>
            <button className="intress-btn">Språk</button>
            <button className="intress-btn">Musikk</button>
          </div>
          <div className="showMore">
            <a href="">
              <img src={pluss} alt="pluss-icon" />
            </a>
            <button>Vis flere</button>
          </div>
        </div>
      </section>
      <Flex className="btns" style={{ backgroundColor: "transparent" }}>
        <button>Tilbake</button>
        <button>Gå Videre</button>
      </Flex>
    </>
  );
};
