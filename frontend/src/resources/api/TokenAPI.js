import axios from "axios";
import { axiosConfig } from "./axiosConfig";

const api = axios.create({
  ...axiosConfig,
  baseURL: `${axiosConfig.baseURL}/token-auth`,
});

export const TokenAPI = {
  get: async (data) => await api.post("/", data),
};
