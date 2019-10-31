import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropTypes } from 'prop-types';
import './BuyNowButton.scss';

class BuyNowButton extends Component {
  handleButtonClick = () => {
    const { product, onBuyNow } = this.props;
    onBuyNow(product);
  };

  render() {
    const { customClasses } = this.props;
    return (
      <button type="button" className={`button button--solid buy-now-button focusable ${customClasses}`} onClick={this.handleButtonClick}>
        <FontAwesomeIcon icon="cart-arrow-down" />
      </button>
    );
  }
}

BuyNowButton.propTypes = {
  customClasses: PropTypes.string,
  product: PropTypes.shape({
    id: PropTypes.string,
    imageURL: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }),
    basePrice: PropTypes.number,
    currentCurrencyPrice: PropTypes.number,
    discount: PropTypes.number,
    producer: PropTypes.string,
  }).isRequired,
  onBuyNow: PropTypes.func.isRequired,
};

BuyNowButton.defaultProps = {
  customClasses: '',
};

export default BuyNowButton;
