import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import CartTableConnected from '../components/CartTable';
import TotalCost from '../components/TotalCost';
import { cartCostsSelector } from '../CartSelectors';
import {
  incrementQuantity, decrementQuantity, changeQuantity, deleteProductFromCart,
} from '../CartActions';

export class Cart extends Component {
  renderCartDetails(products) {
    const {
      // eslint-disable-next-line no-shadow
      currentUserName, cart, isCurrencyLoading, incrementQuantity, decrementQuantity, changeQuantity, deleteProductFromCart,
    } = this.props;
    return (
      <React.Fragment>
        <CartTableConnected
          sortColumn="id"
          productsInCart={products}
          isCurrencyLoading={isCurrencyLoading}
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
          changeQuantity={changeQuantity}
          deleteProductFromCart={deleteProductFromCart}
        />
        <div className="row justify-content-between mx-2">
          <TotalCost total={cart.totalCost} customClasses="h5 my-auto" />
          <Link className="btn btn-secondary justify-content-end" to={currentUserName ? '/order/mycart' : '/order'}>
            Order Now!
          </Link>
        </div>
      </React.Fragment>
    );
  }

  renderEmptyMessage() {
    return <h1 className="m-3 text-center">Your cart is empty</h1>;
  }

  render() {
    const { cart } = this.props;

    return cart.products.length
      ? this.renderCartDetails(cart.products)
      : this.renderEmptyMessage();
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

  isCurrencyLoading: PropTypes.bool,

  currentUserName: PropTypes.string,

  incrementQuantity: PropTypes.func.isRequired,
  decrementQuantity: PropTypes.func.isRequired,
  changeQuantity: PropTypes.func.isRequired,
  deleteProductFromCart: PropTypes.func.isRequired,
};

Cart.defaultProps = {
  isCurrencyLoading: true,
  currentUserName: '',
};

const mapStateToProps = state => ({
  cart: cartCostsSelector(state),
  currentUserName: state.user.currentUser.name,
  isCurrencyLoading: state.currency.currenciesStatus.isInProcess,
});

const mapDispatchToProps = {
  incrementQuantity,
  decrementQuantity,
  changeQuantity,
  deleteProductFromCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
