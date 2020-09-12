import React, { useState } from "react";
import { Form } from "../../components/Form";
import { TokenAPI } from "../../resources/api/TokenAPI";
import "./styles.css";

export const Login = ({ setIsLogged }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);

  const handleOnchange = (event) => {
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
        setErrors(error.response.data.non_field_errors);
      });
  };
  return (
    <div>
      <h2>Login</h2>
      <ul>
        {errors.map((error, index) => (
          <li key={index}> {error}</li>
        ))}
      </ul>
      <Form
        data={credentials}
        handleOnchange={handleOnchange}
        handleOnSubmit={handleOnSubmit}
      />
    </div>
  );
};
