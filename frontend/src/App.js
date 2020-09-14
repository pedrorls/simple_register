import React from "react";
import { Route, Switch } from "react-router-dom";
import { Login } from "./pages/Login";
import { Patient } from "./pages/Patient";
import { PrivateRoute } from "./components/PrivateRoute";

import "./app.css";

export const App = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Patient} />
      <Route path="/login" component={Login} />
    </Switch>
  );
};
