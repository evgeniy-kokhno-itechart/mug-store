import React from 'react';
import { PropTypes } from 'prop-types';

const Spinner = ({ spinnerClasses, wrapperClasses }) => (
  <div className={`text-center ${wrapperClasses}`}>
    <div className={`spinner-border ${spinnerClasses}`} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

Spinner.propTypes = {
  spinnerClasses: PropTypes.string,
  wrapperClasses: PropTypes.string,
};

Spinner.defaultProps = {
  spinnerClasses: '',
  wrapperClasses: '',
};

export default Spinner;
