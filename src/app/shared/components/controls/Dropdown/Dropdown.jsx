import React from 'react';
import { PropTypes } from 'prop-types';
import FormGroup from '../../markup/FormGroup/FormGroup';
import ControlBase from '../ControlBase';
import './Dropdown.scss';

class Dropdown extends ControlBase {
  render() {
    const {
      name, label, error, value, options, defaultText, labelClasses, selectClasses, wrapperClasses,
    } = this.props;
    return (
      <FormGroup
        name={name}
        label={label}
        error={error}
        groupClasses={`dropdown ${wrapperClasses}`}
        labelClasses={`dropdown__label ${labelClasses}`}
      >
        <select
          name={name}
          id={name}
          value={value}
          onChange={this.handleChange}
          className={`dropdown__selector focusable ${selectClasses}`}
        >
          {defaultText && <option>{defaultText}</option>}
          {options.map(o => (
            <option key={o.id} value={o.id}>
              {o.name}
            </option>
          ))}
        </select>
      </FormGroup>
    );
  }
}

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
