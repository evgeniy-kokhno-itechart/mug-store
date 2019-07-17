import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import ProductPrice from '../components/productPrice';
import Spinner from '../../shared/markup-usage/spinner';

class ProductPriceCalculator extends Component {
  renderFinalPrice() {
    const { price, quantity, discount } = this.props;
    const finalPrice = quantity * price * (1 - discount / 100);
    return <ProductPrice finalPrice={finalPrice} />;
  }

  renderSpinner() {
    return <Spinner sizeInRems="1" />;
  }

  render() {
    return this.props.isCurrencyLoading ? this.renderSpinner() : this.renderFinalPrice();
  }
}

ProductPriceCalculator.propTypes = {
  isCurrencyLoading: PropTypes.bool.isRequired,
  price: PropTypes.number,
  quantity: PropTypes.number.isRequired,
  discount: PropTypes.number.isRequired,
};

ProductPriceCalculator.defaultProps = {
  price: 0,
};

export default ProductPriceCalculator;
