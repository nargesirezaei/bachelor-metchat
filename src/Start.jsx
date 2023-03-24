import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { startRoute } from "./TempRoutes";
import "./home.css";

function Start() {
  return (
    <>
      <nav>
        <a href="index.html">
          <img src="Logo.svg" alt="logo" />
        </a>
        <ul class="main-nav">
          <li class="push">
            <a href="">Om Oss</a>
          </li>
        </ul>
      </nav>

      <section id="first">
        <div id="lines_1">
          <img src="Lines.png" alt="lines" />
        </div>

        <div class="log-reg">
          <div class="btn-container">
            <button class="tab-btn active" data-id="log_in">
              {" "}
              Logg Inn
            </button>
            <button class="tab-btn reg" data-id="reg">
              Register
            </button>
          </div>

          <div class="log-reg-content">
            <div class="content active inactive" id="log_in">
              <form id="form_log">
                <div class="form-row">
                  <label>Epost</label>
                  <input type="text" required id="email_log" />
                </div>
                <div class="form-row">
                  <label>Passord</label>
                  <input type="password" required id="password_log" />
                </div>
                <div class="form-row">
                  <input type="checkbox" />
                  <label class="chang-color">Husk meg</label>
                </div>
                <button type="submit" class="btn">
                  Logg Inn
                </button>
              </form>
            </div>
          </div>

          <div class="content" id="reg">
            <form id="form_reg">
              <div class="form-row">
                <label>Fornavn</label>
                <input type="text" required id="first_name" />
              </div>
              <div class="form-row">
                <label>Etternavn</label>
                <input type="text" required id="last_name" />
              </div>
              <div class="form-row">
                <label>Epost</label>
                <input type="text" required id="email_reg" />
              </div>
              <div class="form-row">
                <label>Passord</label>
                <input type="password" required id="password_reg" />
              </div>
              <div class="form-row">
                <label>Gjente Passord</label>
                <input type="password" required id="repeat_passowrd" />
              </div>
            </form>
            <button class="btn-reg">Register</button>
          </div>
        </div>
      </section>

      <div class="model-overlay">
        <div class="scroll-div">
          <div class="heading">
            <p>Vilkår for tjenesten</p>
          </div>
          <div class="scroll-div-object">
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
          <div class="btns">
            <div>
              <input type="checkbox" />
              <label> Jeg har lest alt, og samtrykker..</label>
            </div>

            <div>
              <button class="btn">Tilbake</button>
              <a href="interests.html">
                <button class="btn">Gå Videre</button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <section id="second">
        <img id="photo" src="photo.png" alt="home-photo" />
      </section>

      <section id="third">
        <img src="Lines_2.png" alt="lines" />
      </section>

      <section id="nlp">
        <img src="BubbleBox.png" />
        <div class="contents">
          <h2>Hva Er NLP</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia ab
            placeat saepe? Ex, maxime! Quis, commodi. Labore error iusto a,
            ipsa, optio architecto vero aperiam nesciunt facilis pariatur,
            nostrum itaque.
          </p>
          <button class="btn"> Les mer..</button>
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

export default Start;
