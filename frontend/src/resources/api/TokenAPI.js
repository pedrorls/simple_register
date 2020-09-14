import api from "./axiosConfig";

export const TokenAPI = {
  get: async (data) => await api.post("/token/get/", data),
  refresh: async (token) => await api.post("/token/refresh/", { token }),
  verify: async (token) => await api.post("/token/verify/", { token }),
};
