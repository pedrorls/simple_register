import axios from "axios";
import { axiosConfig } from "./axiosConfig";

const api = axios.create({
  ...axiosConfig,
  baseURL: `${axiosConfig.baseURL}/token`,
});

export const TokenAPI = {
  get: async (data) => await api.post("/get/", data),
  refresh: async (token) => await api.post("/refresh/", { token }),
  verify: async (token) => await api.post("/verify/", { token }),
};
