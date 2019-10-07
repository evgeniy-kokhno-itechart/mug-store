import React from 'react';
import { PropTypes } from 'prop-types';
import FormGroup from '../markup/FormGroup';
import ControlBase from './ControlBase';

class Input extends ControlBase {
  render() {
    const {
      name, label, error, type, value,
    } = this.props;
    return (
      <FormGroup name={name} label={label} error={error}>
        <input type={type} value={value} key={name} name={name} id={name} onChange={this.handleChange} className="form-control" />
      </FormGroup>
    );
  }
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Input.defaultProps = {
  type: 'text',
  error: '',
  value: '',
};

export default Input;
