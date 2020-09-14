import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { TokenAPI } from "../../resources/api/TokenAPI";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isValid, setIsValid] = useState(false);
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    const getToken = async () => {
      const token = await localStorage.getItem("token");
      await TokenAPI.verify(token)
        .then((response) => {
          setIsValid(true);
        })
        .catch(async (error) => {
          await TokenAPI.refresh(token)
            .then(async (response) => {
              await localStorage.setItem("token", response.data.token);
              setIsValid(true);
            })
            .catch((error) => setIsValid(false));
        })
        .finally(() => setWaiting(false));
    };
    getToken();
  }, []);

  if (waiting) return <p>Loading ...</p>;

  return (
    <Route
      {...rest}
      render={(props) =>
        isValid ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login/" }} />
        )
      }
    />
  );
};
