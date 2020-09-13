import React, { useState } from "react";
import { LoginForm } from "../../components/forms/LoginForm";
import { TokenAPI } from "../../resources/api/TokenAPI";
import "./styles.css";

export const Login = ({ setIsLogged }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);

  const handleOnchange = (event) => {
    setErrors([]);
    event.preventDefault();
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    await TokenAPI.get(credentials)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        setCredentials({ username: "", password: "" });
        setIsLogged(true);
      })
      .catch((error) => {
        setCredentials({
          ...credentials,
          password: "",
        });
        setErrors(Object.entries(error.response.data));
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <ul>
        {errors.map((error, index) => (
          <li key={index}>{`${error[0]}: ${error[1]}`}</li>
        ))}
      </ul>
      <LoginForm
        data={credentials}
        handleOnchange={handleOnchange}
        handleOnSubmit={handleOnSubmit}
      />
    </div>
  );
};
