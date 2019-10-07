import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import OrderTable from '../components/OrderTable';
import OrderForm from '../components/OrderForm';
import { TotalCost, cartActions, cartCostsSelector } from '../../cart';

export class Order extends Component {
  submitOrder = () => {
    this.props.submitCartOrder('/orderconfirm');
  }

  render() {
    const { cart, currentUser, isCurrencyLoading } = this.props;
    return (
      <React.Fragment>
        <h1 className="text-center m-3">Please check your order</h1>
        <div className="row m-2">
          <div className="col-md-6">
            <OrderTable sortColumn="title" products={cart.products} isCurrencyLoading={isCurrencyLoading} />
            <TotalCost total={cart.totalCost} customClasses="float-right" />
          </div>
          <div className="col-md-5 offset-md-1">
            <OrderForm currentUser={currentUser} onSubmit={this.submitOrder} />
          </div>
        </div>
      </React.Fragment>
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
