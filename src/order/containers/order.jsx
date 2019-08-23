import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { submitCartOrder } from '../../cart/cartActions';
import OrderTableConnected from './OrderTable';
import TotalCostCalculator from '../../cart/containers/TotalCostCalculator';
import OrderForm from './OrderForm';
import { cartCostsSelector } from '../../cart/cartSelectors';

export const Order = ({
  cart: orderList,
  // eslint-disable-next-line no-shadow
  submitCartOrder,
}) => (
  <React.Fragment>
    <h1 className="text-center m-3">Please check your order</h1>
    <div className="row m-2">
      <div className="col-md-6">
        <OrderTableConnected sortColumn="title" products={orderList} />
        <TotalCostCalculator products={orderList} customClasses="float-right" />
      </div>
      <div className="col-md-5 offset-md-1">
        <OrderForm onOrderSubmit={submitCartOrder} />
      </div>
    </div>
  </React.Fragment>
);

Order.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,

  submitCartOrder: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  cart: cartCostsSelector(state),
});

const mapDipatchToProps = {
  submitCartOrder,
};

export default connect(
  mapStateToProps,
  mapDipatchToProps,
)(Order);
