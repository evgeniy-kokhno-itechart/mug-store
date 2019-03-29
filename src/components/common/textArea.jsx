import React from "react";

const TextArea = props => {
  const { name, label, value, error, onChange } = props;

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <textarea
        name={name}
        id={name}
        onChange={onChange}
        className="form-control"
        value={value}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default TextArea;
