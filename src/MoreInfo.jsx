import React from "react";
import "./interests.css";

function MoreInfo() {
  return (
    <>
      <nav>
        <a href="./Welcome.jsx">
          <img src="Logo.svg" alt="Logo" />
        </a>
        <ul class="main-nav">
          <li class="push">
            <a href="">Log ut</a>
          </li>
        </ul>
      </nav>
      <section id="first">
        <h1>Snart ferdig. Fortell oss litt om deg selv</h1>
        <img class="profile-icon" src="profile.svg" alt="profile-icon" />
        <div class="box">
          <label class="text">Om Meg</label>
          <textarea></textarea>
          <h2>Intresser</h2>
          <div class="btns-odd">
            <button class="intress-btn">Mat</button>
            <button class="intress-btn">Knust</button>
            <button class="intress-btn">Litratur</button>
          </div>
          <div class="btns-even">
            <button class="intress-btn">Idrett</button>
            <button class="intress-btn">Dyr</button>
            <button class="intress-btn">Språk</button>
            <button class="intress-btn">Musikk</button>
          </div>
          <div class="showMore">
            <a href="">
              <img src="pluss.svg" alt="pluss-icon" />
            </a>
            <button>Vis flere</button>
          </div>
        </div>
      </section>
      <div class="btns">
        <button>Tilbake</button>
        <a href="contacts.html">
          <button>Gå Videre</button>
        </a>
      </div>

      <footer>
        <p>Laget av Rami, Narges, Aina Og Fatima</p>
      </footer>
    </>
  );
}
export default MoreInfo;
