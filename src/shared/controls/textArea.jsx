import React from 'react';
import { PropTypes } from 'prop-types';

const TextArea = (props) => {
  const {
    name, label, value, error, onChange,
  } = props;

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <textarea name={name} id={name} onChange={onChange} className="form-control" value={value} />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

TextArea.defaultProps = {
  value: '',
  error: '',
};

export default TextArea;
