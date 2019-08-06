import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import OrderTable from './orderTable';
import TotalCostCalculator from '../../cart/containers/totalCostCalculator';
import OrderForm from './orderForm';

const Order = ({
  cart: orderList, currentUser, currentCurrency, history,
}) => (
  <React.Fragment>
    <h1 className="text-center m-3">Please check your order</h1>
    <div className="row m-2">
      <div className="col-md-6">
        <OrderTable sortColumn="title" products={orderList} />
        <TotalCostCalculator products={orderList} currencyName={currentCurrency.name} customClasses="float-right" />
      </div>
      <div className="col-md-5 offset-md-1">
        <OrderForm currentUser={currentUser} routeReplace={history.replace} />
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
  history: PropTypes.shape({ replace: PropTypes.func }).isRequired,
};

Order.defaultProps = {
  currentUser: {},
};

const mapStateToProps = state => ({
  cart: state.cart.cart,
  currentCurrency: state.currency.currentCurrency,
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Order);
