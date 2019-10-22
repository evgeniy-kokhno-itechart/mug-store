import React from 'react';
import { PropTypes } from 'prop-types';
import './FormGroup.scss';

const FormGroup = ({
  name, label, error, groupClasses, labelClasses, children,
}) => (
  <div className={`formgroup ${groupClasses}`}>
    <label htmlFor={name} className={`formgroup__label ${labelClasses}`}>{label}</label>
    {children}
    {error && <div className="formgroup__error">{error}</div>}
  </div>
);

FormGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  groupClasses: PropTypes.string,
  labelClasses: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

FormGroup.defaultProps = {
  error: '',
  groupClasses: '',
  labelClasses: '',
};

export default FormGroup;
