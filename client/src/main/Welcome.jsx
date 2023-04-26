import { useState } from "react";
import { Link } from "react-router-dom";
import { HiBars3 } from "react-icons/hi2";
import Login from "../components/login";
import Register from "../components/Register";
import logo from "../assets/img/Logo.svg";
import lines1 from "../assets/img/Lines.png";
import people from "../assets/img/photo.png";
import lines2 from "../assets/img/Lines_2.png";
import BubbleBox from "../assets/img/Lines_2.png";

function Welcome() {
  const [showLogin, setShowLogin] = useState(true);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleRegisterClick = () => {
    setShowLogin(false);
  };
  /* Toggle Nav*/
  const [showLinks, setShowLinks] = useState(false);
  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <>
      <div className="homePage">
        <nav className="nav-center">
          <div className="nav-header">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>

            <a className="push" href="">
              Om Oss
            </a>

            <HiBars3 className="nav-toggle" onClick={toggleLinks} />
          </div>

          <ul
            className={
              showLinks ? "links-container show-container" : "links-container"
            }
          >
            <li>
              <a href="">Om Oss</a>
            </li>
          </ul>
        </nav>

        <div className="first">
          <div className="firstImages">
            <img src={lines1} className="img_1" alt="left decending lines" />
            <img src={people} className="img_2" alt="people chatting" />
          </div>

          <div id="LogReg">
            <div id="btn-tabs">
              <button
                id="btn-log"
                className="tabs active-tabs"
                data-id="btn-log"
                onClick={handleLoginClick}
              >
                Logg Inn
              </button>
              <button
                id="btn-reg"
                className="tabs active-tabs"
                data-id="reg"
                onClick={handleRegisterClick}
              >
                Registrer
              </button>
            </div>
            <div className="content-tabs">
              {showLogin ? <Login /> : <Register />}
            </div>
          </div>
        </div>

        {/*
        <div className="model-overlay">
          <div className="scroll-div">
            <div className="heading">
              <p>Vilkår for tjenesten</p>
            </div>
            <div className="scroll-div-object">
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Repellendus expedita iusto, eaque, aut maiores quas at unde
                delectus eius voluptatum, corrupti ex vitae commodi dolorem in
                quaerat cumque labore repellat!
              </p>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Repellendus expedita iusto, eaque, aut maiores quas at unde
                delectus eius voluptatum, corrupti ex vitae commodi dolorem in
                quaerat cumque labore repellat!
              </p>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Repellendus expedita iusto, eaque, aut maiores quas at unde
                delectus eius voluptatum, corrupti ex vitae commodi dolorem in
                quaerat cumque labore repellat!
              </p>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Repellendus expedita iusto, eaque, aut maiores quas at unde
                delectus eius voluptatum, corrupti ex vitae commodi dolorem in
                quaerat cumque labore repellat!
              </p>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Repellendus expedita iusto, eaque, aut maiores quas at unde
                delectus eius voluptatum, corrupti ex vitae commodi dolorem in
                quaerat cumque labore repellat!
              </p>
            </div>
            <div className="btns">
              <div>
                <input type="checkbox" />
                <label> Jeg har lest alt, og samtrykker..</label>
              </div>

              <div>
                <button className="btn">Tilbake</button>
                <a href="interests.html">
                  <button className="btn">Gå Videre</button>
                </a>
              </div>
            </div>
          </div>
        </div>
        */}
        <div className="second">
          <img src={lines2} className="img_3" alt="right decending lines" />
          <div className="nlp">
            <img
              src={BubbleBox}
              className="img_4"
              alt="bubble box background"
            />
            <h2>Hva Er NLP</h2>
            <p className="txt">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
              ab placeat saepe? Ex, maxime! Quis, commodi. Labore error iusto a,
              ipsa, optio architecto vero aperiam nesciunt facilis pariatur,
              nostrum itaque. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Officia ab placeat saepe? Ex, maxime! Quis, commodi. Labore
              error iusto a, ipsa, optio architecto vero aperiam nesciunt
              facilis pariatur, nostrum itaque.
            </p>
          </div>
          <img src={lines1} className="img_5" alt="left decending lines" />
        </div>
        <footer>
          <p>DATA3900-1 23V Bacheloroppgave</p>
        </footer>
      </div>
    </>
  );
}

export default Welcome;
