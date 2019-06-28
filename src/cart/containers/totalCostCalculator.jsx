import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import TotalCost from '../components/totalCost';

class TotalCostCalculator extends Component {
  getTotalCost() {
    const { currencyName, products } = this.props;
    const totalCost = products.reduce(
      (sum, currentItem) => sum + currentItem.price[currencyName] * currentItem.qty * (1 - currentItem.discount / 100),
      0,
    );
    return totalCost;
  }

  render() {
    const total = this.getTotalCost();
    return <TotalCost total={total} customClasses={this.props.customClasses} />;
  }
}

TotalCostCalculator.propTypes = {
  currencyName: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.shape({ name: PropTypes.string }),
      qty: PropTypes.number,
      discount: PropTypes.number,
    }),
  ).isRequired,
  customClasses: PropTypes.string,
};

TotalCostCalculator.defaultProps = {
  customClasses: '',
};

export default TotalCostCalculator;
