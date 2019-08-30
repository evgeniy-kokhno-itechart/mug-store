import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class Input extends Component {
  handleValueChange = (e) => {
    const { onValueChange, matchedInputName } = this.props;
    onValueChange(e, matchedInputName);
  };

  render() {
    const {
      name, label, error, matchedInputName, onValueChange, ...rest
    } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>

        <input {...rest} key={name} name={name} id={name} onChange={this.handleValueChange} className="form-control" />

        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  matchedInputName: PropTypes.string,
  onValueChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  matchedInputName: '',
  error: '',
};

export default Input;
