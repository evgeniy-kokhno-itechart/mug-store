import React from 'react';
import { PropTypes } from 'prop-types';

const ProductPrice = ({ finalPrice }) => <span>{finalPrice || 0}</span>;

export default ProductPrice;

ProductPrice.propTypes = {
  finalPrice: PropTypes.number.isRequired,
};
