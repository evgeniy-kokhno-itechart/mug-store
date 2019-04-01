import React, { Component } from "react";
import CartTable from "./cartTable";

class Cart extends Component {
  state = { products: [] };

  componentDidMount() {}
  handleDeleteFromCart = product => {
    let products = this.state.products.filter(item => item._id !== product._id);
    let cart = JSON.parse(localStorage.getItem("cart"));
    delete cart[product.id.toString()];
    localStorage.setItem("cart", JSON.stringify(cart));
    let total = this.state.total - product.qty * product.price;
    this.setState({ products, total });
  };
  render() {
    return (
      <CartTable
        sortColumn={sortColumn}
        productsOnPage={productsOnPage}
        user={user}
        onDeleteFromCart={this.handleDeleteFromCart}
      />
    );
  }
}

export default Cart;
