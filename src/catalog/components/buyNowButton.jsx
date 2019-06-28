import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropTypes } from 'prop-types';

const BuyNowButton = ({ customClasses, productId, onBuyNow }) => (
  <button type="button" className={`btn btn-secondary ${customClasses}`} onClick={() => onBuyNow(productId, 1)}>
    <FontAwesomeIcon icon="cart-arrow-down" />
  </button>
);

BuyNowButton.propTypes = {
  customClasses: PropTypes.string,
  productId: PropTypes.string.isRequired,
  onBuyNow: PropTypes.func.isRequired,
};

BuyNowButton.defaultProps = {
  customClasses: '',
};

export default BuyNowButton;
