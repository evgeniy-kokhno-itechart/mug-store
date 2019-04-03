import React, { Component } from "react";
import CartTable from "./cartTable";
import { getProduct } from "./../../services/productsService";
import { getCurrentUser } from "../../services/authService";
import { Link } from "react-router-dom";

class Cart extends Component {
  state = { products: [], totalCost: 0, user: {} };

  // constructor() {
  //   super();
  //   const products = this.getProductsInCart();
  // }

  componentDidMount() {
    const products = this.getProductsInCart();
    const totalCost = this.getTotalCost(products);
    const user = getCurrentUser();
    this.setState({ products, totalCost, user });
  }

  getTotalCost = products => {
    const totalCost = products.reduce(
      (sum, currentItem) =>
        sum + parseInt(currentItem.price) * parseInt(currentItem.qty),
      0
    );
    return totalCost;
  };

  handleDeleteFromCart = product => {
    let products = this.state.products.filter(item => item._id !== product._id);
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(cart.findIndex(p => p._id === product._id), 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    let totalCost = this.state.totalCost - product.qty * product.price;
    this.setState({ products, totalCost });
  };

  changeProductQuantity(productId, newValue, delta) {
    const { products } = this.state;

    let cart = JSON.parse(localStorage.getItem("cart"));
    let prodInCart = cart.find(p => p._id === productId);
    let prodInState = products.find(p => p._id === productId);

    if (newValue) {
      prodInState.qty = newValue;
      prodInCart.qty = newValue;
    } else {
      if (prodInCart.qty > 1 || delta > 0) {
        prodInState.qty += delta;
        prodInCart.qty += delta;
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    const totalCost = this.getTotalCost(products);
    this.setState({ products, totalCost });
  }

  handleIncrementClick = productId => {
    this.changeProductQuantity(productId, null, 1);

    // let products = this.state.products.filter(item => item._id !== productId);
    // this.setState(state => ({ quantity: state.quantity + 1 }));
  };

  handleDecrementClick = productId => {
    this.changeProductQuantity(productId, null, -1);
    // const { products } = this.state;

    // let cart = JSON.parse(localStorage.getItem("cart"));
    // let prodInCart = cart.find(p => p._id === productId);
    // prodInCart.qty > 1 ? prodInCart.qty-- : (prodInCart.qty = 1);
    // localStorage.setItem("cart", JSON.stringify(cart));

    // let prodInStateClone = { ...products.find(p => p._id === productId) };
    // const index = products.findIndex(p => p._id === productId);
    // prodInStateClone.qty > 1
    //   ? prodInStateClone.qty--
    //   : (prodInStateClone.qty = 1);
    // products[index] = prodInStateClone;
    // const totalCost = this.getTotalCost(products);
    // this.setState({ products, totalCost });

    // this.setState(state =>
    //   state.quantity > 1 ? { quantity: state.quantity - 1 } : { quantity: 1 }
    // );
  };

  handleQuantityChange = (value, productId) => {
    let quantity = parseInt(value);
    if (isNaN(quantity) || quantity < 1) return;
    else this.changeProductQuantity(productId, quantity, null);
  };

  getProductsInCart() {
    let cartInfo;
    if (localStorage.getItem("cart"))
      cartInfo = JSON.parse(localStorage.getItem("cart"));
    else return [];
    let products = [];
    let prodInCart = [];
    for (var i = 0; i < cartInfo.length; i++) {
      prodInCart = { ...getProduct(cartInfo[i]._id), qty: cartInfo[i].qty };
      products.push(prodInCart);
    }
    return products;
  }

  render() {
    const { sortColumn } = this.props;
    const { products, totalCost, user } = this.state;
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

export default Cart;
