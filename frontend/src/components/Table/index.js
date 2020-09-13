import React from "react";
import "./styles.css";

export const Table = ({ patients }) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Birth date</th>
        <th>Phone</th>
        <th>Street</th>
        <th>Additional address</th>
        <th>Number</th>
        <th>Zip code</th>
        <th>City</th>
        <th>State</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {patients.map((patient) => (
        <tr key={patient.id}>
          <td>{patient.name}</td>
          <td>{patient.email}</td>
          <td>{new Date(patient.birth_date).toDateString()}</td>
          <td>{patient.phone}</td>
          <td>{patient.address.street}</td>
          <td>{patient.address.additional_adress}</td>
          <td>{patient.address.number}</td>
          <td>{patient.address.zip_code}</td>
          <td>{patient.address.city}</td>
          <td>{patient.address.state}</td>
          <td>
            <button>Edit</button>
            <button>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
