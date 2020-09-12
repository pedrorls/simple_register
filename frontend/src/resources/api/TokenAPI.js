import axios from "axios";
import { axiosConfig } from "./axiosConfig";

const api = axios.create({
  ...axiosConfig,
  baseURL: `${axiosConfig.baseURL}/`,
});

export const TokenAPI = {
  get: async (data) => await api.post("/token/", data),
  refresh: async (token) => await api.post("/refresh-token/", { token }),
};
