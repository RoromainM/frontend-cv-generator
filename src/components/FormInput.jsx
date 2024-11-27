// src/components/FormInput.js
import React from "react";

const FormInput = ({ label, type, name, value, onChange, placeholder }) => {
  return (
    <div style={{ marginBottom: "15px" }}>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          display: "block",
          width: "100%",
          padding: "10px",
          marginTop: "5px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
        required
      />
    </div>
  );
};

export default FormInput;
