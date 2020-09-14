import React, { useEffect, useState } from "react";
import { Login } from "./pages/Login";
import { Patient } from "./pages/Patient";
import "./app.css";
import { TokenAPI } from "./resources/api/TokenAPI";

export const App = () => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const verify = async () => {
      if (token) {
        await TokenAPI.verify(token)
          .then((response) => {
            setIsLogged(true);
          })
          .catch(async (error) => {
            await TokenAPI.refresh(token)
              .then(async (response) => {
                await localStorage.setItem("token", response.data.token);
                setIsLogged(true);
              })
              .catch((error) => setIsLogged(false));
          });
      }
    };
    verify();
  }, []);

  return <>{isLogged ? <Patient /> : <Login setIsLogged={setIsLogged} />}</>;
};
