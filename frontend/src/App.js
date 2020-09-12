import React, { useEffect, useState } from "react";
import { Login } from "./pages/Login";
import { Patient } from "./pages/Patient";
import "./app.css";

export const App = () => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    localStorage.getItem("token") ? setIsLogged(true) : setIsLogged(false);
  }, []);

  return <>{isLogged ? <Patient /> : <Login setIsLogged={setIsLogged} />}</>;
};
