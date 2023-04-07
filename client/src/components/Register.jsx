import React, { useState } from "react";
import axios from "axios";
import { authenticationRoute } from "../APIRoutes";

function Register() {
  const [values, setValues] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { fname, lname, email, password, confirmPassword } = values;
    if (password !== confirmPassword) {
      alert("Feltene for passord er ikke like.");
      return false;
    } else if (fname.length < 3) {
      alert("Fornavn må være minst tre bokstaver.");
      return false;
    } else if (lname.length < 2) {
      alert("Etternavn må være minst to bokstaver.");
      return false;
    } else if (
      !/^[a-zæøåA-ZÆØÅ()]+$/.test(fname) ||
      !/^[a-zæøåA-ZÆØÅ()]+$/.test(lname)
    ) {
      alert(
        "Navnet ditt kan bare bestå av bokstaver fra det norske alfabetet."
      );
      return false;
    } else if (password.length < 8) {
      alert("Passordet må være minst åtte(8) tegn.");
      return false;
    } else if (
      !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      alert("E-post er i feil format.");
      return false;
    } // regex for e-post

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { fname, lname, email, password } = values;
      await axios.post(`${authenticationRoute}/register`, {
        firstName: fname,
        lastName: lname,
        email,
        password,
      })
      .then(data => {
        localStorage.setItem("metchat-user", JSON.stringify(data.data.user));
        alert("Bruker opprettet"); // Noe bedre å si?
      })
      .catch(err => {
        alert(err.response.data.message);
      });

    }
  };

  return (
    <div className="content" id="reg">
      <form id="form_reg" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-row">
          <label>Fornavn</label>
          <input
            type="text"
            name="fname"
            required
            id="first_name"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-row">
          <label>Etternavn</label>
          <input
            type="text"
            name="lname"
            required
            id="last_name"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-row">
          <label>Epost</label>
          <input
            type="text"
            name="email"
            required
            id="email_reg"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-row">
          <label>Passord</label>
          <input
            type="password"
            name="password"
            required
            id="password_reg"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-row">
          <label>Gjenta Passord</label>
          <input
            type="password"
            name="confirmPassword"
            required
            id="repeat_passowrd"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button className="btn-reg" type="submit">
          Registrer
        </button>
      </form>
    </div>
  );
}

export default Register;
