import React, { useEffect, useState } from "react";
import { PatientForm } from "../../components/forms/PatientForm";
import { Table } from "../../components/Table";
import { PatientAPI } from "../../resources/api/PatientsAPI";

export const Patient = () => {
  const [patients, setPatients] = useState([]);
  const [createForm, setCreateForm] = useState(false);
  const [patientData, setPatientData] = useState(PatientAPI.initial.patient);
  const [addressData, setAddressData] = useState(PatientAPI.initial.address);
  const [errors, setErrors] = useState([]);

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
    setAddressData({
      ...addressData,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    await PatientAPI.create({ ...patientData, address: addressData })
      .then((response) => {
        const patientsCopy = patients.slice();
        patientsCopy.push(response);
        setPatients(patientsCopy);
        setPatientData(PatientAPI.initial.patient);
        setAddressData(PatientAPI.initial.address);
        setCreateForm(false);
      })
      .catch((error) => setErrors(Object.entries(error.response.data)));
  };

  const handleOnCancel = () => {
    setPatientData(PatientAPI.initial.patient);
    setAddressData(PatientAPI.initial.address);
    setCreateForm(false);
  };

  return (
    <div>
      <h1>Patient List</h1>
      {!createForm && (
        <button onClick={() => setCreateForm(true)}>Create patient</button>
      )}
      {!createForm && <Table patients={patients} />}
      {createForm && (
        <ul>
          {errors.map((error, index) => (
            <li key={index}>{`${error[0]}: ${error[1]}`}</li>
          ))}
        </ul>
      )}
      {createForm && (
        <PatientForm
          patientData={patientData}
          addressData={addressData}
          handlePatientChange={handlePatientChange}
          handleAddressChange={handleAddressChange}
          handleOnSubmit={handleOnSubmit}
          handleOnCancel={handleOnCancel}
        />
      )}
    </div>
  );
};
