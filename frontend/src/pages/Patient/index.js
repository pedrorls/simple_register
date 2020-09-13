import React, { useEffect, useState } from "react";
import { PatientForm } from "../../components/forms/PatientForm";
import { Table } from "../../components/Table";
import { PatientAPI } from "../../resources/api/PatientsAPI";

export const Patient = () => {
  const [patients, setPatients] = useState([]);
  const [createForm, setCreateForm] = useState(false);
  const [patientData, setPatientData] = useState(PatientAPI.initial.patient);
  const [addressData, setAddressData] = useState(PatientAPI.initial.address);
  const [isEditing, setIsEditing] = useState(false);
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

  const handleOnCreate = async (event) => {
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

  const handleOnUpdate = async (event) => {
    event.preventDefault();
    await PatientAPI.update({ ...patientData, address: addressData })
      .then((response) => {
        const patientsCopy = patients.slice();
        const index = patientsCopy.findIndex(
          (patient) => patient.id === patientData.id
        );
        patientsCopy[index] = response;
        setPatients(patientsCopy);
        setPatientData(PatientAPI.initial.patient);
        setAddressData(PatientAPI.initial.address);
        setCreateForm(false);
        setIsEditing(false);
      })
      .catch((error) => setErrors(Object.entries(error.response.data)));
  };

  const handleOnCancel = () => {
    setPatientData(PatientAPI.initial.patient);
    setAddressData(PatientAPI.initial.address);
    setCreateForm(false);
  };

  const handleOnDelete = async (patientId) => {
    await PatientAPI.delete(patientId)
      .then((response) => {
        const patientsCopy = patients.slice();
        const newList = patientsCopy.filter(
          (patient) => patient.id !== patientId
        );
        setPatients(newList);
      })
      .catch((error) => console.log(error.response));
  };

  const handleOnEdit = async (patient) => {
    setAddressData(patient.address);
    setPatientData(patient);
    setIsEditing(true);
    setCreateForm(true);
  };

  return (
    <div>
      <h1>Patient List</h1>
      {!createForm && (
        <button
          onClick={() => {
            setIsEditing(false);
            setCreateForm(true);
          }}
        >
          Create patient
        </button>
      )}
      <ul>
        {errors.map((error, index) => (
          <li key={index}>{`${error[0]}: ${error[1]}`}</li>
        ))}
      </ul>
      {!createForm && (
        <Table
          patients={patients}
          handleOnEdit={handleOnEdit}
          handleOnDelete={handleOnDelete}
        />
      )}
      {createForm && (
        <PatientForm
          patientData={patientData}
          addressData={addressData}
          handlePatientChange={handlePatientChange}
          handleAddressChange={handleAddressChange}
          handleOnCreate={handleOnCreate}
          handleOnUpdate={handleOnUpdate}
          handleOnCancel={handleOnCancel}
          isEditing={isEditing}
        />
      )}
    </div>
  );
};
