import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
// import { getProduct } from '../../product/productsActions';
import CartTable from './cartTable';
import TotalCostCalculator from './totalCostCalculator';

class Cart extends Component {
  // getProductsInCart(cart) {
  //   const cartInfo = cart;
  //   if (!cartInfo) return [];
  //   const products = [];
  //   let prodInCart = [];
  //   let currentProd = {};
  //   for (let i = 0; i < cartInfo.length; i++) {
  //     currentProd = this.props.getProduct(cartInfo[i].id);
  //     if (currentProd) prodInCart = { ...currentProd, qty: cartInfo[i].qty };
  //     else {
  //       prodInCart = {
  //         ...cartInfo[i],
  //         title: 'Sorry. The product is unavailable for order.',
  //         price: 0,
  //       };
  //     }
  //     products.push(prodInCart);
  //   }

  //   return products;
  // }

  renderCartDetails(products) {
    const { currentUser, currentCurrency } = this.props;
    return (
      <React.Fragment>
        <CartTable
          sortColumn="id"
          productsInCart={products}
          onDeleteFromCart={this.handleDeleteFromCart}
          onIncrementClick={this.handleIncrementClick}
          onDecrementClick={this.handleDecrementClick}
          onQuantityChange={this.handleQuantityChange}
        />
        <div className="row justify-content-between mx-2">
          <TotalCostCalculator products={products} currencyName={currentCurrency.name} customClasses="h5" />
          <div>
            <Link className="btn btn-secondary justify-content-end" to={currentUser.name ? '/order/mycart' : '/order'}>
              {/* ${totalCost ? '' : ' disabled'}`}    */}
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
    // const products = this.getProductsInCart(cart);

    return cart.length ? this.renderCartDetails(cart) : this.renderEmptyMessage();
  }
}

Cart.propTypes = {
  currentCurrency: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  cart: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, qty: PropTypes.number })).isRequired,
  currentUser: PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }).isRequired,
  // getProduct: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  cart: state.cart.cart,
  currentCurrency: state.currency.currentCurrency,
  currentUser: state.user.currentUser,
});

// const mapDispatchToProps = {
//   getProduct,
// };

export default connect(
  mapStateToProps,
  // mapDispatchToProps,
)(Cart);
