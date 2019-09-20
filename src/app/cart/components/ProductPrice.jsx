import React from 'react';
import { PropTypes } from 'prop-types';
import { Spinner } from '../../shared';

const ProductPrice = ({ price, isCurrencyLoading }) => (isCurrencyLoading
  ? <Spinner spinnerClasses="spinner--small" />
  : <span>{price || 'ERROR!'}</span>);

export default ProductPrice;

ProductPrice.propTypes = {
  price: PropTypes.number.isRequired,
  isCurrencyLoading: PropTypes.bool,
};

ProductPrice.defaultProps = {
  isCurrencyLoading: false,
};
