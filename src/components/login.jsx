import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../home.css";

function Login() {
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
      const { data } = await axios.post({
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
  );
}

export default Login;
