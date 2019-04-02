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
    const totalCost = products.reduce(
      (sum, currentItem) =>
        sum + parseInt(currentItem.price) * parseInt(currentItem.qty),
      0
    );
    const user = getCurrentUser();
    this.setState({ products, totalCost, user });
  }

  handleDeleteFromCart = product => {
    let products = this.state.products.filter(item => item._id !== product._id);
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(cart.indexOf(product), 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    let totalCost = this.state.totalCost - product.qty * product.price;
    this.setState({ products, totalCost });
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
        />

        <div className="row justify-content-between">
          <h3 className="col-4">
            {totalCost ? `Total cost: ${totalCost}` : ""}
          </h3>
          <Link
            className="btn btn-secondary m-2 justify-content-end"
            to={user ? "/order/mycart" : "/order"}
          >
            Order Now!
          </Link>
        </div>
      </React.Fragment>
    ) : (
      <h2 className="mt-2">Your cart is empty</h2>
    );
  }
}

export default Cart;
