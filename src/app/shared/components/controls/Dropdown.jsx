import React from 'react';
import { PropTypes } from 'prop-types';

const Dropdown = ({
  name, label, error, value, options, defaultText, labelClasses, selectClasses, wrapperClasses, onChange,
}) => (
  <div className={`form-group flex-nowrap ${wrapperClasses}`}>
    <label className={`mr-2 text-nowrap ${labelClasses}`} htmlFor={name}>
      {label}
    </label>

    <select name={name} id={name} value={value} onChange={onChange} className={selectClasses}>
      {defaultText && <option>{defaultText}</option>}
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
  value: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, name: PropTypes.string })).isRequired,
  defaultText: PropTypes.string,
  labelClasses: PropTypes.string,
  selectClasses: PropTypes.string,
  wrapperClasses: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Dropdown.defaultProps = {
  error: '',
  defaultText: '',
  labelClasses: '',
  selectClasses: '',
  wrapperClasses: '',
  value: '',
};

export default Dropdown;
