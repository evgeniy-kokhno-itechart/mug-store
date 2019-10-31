import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import CartTable from '../../components/CartTable/CartTable';
import TotalCost from '../../components/TotalCost';
import { cartCostsSelector } from '../../CartSelectors';
import { cartActions } from '../../CartActions';
import './Cart.scss';

export class Cart extends Component {
  renderCartDetails(products) {
    const {
      currentUserName, cart, isCurrencyLoading, changeQuantity, deleteProductFromCart,
    } = this.props;
    return (
      <React.Fragment>
        <CartTable
          sortColumn="id"
          productsInCart={products}
          isCurrencyLoading={isCurrencyLoading}
          changeQuantity={changeQuantity}
          deleteProductFromCart={deleteProductFromCart}
        />
        <div className="cart-footer">
          <TotalCost total={cart.totalCost} customClasses="cart-footer__total" />
          <Link className="button button--solid cart-footer__order-button" to={currentUserName ? '/order/mycart' : '/order'}>
            Order Now!
          </Link>
        </div>
      </React.Fragment>
    );
  }

  renderEmptyMessage() {
    return <h1 className="cart__empty-message">Your cart is empty</h1>;
  }

  render() {
    const { cart } = this.props;

    return (
      <div className="cart">
        {cart.products.length
          ? this.renderCartDetails(cart.products)
          : this.renderEmptyMessage()}
      </div>
    );
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
        currentCurrencyCost: PropTypes.number,
        quantity: PropTypes.number,
      }),
    ),
    totalCost: PropTypes.number,
  }).isRequired,

  isCurrencyLoading: PropTypes.bool,

  currentUserName: PropTypes.string,

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
  changeQuantity: cartActions.ChangeQuantity,
  deleteProductFromCart: cartActions.DeleteFromCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
