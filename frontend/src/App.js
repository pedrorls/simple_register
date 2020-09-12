import React, { useEffect, useState } from "react";
import { Login } from "./pages/Login";
import "./app.css";

export const App = () => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    localStorage.getItem("token") ? setIsLogged(true) : setIsLogged(false);
  }, []);

  return (
    <>{isLogged ? <h1>show list</h1> : <Login setIsLogged={setIsLogged} />}</>
  );
};
