import { useRef, useState } from "react";
import { Nav } from "../components/nav";
import { Login } from "../components/login";
import { Register } from "../components/Register";
import Lines1 from "../assets/img/Lines.png";
import Photo from "../assets/img/photo.png";
import Lines2 from "../assets/img/Lines_2.png";
import BubbleBox from "../assets/img/BubbleBox.png";

export const Welcome = () => {
  const [model, setModel] = useState({ auth: "login" });
  const registerFormRef = useRef();

  return (
    <div className="homePage">
      <Nav />
      <div className="first">
        <div className="firstImages">
          <img src={Lines1} className="png" />
          <img src={Photo} className="png" />
        </div>
        <div id="LogReg">
          <div id="btn-tabs">
            <button
              id="btn-log"
              className="tabs active-tabs"
              data-id="btn-log"
              onClick={() => setModel({ ...model, auth: "login" })}
            >
              Logg Inn
            </button>
            <button
              id="btn-reg"
              className="tabs active-tabs"
              data-id="reg"
              onClick={() => setModel({ ...model, auth: "reg" })}
            >
              Registrer
            </button>
          </div>
          {model.auth === "login" && <Login />}
          {model.auth === "reg" && (
            <Register
              registerFormRef={registerFormRef}
              model={model}
              setModel={setModel}
            />
          )}
        </div>
      </div>
      <div className="second">
        <img src={Lines2} className="png" />
        <div className="nlp">
          <img src={BubbleBox} className="png" />
          <h2>Hva Er NLP</h2>
          <p className="txt">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia ab
            placeat saepe? Ex, maxime! Quis, commodi. Labore error iusto a,
            ipsa, optio architecto vero aperiam nesciunt facilis pariatur,
            nostrum itaque. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Officia ab placeat saepe? Ex, maxime! Quis, commodi. Labore
            error iusto a, ipsa, optio architecto vero aperiam nesciunt facilis
            pariatur, nostrum itaque.
          </p>
        </div>
        <img src={Lines1} className="png_5" />
      </div>
    </div>
  );
};
