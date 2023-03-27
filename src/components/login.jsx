import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../home.css";
import { authenticationRoute } from "../APIRoutes";

function Login() {
  const navigate = useNavigate();

  //const [email_log, setEmail_log] = useState("");
  //const [password_log, setPassword_log] = useState("");
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    // "metchat-user"?
    if (localStorage.getItem("metchat-user")) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    const { email, password } = values;
    if (email === "" || password === "") {
      alert("Fyll inn feltene.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents the page form refreshing or moving to another url.
    console.log("email", values.email);
    console.log("password", values.password);

    if (handleValidation()) {
      const { email, password } = values;
      const { data } = await axios.post(`${authenticationRoute}/login`, {
        email,
        password,
      });

      if (data.status === false) {
        alert(data.msg);
      } else if (data.status === true) {
        localStorage.setItem("metchat-user", JSON.stringify(data.user));
        alert("Logged in");
        navigate("/"); // add navigation to contacts?
        alert("Logget inn");
      }
    }
  };

  return (
    <div className="content active inactive" id="log_in">
      <form id="form_log" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-row">
          <label>Epost</label>
          <input
            type="text"
            required
            id="email_log"
            name="email"
            onInput={(e) => handleChange(e)}
          />
        </div>
        <div className="form-row">
          <label>Passord</label>
          <input
            type="password"
            required
            id="password_log"
            name="password"
            onInput={(e) => handleChange(e)}
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
