import React from 'react';
import { PropTypes } from 'prop-types';

const TotalCost = ({ total, customClasses }) => (
  <span className={customClasses}>{total ? `Total cost: ${total}` : ''}</span>
);

TotalCost.propTypes = {
  total: PropTypes.number.isRequired,
  customClasses: PropTypes.string,
};

TotalCost.defaultProps = {
  customClasses: '',
};

export default TotalCost;
