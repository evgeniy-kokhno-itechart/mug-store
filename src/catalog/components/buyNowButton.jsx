import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropTypes } from 'prop-types';

const BuyNowButton = ({ customClasses, product, onBuyNow }) => (
  <button type="button" className={`btn btn-secondary ${customClasses}`} onClick={() => onBuyNow(product, 1)}>
    <FontAwesomeIcon icon="cart-arrow-down" />
  </button>
);

BuyNowButton.propTypes = {
  customClasses: PropTypes.string,
  product: PropTypes.shape({
    id: PropTypes.string,
    imageURL: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }),
    price: PropTypes.object,
    discount: PropTypes.number,
    producer: PropTypes.string,
  }).isRequired,
  onBuyNow: PropTypes.func.isRequired,
};

BuyNowButton.defaultProps = {
  customClasses: '',
};

export default BuyNowButton;
