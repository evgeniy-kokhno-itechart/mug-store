import React from 'react';
import { PropTypes } from 'prop-types';

const ErrorMessage = ({ message, customClasses }) => (
  <span className={`text-danger ${customClasses}`}>
    {message}
  </span>
);

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  customClasses: PropTypes.string,
};

ErrorMessage.defaultProps = {
  customClasses: '',
};

export default ErrorMessage;
