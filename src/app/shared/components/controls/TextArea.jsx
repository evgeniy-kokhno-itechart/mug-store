import React from 'react';
import { PropTypes } from 'prop-types';
import FormGroup from '../markup/FormGroup';
import ControlBase from './ControlBase';

class TextArea extends ControlBase {
  render() {
    const {
      name, label, value, error,
    } = this.props;

    return (
      <FormGroup name={name} label={label} error={error}>
        <textarea name={name} id={name} onChange={this.handleChange} className="form-control" value={value} />
      </FormGroup>
    );
  }
}

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
};

TextArea.defaultProps = {
  value: '',
  error: '',
};

export default TextArea;
