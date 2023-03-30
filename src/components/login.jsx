import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../home.css";
import { authenticationRoute } from "../APIRoutes";

function Login() {
  // Initializes a navigate constant using the useNavigate hook from the React Router library.
  // This hook provides a way to navigate between pages within a single-page application.
  const navigate = useNavigate();

  // Initializes a state using the useState hook from React.
  //
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  // The useEffect hook is used to check if there is an existing user logged in.
  // If there is, the page is redirected to the home page ("/").
  useEffect(() => {
    // "metchat-user"?
    if (localStorage.getItem("metchat-user")) {
      navigate("/");
    }
  }, [navigate]);

  // The handleChange function is called when the user enters their email or password.
  // It updates the values state with the new values.
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // The handleValidation function is called when the user submits the form.
  //It checks if both the email and password fields are filled.
  // If not, an alert is displayed asking the user to fill in the required fields.
  //This function returns a boolean value indicating whether the validation was successful or not.
  const handleValidation = () => {
    const { email, password } = values;
    if (email === "" || password === "") {
      alert("Fyll inn feltene.");
      return false;
    }
    return true;
  };

  //  handleSubmit function is called when the user submits the form.
  // First, the default action of refreshing the page is prevented.
  // Then sends a POST request to the server with the user's email and password.
  // If the validation is successful, and the server returns a successful response, the user's details are saved in localStorage, an alert message is displayed, and the page is redirected to the home page.
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
      }
    }
  };

  // The return statement returns the JSX code that defines the login form.
  // When the user enters their email or password, the handleChange function is called to update the values state with the new values.
  // When the user submits the form, the handleSubmit function is called to validate the input and send a request to the server.
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
