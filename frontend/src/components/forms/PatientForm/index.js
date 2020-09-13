import React from "react";
import { AddressForm } from "../AddressForm";
import "./styles.css";

export const PatientForm = ({
  patientData,
  addressData,
  handlePatientChange,
  handleAddressChange,
  handleOnSubmit,
}) => (
  <form onSubmit={handleOnSubmit}>
    <label htmlFor="name">Name</label>
    <input
      type="text"
      name="name"
      value={patientData.name}
      onChange={handlePatientChange}
    />
    <label htmlFor="password">Password</label>
    <input
      type="email"
      name="email"
      value={patientData.email}
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
    <AddressForm data={addressData} handleOnchange={handlePatientChange} />
    <button type="submit">Create</button>
  </form>
);
