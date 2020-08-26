import React from "react";

function InputField({ label }) {
  return (
    <>
      <label htmlFor="email">{label}</label>
      <input name="email" type="email" />
    </>
  );
}

export default InputField;
