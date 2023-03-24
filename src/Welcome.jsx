import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { welcomeRoute } from "./TempRoutes";
import "./home.css";

function Welcome() {
  const navigate = useNavigate();

  const [email_log, setEmail_log] = useState("");
  const [password_log, setPassword_log] = useState("");

  useEffect(() => {
    if (localStorage.getItem("metchat-user")) {
      navigate("/");
    }
  }, [navigate]);

  const handleValidation = () => {
    if (email_log === "" || password_log === "") {
      alert("Fyll inn feltene.");
      return false;
    }
    return true;
  };

  async function handleSubmit(e) {
    e.preventDefault(); // prevents the page form refreshing or moving to another url.
    console.log("email", email_log);
    console.log("password", password_log);

    if (handleValidation()) {
      const { data } = await axios.post(welcomeRoute, {
        email_log,
        password_log,
      });

      if (data.status === false) {
        alert(data.msg);
      } else if (data.status === true) {
        localStorage.setItem("metchat-user", JSON.stringify(data.user));
        alert("Logged in");
        navigate("/");
      }
    }
  }

  return (
    <>
      <nav>
        <a href="index.html">
          <img src="Logo.svg" alt="logo" />
        </a>
        <ul className="main-nav">
          <li className="push">
            <a href="/">Om Oss</a>
          </li>
        </ul>
      </nav>

      <section id="first">
        <div id="lines_1">
          <img src="Lines.png" alt="pyntelinjer" />
        </div>

        <div className="log-reg">
          <div className="btn-container">
            <button className="tab-btn active" data-id="log_in">
              {" "}
              Logg Inn
            </button>
            <button className="tab-btn reg" data-id="reg">
              Register
            </button>
          </div>

          <div className="log-reg-content">
            <div className="content active inactive" id="log_in">
              <form id="form_log" onSubmit={handleSubmit}>
                <div className="form-row">
                  <label>Epost</label>
                  <input
                    type="text"
                    required
                    id="email_log"
                    value={email_log}
                    onInput={(e) => setEmail_log(e.target.value)}
                  />
                </div>
                <div className="form-row">
                  <label>Passord</label>
                  <input
                    type="password"
                    required
                    id="password_log"
                    value={password_log}
                    onInput={(e) => setPassword_log(e.target.value)}
                  />
                </div>
                <div className="form-row">
                  <input type="checkbox" />
                  <label className="chang-color">Husk meg</label>
                </div>
                <button type="submit" className="btn">
                  Logg Inn
                </button>
              </form>
            </div>
          </div>

          <div className="content" id="reg">
            <form id="form_reg">
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
            </form>
            <button className="btn-reg">Register</button>
          </div>
        </div>
      </section>

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

      <section id="second">
        <img id="photo" src="photo.png" alt="personer som snakker" />
      </section>

      <section id="third">
        <img src="Lines_2.png" alt="lines" />
      </section>

      <section id="nlp">
        <img src="BubbleBox.png" alt="bobleramme" />
        <div className="contents">
          <h2>Hva Er NLP</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia ab
            placeat saepe? Ex, maxime! Quis, commodi. Labore error iusto a,
            ipsa, optio architecto vero aperiam nesciunt facilis pariatur,
            nostrum itaque.
          </p>
          <button className="btn"> Les mer..</button>
        </div>
      </section>

      <section id="fifth">
        <img src="Lines.png" alt="lines" />
      </section>

      <footer>
        <p>Laget av Rami, Narges, Aina Og Fatima</p>
      </footer>
    </>
  );
}

export default Welcome;
