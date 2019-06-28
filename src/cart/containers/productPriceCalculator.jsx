import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import ProductPrice from '../components/productPrice';

class ProductPriceCalculator extends Component {
  getFinalPrice() {
    const { price, quantity, discount } = this.props;
    return quantity * price * (1 - discount / 100);
  }

  render() {
    const finalPrice = this.getFinalPrice();
    return <ProductPrice finalPrice={finalPrice} />;
  }
}

ProductPriceCalculator.propTypes = {
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  discount: PropTypes.number.isRequired,
};

export default ProductPriceCalculator;
