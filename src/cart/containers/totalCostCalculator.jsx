import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import TotalCost from '../components/totalCost';

class TotalCostCalculator extends Component {
  getTotalCost() {
    const { products } = this.props;
    const totalCost = products.reduce((sum, currentItem) => (sum * 1000 + currentItem.currentCurrencyCost * 1000) / 1000, 0);
    return totalCost;
  }

  render() {
    const total = this.getTotalCost();
    return <TotalCost total={total} customClasses={this.props.customClasses} />;
  }
}

TotalCostCalculator.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      currentCurrencyPrice: PropTypes.number,
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
