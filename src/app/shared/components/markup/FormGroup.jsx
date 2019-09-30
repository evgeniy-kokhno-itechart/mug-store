import React from 'react';
import { PropTypes } from 'prop-types';

const FormGroup = ({
  name, label, error, groupClasses, labelClasses, children,
}) => (
  <div className={`form-group ${groupClasses}`}>
    <label htmlFor={name} className={labelClasses}>{label}</label>
    {children}
    {error && <div className="alert alert-danger">{error}</div>}
  </div>
);

FormGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  groupClasses: PropTypes.string,
  labelClasses: PropTypes.string,
  children: PropTypes.shape({
    type: PropTypes.string,
  }).isRequired,
};

FormGroup.defaultProps = {
  error: '',
  groupClasses: '',
  labelClasses: '',
};

export default FormGroup;
