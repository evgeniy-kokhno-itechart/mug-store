import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import TotalCost from '../components/totalCost';

class TotalCostCalculator extends Component {
  getTotalCost() {
    const { products } = this.props;
    const totalCost = products.reduce(
      (sum, currentItem) => sum + currentItem.quantity * currentItem.currentCurrencyPrice * (1 - currentItem.discount / 100),
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

const mapStateToProps = state => ({
  currencyRates: state.currency.currencyRates,
  currentCurrencyName: state.currency.currentCurrency.name,
});

export default connect(mapStateToProps)(TotalCostCalculator);
