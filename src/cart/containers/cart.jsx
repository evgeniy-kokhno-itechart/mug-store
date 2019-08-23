import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import CartTableConnected from './CartTable';
import TotalCostCalculator from './TotalCostCalculator';
import { cartCostsSelector } from '../cartSelectors';

export class Cart extends Component {
  renderCartDetails(products) {
    const { currentUserName } = this.props;
    return (
      <React.Fragment>
        <CartTableConnected
          sortColumn="id"
          productsInCart={products}
          onDeleteFromCart={this.handleDeleteFromCart}
          onIncrementClick={this.handleIncrementClick}
          onDecrementClick={this.handleDecrementClick}
          onQuantityChange={this.handleQuantityChange}
        />
        <div className="row justify-content-between mx-2">
          <TotalCostCalculator products={products} customClasses="h5" />
          <div>
            <Link className="btn btn-secondary justify-content-end" to={currentUserName ? '/order/mycart' : '/order'}>
              Order Now!
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }

  renderEmptyMessage() {
    return <h1 className="m-3 text-center">Your cart is empty</h1>;
  }

  render() {
    const { cart } = this.props;

    return cart.length ? this.renderCartDetails(cart) : this.renderEmptyMessage();
  }
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      imageURL: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      currentCurrencyPrice: PropTypes.number,
      quantity: PropTypes.number,
    }),
  ).isRequired,

  currentUserName: PropTypes.string,
};

Cart.defaultProps = {
  currentUserName: '',
};

const mapStateToProps = state => ({
  cart: cartCostsSelector(state),
  currentUserName: state.user.currentUser.name,
});

export default connect(mapStateToProps)(Cart);
