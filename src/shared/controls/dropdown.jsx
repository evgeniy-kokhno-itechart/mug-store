import React from 'react';
import { PropTypes } from 'prop-types';

const Dropdown = ({
  name, label, error, value, options, isOnelineElement, defaultText, onChange, customClasses,
}) => (
  <div className={`form-group flex-nowrap ${isOnelineElement ? 'form-inline' : ''} ${customClasses || ''}`}>
    <label className="mr-2 text-nowrap" htmlFor={name}>
      {label}
    </label>

    <select name={name} id={name} value={value} onChange={e => onChange(e)} className="form-control">
      {defaultText && <option value="-1">{defaultText}</option>}
      {options.map(o => (
        <option key={o.id} value={o.id}>
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
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, name: PropTypes.string })).isRequired,
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
