import React from "react";
import "./styles.css";

export const AddressForm = ({ data, handleOnchange }) => (
  <>
    <label htmlFor="street">Street</label>
    <input
      type="text"
      name="street"
      value={data.street}
      onChange={handleOnchange}
    />
    <label htmlFor="additional_adress">Additional address</label>
    <input
      type="text"
      name="additional_adress"
      value={data.additional_adress}
      onChange={handleOnchange}
    />
    <label htmlFor="number">Number</label>
    <input
      type="number"
      name="number"
      value={data.birth_date}
      onChange={handleOnchange}
    />
    <label htmlFor="zip_code">Zip code</label>
    <input
      type="number"
      name="zip_code"
      value={data.zip_code}
      onChange={handleOnchange}
    />
    <label htmlFor="city">City</label>
    <input
      type="text"
      name="city"
      value={data.city}
      onChange={handleOnchange}
    />
    <label htmlFor="state">State</label>
    <input
      type="text"
      name="state"
      value={data.state}
      onChange={handleOnchange}
    />
  </>
);
