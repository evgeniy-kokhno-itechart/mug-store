import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getCategories } from '../catalog/categories-redux-state/categoryActions';
import { getCurrencies } from '../catalog/currency-redux-state/currencyActions';
import { getProducts } from '../product/productsActions';

class SharedData extends Component {
  componentDidMount() {
    this.props.getCurrencies();
    this.props.getCategories();
    this.props.getProducts();
  }

  render() {
    return <span />;
  }
}

SharedData.propTypes = {
  getCategories: PropTypes.func.isRequired,
  getCurrencies: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  getCategories,
  getCurrencies,
  getProducts,
};

export default connect(
  null,
  mapDispatchToProps,
)(SharedData);
