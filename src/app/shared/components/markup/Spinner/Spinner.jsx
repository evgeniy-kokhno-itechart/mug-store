import React from 'react';
import { PropTypes } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Spinner.scss';

const Spinner = ({ spinnerClasses, wrapperClasses }) => (
  <div className={`spinner ${wrapperClasses}`}>
    <FontAwesomeIcon icon="sync-alt" className={`spinner__icon ${spinnerClasses}`} role="status" />
    <span className="screenreaders-only">Loading...</span>
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
