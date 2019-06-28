import React from 'react';
import { PropTypes } from 'prop-types';

const TotalCost = ({ total, customClasses }) => <p className={customClasses}>{total ? `Total cost: ${total}` : ''}</p>;

TotalCost.propTypes = {
  total: PropTypes.number.isRequired,
  customClasses: PropTypes.string,
};

TotalCost.defaultProps = {
  customClasses: '',
};

export default TotalCost;
