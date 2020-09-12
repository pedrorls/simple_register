import React from "react";
import { TokenAPI } from "../../resources/api/TokenAPI";

export const Patient = () => {
  const handleOnClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      TokenAPI.refresh(token);
    }
  };
  return (
    <div>
      <h1>Patient List</h1>
      <button onClick={handleOnClick}>refresh token</button>
    </div>
  );
};
