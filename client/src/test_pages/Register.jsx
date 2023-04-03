import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authenticationRoute } from "../APIRoutes";


export default function Register() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        fname: "",
        lname: "",
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: "",
    });
  
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };    
  
    const handleValidation = () => {
        const { fname, lname, email, confirmEmail, password, confirmPassword } = values;
        if (password !== confirmPassword) {
            alert("Password and confirm password are not the same.");
            return false;
        }
        else if (email !== confirmEmail) {
            alert("E-mail and confirm e-mail should be same.",);
            return false;   
        }
        else if (fname.length < 3) {
            alert("Firstname should be at least 3 characters.");
            return false;
        }
        else if (lname.length < 3) {
            alert("Lastname should be at least 3 characters.");
            return false;    
        }
        else if (!/^[a-zA-Z()]+$/.test(fname) || !/^[a-zA-Z()]+$/.test(lname)){
            alert("Your name can only include letters within the english alphabet.");
            return false;    
        }
        else if (password.length < 8) {
            alert("Password should be equal to or greater than 8 characters.");
            return false;
        }
        else if (email === "") {
            alert("Email is required.");
            return false;
        }
        return true;
    };
  
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const { fname, lname, email, password } = values;
            const { data } = await axios.post(`${authenticationRoute}/register`, {
                firstName : fname,
                lastName : lname,
                email,
                password,
            });
            
            if (data.status === 500 || data.status === false) {
                alert(data.msg);
            }
            else if (data.status === true) {
                localStorage.setItem(
                    "nlpchat-user",
                    JSON.stringify(data.user)
                );
                alert("User created");
            }
        };
    };

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <h1>Registrer deg</h1>
                <input
                    type="text"
                    placeholder="First name"
                    name="fname"
                    onChange={(e) => handleChange(e)}
                /><br />
                <input
                    type="text"
                    placeholder="Last name"
                    name="lname"
                    onChange={(e) => handleChange(e)}
                /><br />
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={(e) => handleChange(e)}
                /><br />
                <input
                    type="email"
                    placeholder="Email confirmation"
                    name="confirmEmail"
                    onChange={(e) => handleChange(e)}
                /><br />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={(e) => handleChange(e)}
                /><br />
                <input
                    type="password"
                    placeholder="Confirm password"
                    name="confirmPassword"
                    onChange={(e) => handleChange(e)}
                /><br />
                <button type="submit">Register User</button>
            </form>
        </div>
    );
}
