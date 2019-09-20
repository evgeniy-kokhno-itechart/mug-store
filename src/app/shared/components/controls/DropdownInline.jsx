import React from 'react';
import { PropTypes } from 'prop-types';
import Dropdown from './Dropdown';

const DropdownInline = ({
  name, label, error, value, options, defaultText, labelClasses, selectClasses, wrapperClasses, onChange,
}) => (
  <Dropdown
    name={name}
    label={label}
    error={error}
    value={value}
    options={options}
    defaultText={defaultText}
    labelClasses={labelClasses}
    selectClasses={selectClasses}
    wrapperClasses={`form-inline ${wrapperClasses}`}
    onChange={onChange}
  />
);

DropdownInline.propTypes = {
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

DropdownInline.defaultProps = {
  error: '',
  defaultText: '',
  labelClasses: '',
  selectClasses: '',
  wrapperClasses: '',
  value: '',
};

export default DropdownInline;
