import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Register() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [userRegistered, setUserRegistered] = useState({
    email: "default@email.com",
    firstname: "default",
    lastname: "default",
    password: "default",
  });

  const navigate = useNavigate();
  const handleForm = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify(userRegistered);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    if (confirmPassword === userRegistered.password) {
      fetch(`${BACKEND_URL}/api/register`, requestOptions)
        .then(() => {
          navigate("/");
        })
        .catch((err) => console.error(err));
    } else {
      setErrorMessage("Vos mot de passe ne correspondent pas");
    }
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleForm} isRequired>
        <div className="inputContainer">
          <label htmlFor="firstname" className="form-label">
            Firstname
          </label>
          <input
            placeholder="Firstname"
            onChange={(e) =>
              setUserRegistered({
                ...userRegistered,
                firstname: e.target.value,
              })
            }
            type="firstname"
            className="loginInput"
            id="firstname"
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="lastname" className="form-label">
            Lastname
          </label>
          <input
            placeholder="Laststname"
            onChange={(e) =>
              setUserRegistered({
                ...userRegistered,
                lastname: e.target.value,
              })
            }
            type="lastname"
            className="loginInput"
            id="lastname"
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            placeholder="Email"
            onChange={(e) =>
              setUserRegistered({ ...userRegistered, email: e.target.value })
            }
            type="email"
            className="loginInput"
            id="email"
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            placeholder="Password"
            onChange={(e) =>
              setUserRegistered({
                ...userRegistered,
                password: e.target.value,
              })
            }
            type="password"
            className="loginInput"
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="password" className="form-label">
            Confirm Password
          </label>
          <input
            placeholder="Confirm Password"
            type="password"
            className="loginInput"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <p>{errorMessage}</p>
        <button className="loginButton" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
