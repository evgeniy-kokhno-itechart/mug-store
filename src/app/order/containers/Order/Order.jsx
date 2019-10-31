import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import OrderTable from '../../components/OrderTable/OrderTable';
import OrderForm from '../../components/OrderForm/OrderForm';
import { TotalCost, cartActions, cartCostsSelector } from '../../../cart';
import { orderConfirmedAddress } from '../../../shared';
import './Order.scss';

export class Order extends Component {
  submitOrder = () => {
    this.props.submitCartOrder(orderConfirmedAddress);
  }

  render() {
    const { cart, currentUser, isCurrencyLoading } = this.props;
    return (
      <div className="order">
        <h1 className="order__header">Please check your order</h1>
        <div className="order__content">
          <div className="order__summary">
            <OrderTable sortColumn="title" products={cart.products} isCurrencyLoading={isCurrencyLoading} />
            <TotalCost total={cart.totalCost} customClasses="order-total-cost" />
          </div>
          <div className="order-form">
            <OrderForm currentUser={currentUser} onSubmit={this.submitOrder} />
          </div>
        </div>
      </div>
    );
  }
}

Order.propTypes = {
  cart: PropTypes.shape({
    products: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        quantity: PropTypes.number,
        price: PropTypes.object,
        title: PropTypes.string,
      }),
    ),
    totalCost: PropTypes.number,
  }).isRequired,
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

  isCurrencyLoading: PropTypes.bool,

  submitCartOrder: PropTypes.func.isRequired,
};

Order.defaultProps = {
  currentUser: {},
  isCurrencyLoading: true,
};

const mapStateToProps = state => ({
  cart: cartCostsSelector(state),
  currentUser: state.user.currentUser,
  isCurrencyLoading: state.currency.currenciesStatus.isInProcess,
});

const mapDipatchToProps = {
  submitCartOrder: cartActions.SubmitCartOrder.InitiateApiCall,
};

export default connect(
  mapStateToProps,
  mapDipatchToProps,
)(Order);
