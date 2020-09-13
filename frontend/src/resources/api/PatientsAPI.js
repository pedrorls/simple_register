import axios from "axios";
import { axiosConfig } from "./axiosConfig";
import { TokenAPI } from "./TokenAPI";

const api = axios.create({
  ...axiosConfig,
  baseURL: `${axiosConfig.baseURL}/api/patients`,
});

// Request interceptor for API calls
api.interceptors.request.use(
  async (config) => {
    const token = await localStorage.getItem("token");
    config.headers = {
      Authorization: `JWT ${token}`,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const token = await localStorage.getItem("token");
      const access_token = await TokenAPI.refresh(token);
      await localStorage.setItem("token");
      axios.defaults.headers.common["Authorization"] = "JWT " + access_token;
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const PatientAPI = {
  initial: {
    patient: {
      name: "",
      email: "",
      birth_date: "",
      phone: null,
      cpf: null,
    },
    address: {
      street: "",
      additional_adress: "",
      number: null,
      zip_code: null,
      state: "",
      city: "",
    },
  },
  list: async () => {
    const response = await api.get("/");
    return response.data;
  },

  create: async (data) => {
    const response = await api.post("/", data);
    return response.data;
  },

  update: async (data) => {
    const response = await api.patch(`/${data.id}/`, data);
    return response.data;
  },

  delete: async (patientId) => {
    const response = await api.delete(`/${patientId}/`);
    return response.data;
  },
};
