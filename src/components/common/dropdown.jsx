import React from "react";

const Dropdown = ({
  name,
  label,
  error,
  options,
  value,
  isOnelineElement,
  defaultText,
  onChange,
  customClasses
}) => {
  return (
    <div
      className={
        "form-group flex-nowrap" +
        (isOnelineElement ? " form-inline" : "") +
        (customClasses ? ` ${customClasses}` : "")
      }
    >
      <label className="mr-2 text-nowrap" htmlFor={name}>
        {label}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="form-control"
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
