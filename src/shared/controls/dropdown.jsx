import React from 'react';
import { PropTypes } from 'prop-types';

const Dropdown = ({
  name, label, error, options, isOnelineElement, defaultText, onChange, customClasses,
}) => (
  <div className={`form-group flex-nowrap ${isOnelineElement ? 'form-inline' : ''} ${customClasses || ''}`}>
    <label className="mr-2 text-nowrap" htmlFor={name}>
      {label}
    </label>
    <select name={name} id={name} onChange={onChange} className="form-control">
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

Dropdown.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({ _id: PropTypes.string, name: PropTypes.string })).isRequired,
  isOnelineElement: PropTypes.bool,
  defaultText: PropTypes.string,
  customClasses: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Dropdown.defaultProps = {
  error: '',
  isOnelineElement: false,
  defaultText: '',
  customClasses: '',
};

export default Dropdown;
