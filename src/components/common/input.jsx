import React from 'react';
import { PropTypes } from 'prop-types';

const Input = ({
  name, label, error, ...rest
}) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <input {...rest} name={name} id={name} className="form-control" />
    {error && <div className="alert alert-danger">{error}</div>}
  </div>
);

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
};

Input.defaultProps = {
  error: '',
};

export default Input;
