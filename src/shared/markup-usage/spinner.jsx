import React from 'react';
import { PropTypes } from 'prop-types';

const Spinner = ({ customSizeClassName, marginBootstrapClassName }) => (
  <div className={`text-center ${marginBootstrapClassName}`}>
    <div className={`spinner-border ${customSizeClassName}`} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

Spinner.propTypes = {
  customSizeClassName: PropTypes.string,
  marginBootstrapClassName: PropTypes.string,
};

Spinner.defaultProps = {
  customSizeClassName: '',
  marginBootstrapClassName: '',
};

export default Spinner;
