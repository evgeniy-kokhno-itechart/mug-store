import React from 'react';
import { PropTypes } from 'prop-types';
import FormGroup from '../../markup/FormGroup/FormGroup';
import ControlBase from '../ControlBase';
import './TextArea.scss';

class TextArea extends ControlBase {
  render() {
    const {
      name, label, value, error,
    } = this.props;

    return (
      <FormGroup name={name} label={label} error={error}>
        <textarea name={name} id={name} onChange={this.handleChange} className="formgroup__text-area focusable" value={value} />
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
