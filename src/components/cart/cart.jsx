import React, { Component } from "react";
import { connect } from "react-redux";
import CartTable from "./cartTable";
import { getProduct } from "./../../services/productsService";
import { getCurrentUser } from "../../services/authService";
import { Link } from "react-router-dom";
import { getCurrentCurrency } from "./../../services/payService";
import * as actionTypes from "../store/actions";

class Cart extends Component {
  // state = { products: [], totalCost: 0, user: {} };

  state = { user: {} };

  // constructor() {
  //   super();
  //   const products = this.getProductsInCart();
  // }

  componentDidMount() {
    // const products = this.getProductsInCart();
    // const totalCost = this.getTotalCost(products);
    const user = getCurrentUser();
    this.setState({ user });
  }

  getTotalCost = products => {
    const currentCurrency = getCurrentCurrency();
    const totalCost = products.reduce(
      (sum, currentItem) =>
        sum + currentItem.price[currentCurrency.name] * currentItem.qty,
      0
    );
    return totalCost;
  };

  // handleDeleteFromCart = product => {
  //   let products = this.state.products.filter(item => item._id !== product._id);
  //   let cart = JSON.parse(localStorage.getItem("cart"));
  //   cart.splice(cart.findIndex(p => p._id === product._id), 1);
  //   localStorage.setItem("cart", JSON.stringify(cart));
  //   let totalCost = this.getTotalCost(products);
  //   this.props.onCartChange();
  //   this.setState({ products, totalCost });
  // };

  // changeProductQuantity(productId, newValue, delta) {
  //   const { products } = this.state;

  //   let cart = JSON.parse(localStorage.getItem("cart"));
  //   let prodInCart = cart.find(p => p._id === productId);
  //   let prodInState = products.find(p => p._id === productId);

  //   if (newValue) {
  //     prodInState.qty = newValue;
  //     prodInCart.qty = newValue;
  //   } else {
  //     if (prodInCart.qty > 1 || delta > 0) {
  //       prodInState.qty += delta;
  //       prodInCart.qty += delta;
  //     }
  //   }
  //   localStorage.setItem("cart", JSON.stringify(cart));
  //   const totalCost = this.getTotalCost(products);
  //   this.props.onCartChange();
  //   this.setState({ products, totalCost });
  // }

  // handleIncrementClick = productId => {
  //   this.changeProductQuantity(productId, null, 1);

  //   // let products = this.state.products.filter(item => item._id !== productId);
  //   // this.setState(state => ({ quantity: state.quantity + 1 }));
  // };

  // handleDecrementClick = productId => {
  //   this.changeProductQuantity(productId, null, -1);
  //   // const { products } = this.state;

  //   // let cart = JSON.parse(localStorage.getItem("cart"));
  //   // let prodInCart = cart.find(p => p._id === productId);
  //   // prodInCart.qty > 1 ? prodInCart.qty-- : (prodInCart.qty = 1);
  //   // localStorage.setItem("cart", JSON.stringify(cart));

  //   // let prodInStateClone = { ...products.find(p => p._id === productId) };
  //   // const index = products.findIndex(p => p._id === productId);
  //   // prodInStateClone.qty > 1
  //   //   ? prodInStateClone.qty--
  //   //   : (prodInStateClone.qty = 1);
  //   // products[index] = prodInStateClone;
  //   // const totalCost = this.getTotalCost(products);
  //   // this.setState({ products, totalCost });

  //   // this.setState(state =>
  //   //   state.quantity > 1 ? { quantity: state.quantity - 1 } : { quantity: 1 }
  //   // );
  // };

  // handleQuantityChange = (value, productId) => {
  //   let quantity = parseInt(value);
  //   if (isNaN(quantity) || quantity < 1) return;
  //   else {
  //     this.changeProductQuantity(productId, quantity, null);
  //     this.props.onCartChange();
  //   }
  // };

  getProductsInCart(cart) {
    let cartInfo = cart;
    // let cartInfo;
    if (!cartInfo) return [];
    // if (localStorage.getItem("cart"))
    //   cartInfo = JSON.parse(localStorage.getItem("cart"));
    // else return [];
    let products = [];
    let prodInCart = [];
    for (var i = 0; i < cartInfo.length; i++) {
      prodInCart = { ...getProduct(cartInfo[i]._id), qty: cartInfo[i].qty };
      products.push(prodInCart);
    }
    return products;
  }

  render() {
    const { sortColumn, cart } = this.props;
    const { user } = this.state;

    const products = this.getProductsInCart(cart);
    const totalCost = this.getTotalCost(products);

    return totalCost ? (
      <React.Fragment>
        <CartTable
          sortColumn={sortColumn}
          productsInCart={products}
          onDeleteFromCart={this.handleDeleteFromCart}
          onIncrementClick={this.handleIncrementClick}
          onDecrementClick={this.handleDecrementClick}
          onQuantityChange={this.handleQuantityChange}
        />

        <div className="row justify-content-between">
          <h3 className="col-4">
            {totalCost ? `Total cost: ${totalCost}` : ""}
          </h3>
          <div>
            <Link
              className="btn btn-secondary m-2 justify-content-end"
              to={user ? "/order/mycart" : "/order"}
            >
              Order Now!
            </Link>
          </div>
        </div>
      </React.Fragment>
    ) : (
      <h2 className="mt-2">Your cart is empty</h2>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onBuyNow: (product, quantity) =>
      dispatch({ type: actionTypes.ADD_TO_CART, cart: { product, quantity } })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
