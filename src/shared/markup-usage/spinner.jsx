import React from 'react';
import { PropTypes } from 'prop-types';

const Spinner = ({ sizeInRems }) => (
  <div className="text-center mt-5">
    <div className="spinner-border" style={{ width: `${sizeInRems}rem`, height: `${sizeInRems}rem` }} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

Spinner.propTypes = {
  sizeInRems: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Spinner.defaultProps = {
  sizeInRems: 3,
};

export default Spinner;
