import { useState } from "react";
import { Link } from "react-router-dom";
import { HiBars3 } from "react-icons/hi2";
import Login from "./components/login";
import Register from "./components/Register";
import "./home.css";

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
  const [toggleState, setToggleState] = useState(1);
  const toggelTab = (index) => {
    setToggleState(index);
  };

  return (
    <>
      <div className="homePage">
        <nav className="nav-center">
          <div className="nav-header">
            <Link to="/">
              <img src="Logo.svg" alt="logo" />
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

        <div id="LogReg">
          <div id="btn-tabs">
            <button
              id="btn-log"
              className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggelTab(1)}
            >
              Logg Inn
            </button>
            <button
              id="btn-reg"
              className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggelTab(2)}
            >
              Register
            </button>
          </div>
          <div className="content-tabs">
            <div
              id="log-content"
              className={
                toggleState === 1 ? "content active-content" : "content"
              }
            >
              <form id="form-log">
                <div className="form-row">
                  <label>Epost</label>
                  <input type="text" required id="email_log" />
                </div>
                <div className="form-row">
                  <label>Passord</label>
                  <input type="password" required id="password_log" />
                </div>
                <div className="form-check">
                  <input type="checkbox" />
                  <label className="chang-color">Husk meg</label>
                </div>
                <div className="form-row">
                  <button type="submit" className="btn-form-log">
                    Logg Inn
                  </button>
                </div>
              </form>
            </div>

            <div
              id="reg-content"
              className={
                toggleState === 2 ? "content active-content" : "content"
              }
            >
              <form id="form-reg">
                <div className="form-row">
                  <label>Fornavn</label>
                  <input type="text" required id="first_name" />
                </div>
                <div className="form-row">
                  <label>Etternavn</label>
                  <input type="text" required id="last_name" />
                </div>
                <div className="form-row">
                  <label>Epost</label>
                  <input type="text" required id="email_reg" />
                </div>
                <div className="form-row">
                  <label>Passord</label>
                  <input type="password" required id="password_reg" />
                </div>
                <div className="form-row">
                  <label>Gjente Passord</label>
                  <input type="password" required id="repeat_passowrd" />
                </div>
                <div className="form-row">
                  <button className="btn-form-reg">Register</button>
                </div>
              </form>
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

        <div className="imgs">
          <img src="Lines.png" className="img_1" />
          <img src="photo.png" className="img_2" />
          <img src="Lines_2.png" className="img_3" />
          <img src="BubbleBox.png" className="img_4" />
          <img src="Lines.png" className="img_5" />
        </div>
        <footer>
          <h3>DATA3900-1 23V Bacheloroppgave</h3>
        </footer>
      </div>
    </>
  );
}

export default Welcome;
