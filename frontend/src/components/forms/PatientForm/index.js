import React from "react";
import { AddressForm } from "../AddressForm";
import "./styles.css";

export const PatientForm = ({
  patientData,
  addressData,
  handlePatientChange,
  handleAddressChange,
  handleOnCreate,
  handleOnUpdate,
  handleOnCancel,
  isEditing,
}) => (
  <form onSubmit={isEditing ? handleOnUpdate : handleOnCreate}>
    <label htmlFor="name">Name</label>
    <input
      type="text"
      name="name"
      value={patientData.name}
      onChange={handlePatientChange}
    />
    <label htmlFor="email">Email</label>
    <input
      type="email"
      name="email"
      value={patientData.email}
      onChange={handlePatientChange}
    />
    <label htmlFor="phone">CPF</label>

    <input
      type="number"
      name="cpf"
      value={patientData.cpf}
      onChange={handlePatientChange}
    />
    <label htmlFor="birth_date">Birth date</label>
    <input
      type="date"
      name="birth_date"
      value={patientData.birth_date}
      onChange={handlePatientChange}
    />
    <label htmlFor="phone">Phone</label>
    <input
      type="number"
      name="phone"
      value={patientData.phone}
      onChange={handlePatientChange}
    />
    <AddressForm data={addressData} handleOnchange={handleAddressChange} />
    <button type="submit">{isEditing ? "Update" : "Create"}</button>
    <button type="button" onClick={handleOnCancel}>
      Cancel
    </button>
  </form>
);
