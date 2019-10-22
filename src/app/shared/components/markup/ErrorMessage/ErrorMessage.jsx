import React from 'react';
import { PropTypes } from 'prop-types';
import './ErrorMessage.scss';

const ErrorMessage = ({ message, customClasses }) => (
  <p className={`error-message ${customClasses}`}>
    {message}
  </p>
);

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  customClasses: PropTypes.string,
};

ErrorMessage.defaultProps = {
  customClasses: '',
};

export default ErrorMessage;
