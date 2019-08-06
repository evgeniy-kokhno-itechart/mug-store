import React from 'react';
import { PropTypes } from 'prop-types';
import Spinner from '../../shared/markup-usage/spinner';

const ProductPrice = ({ price, isCurrencyLoading }) => (isCurrencyLoading ? <Spinner sizeInRems={1} /> : <span>{price || 0}</span>);

export default ProductPrice;

ProductPrice.propTypes = {
  price: PropTypes.number.isRequired,
  isCurrencyLoading: PropTypes.bool.isRequired,
};
