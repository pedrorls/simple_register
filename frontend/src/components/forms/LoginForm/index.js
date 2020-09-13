import React from "react";
import "./styles.css";

export const LoginForm = ({ data, handleOnchange, handleOnSubmit }) => (
  <form onSubmit={handleOnSubmit}>
    <label htmlFor="username">Username</label>
    <input
      type="text"
      name="username"
      value={data.username}
      onChange={handleOnchange}
    />
    <label htmlFor="password">Password</label>
    <input
      type="password"
      name="password"
      value={data.password}
      onChange={handleOnchange}
    />
    <button type="submit">Login</button>
  </form>
);
