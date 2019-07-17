import React from 'react';
import { PropTypes } from 'prop-types';

const ErrorMessage = ({ message }) => <span className="text-danger">{`The following error occurred: ${message}`}</span>;

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
