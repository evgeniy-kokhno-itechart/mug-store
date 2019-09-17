import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import CartTableConnected from './CartTable';
import TotalCost from '../components/TotalCost';
import { cartCostsSelector } from '../CartSelectors';

export class Cart extends Component {
  renderCartDetails(products) {
    const { currentUserName, cart } = this.props;
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
          <TotalCost total={cart.totalCost} customClasses="h5" />
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

    return cart.products.length ? this.renderCartDetails(cart.products) : this.renderEmptyMessage();
  }
}

Cart.propTypes = {
  cart: PropTypes.shape({
    products: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        imageURL: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        currentCurrencyPrice: PropTypes.number,
        quantity: PropTypes.number,
      }),
    ),
    totalCost: PropTypes.number,
  }).isRequired,

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
