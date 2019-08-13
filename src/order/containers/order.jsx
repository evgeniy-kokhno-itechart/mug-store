import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { submitCartOrder } from '../../cart/cartActions';
import OrderTable from './OrderTable';
import TotalCostCalculator from '../../cart/containers/TotalCostCalculator';
import OrderForm from './OrderForm';
import { cartCostsSelector } from '../../cart/cartSelectors';

const Order = ({
  cart: orderList,
  currentUser,
  currentCurrency,
  // eslint-disable-next-line no-shadow
  submitCartOrder,
}) => (
  <React.Fragment>
    <h1 className="text-center m-3">Please check your order</h1>
    <div className="row m-2">
      <div className="col-md-6">
        <OrderTable sortColumn="title" products={orderList} />
        <TotalCostCalculator products={orderList} currencyName={currentCurrency.name} customClasses="float-right" />
      </div>
      <div className="col-md-5 offset-md-1">
        <OrderForm currentUser={currentUser} onOrderSubmit={submitCartOrder} />
      </div>
    </div>
  </React.Fragment>
);

Order.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.string),
    username: PropTypes.string,
  }),
  currentCurrency: PropTypes.shape({ name: PropTypes.string }).isRequired,

  submitCartOrder: PropTypes.func.isRequired,
};

Order.defaultProps = {
  currentUser: {},
};

const mapStateToProps = state => ({
  cart: cartCostsSelector(state),
  currentCurrency: state.currency.currentCurrency,
  currentUser: state.user.currentUser,
});

const mapDipatchToProps = {
  submitCartOrder,
};

export default connect(
  mapStateToProps,
  mapDipatchToProps,
)(Order);
