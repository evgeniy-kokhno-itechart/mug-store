import React from "react";

const Dropdown = ({
  name,
  label,
  error,
  options,
  value,
  isOnelineElement,
  defaultText,
  onChange
}) => {
  return (
    <div className={isOnelineElement ? "form-group form-inline" : "form-group"}>
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="form-control ml-2"
      >
        {defaultText && <option value="">{defaultText}</option>}
        {options.map(o => (
          <option key={o._id} value={o._id}>
            {o.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Dropdown;
