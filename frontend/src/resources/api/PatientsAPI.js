import api from "./axiosConfig";

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
    const response = await api.get("/api/patients/");
    return response.data;
  },

  create: async (data) => {
    const response = await api.post("/api/patients/", data);
    return response.data;
  },

  update: async (data) => {
    const response = await api.patch(`/api/patients//${data.id}/`, data);
    return response.data;
  },

  delete: async (patientId) => {
    const response = await api.delete(`/api/patients//${patientId}/`);
    return response.data;
  },
};
