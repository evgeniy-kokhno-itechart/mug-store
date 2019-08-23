import React from 'react';
import { PropTypes } from 'prop-types';

const Input = ({
  name, label, error, matchedInputName, onValueChange, ...rest
}) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>

    <input {...rest} key={name} name={name} id={name} onChange={e => onValueChange(e, matchedInputName)} className="form-control" />

    {error && <div className="alert alert-danger">{error}</div>}
  </div>
);

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  matchedInputName: PropTypes.string,
  onValueChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  matchedInputName: '',
  error: '',
};

export default Input;
