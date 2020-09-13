import React, { useEffect, useState } from "react";
import { PatientForm } from "../../components/forms/PatientForm";
import { Table } from "../../components/Table";
import { PatientAPI } from "../../resources/api/PatientsAPI";

export const Patient = () => {
  const [patients, setPatients] = useState([]);
  const [createForm, setCreateForm] = useState(false);
  const [patientData, setPatientData] = useState({
    name: "",
    email: "",
    birth_date: "",
    phone: null,
    cpf: null,
  });
  const [addressData, setAddressData] = useState({
    street: "",
    additional_adress: "",
    number: null,
    zip_code: null,
    state: "",
    city: "",
  });

  useEffect(() => {
    const retrieve = async () => {
      const response = await PatientAPI.list();
      setPatients(response);
    };
    retrieve();
  }, []);

  const handlePatientChange = (event) => {
    event.preventDefault();
    setPatientData({
      ...patientData,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddressChange = (event) => {
    event.preventDefault();
    setPatientData({
      ...patientData,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <h1>Patient List</h1>
      {!createForm && (
        <button onClick={() => setCreateForm(true)}>Create patient</button>
      )}
      {!createForm && <Table patients={patients} />}
      {createForm && (
        <PatientForm
          patientData={patientData}
          addressData={addressData}
          handlePatientChange={handlePatientChange}
          handleAddressChange={handleAddressChange}
          handleOnSubmit={handleOnSubmit}
        />
      )}
    </div>
  );
};
