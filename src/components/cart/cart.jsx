import React, { Component } from "react";
import { connect } from "react-redux";
import CartTable from "./cartTable";
import { getProduct } from "./../../services/productsService";
import { Link } from "react-router-dom";

class Cart extends Component {
  getTotalCost = products => {
    const currentCurrency = this.props.currentCurrency;
    const totalCost = products.reduce(
      (sum, currentItem) =>
        sum + currentItem.price[currentCurrency.name] * currentItem.qty,
      0
    );
    return totalCost;
  };

  getProductsInCart(cart) {
    let cartInfo = cart;
    if (!cartInfo) return [];
    let products = [];
    let prodInCart = [];
    let currentProd = {};
    for (var i = 0; i < cartInfo.length; i++) {
      currentProd = getProduct(cartInfo[i]._id);
      if (currentProd) prodInCart = { ...currentProd, qty: cartInfo[i].qty };
      else
        prodInCart = {
          ...cartInfo[i],
          title: "Sorry. The product is unavailable for order.",
          price: 0
        };
      products.push(prodInCart);
    }

    return products;
  }

  render() {
    const { sortColumn, cart, currentUser } = this.props;

    const products = this.getProductsInCart(cart);
    const totalCost = this.getTotalCost(products);

    return products.length ? (
      <React.Fragment>
        <CartTable
          sortColumn={sortColumn}
          productsInCart={products}
          onDeleteFromCart={this.handleDeleteFromCart}
          onIncrementClick={this.handleIncrementClick}
          onDecrementClick={this.handleDecrementClick}
          onQuantityChange={this.handleQuantityChange}
        />

        <div className="row justify-content-between mx-2">
          <h5>{totalCost ? `Total cost: ${totalCost}` : ""}</h5>
          <div>
            <Link
              className={
                "btn btn-secondary justify-content-end" +
                (totalCost ? "" : "disabled")
              }
              to={currentUser.name ? "/order/mycart" : "/order"}
            >
              Order Now!
            </Link>
          </div>
        </div>
      </React.Fragment>
    ) : (
      <h2 className="m-3 text-center">Your cart is empty</h2>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cartState.cart,
    currentCurrency: state.currencyState.currentCurrency,
    currentUser: state.userState.currentUser
  };
};

export default connect(mapStateToProps)(Cart);
