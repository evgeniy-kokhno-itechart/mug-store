import React from "react";
import Joi from "joi-browser";
import { connect } from "react-redux";
import { getProduct } from "../../services/productsService";
import Form from "./../common/form";
import OrderTable from "./orderTable";

class OrderForm extends Form {
  state = {
    data: {
      name: "",
      country: "",
      city: "",
      address: "",
      phone: "",
      comment: ""
    },
    orderList: [],
    totalCost: 0,
    errors: {}
  };

  schema = {
    name: Joi.string()
      .required()
      .max(100)
      .label("Name"),
    country: Joi.string()
      .required()
      .max(100)
      .label("Country"),
    city: Joi.string()
      .required()
      .max(100)
      .label("City"),
    address: Joi.string()
      .required()
      .max(250)
      .label("Address"),
    phone: Joi.string()
      .required()
      .min(12)
      .max(17)
      .label("Phone"),
    comment: Joi.any().label("Comment")
  };

  componentDidMount() {
    const orderList = this.getProductsInCartBriefly();
    if (this.props.location.pathname !== "/order") {
      this.setState({
        orderList,
        data: this.mapToViewModel(this.props.currentUser)
      });
    } else this.setState({ orderList });
    console.log("state.data", this.state.data);
  }

  getTotalCost() {
    const orderList = this.getProductsInCartBriefly();
    const currentCurrency = this.props.currentCurrency;
    const totalCost = orderList.reduce(
      (sum, currentItem) =>
        sum +
        currentItem.price[currentCurrency.name] *
          currentItem.qty *
          (1 - currentItem.discount / 100),
      0
    );
    return totalCost;
  }

  mapToViewModel({ name, country, city, address, phone }) {
    return { name, country, city, address, phone };
  }

  getProductsInCartBriefly() {
    const cartInfo = this.props.cart;
    let products = [];
    let prodInCart = {};
    for (var i = 0; i < cartInfo.length; i++) {
      prodInCart = getProduct(cartInfo[i]._id);
      prodInCart = {
        _id: prodInCart._id,
        title: prodInCart.title,
        price: prodInCart.price,
        discount: prodInCart.discount,
        qty: cartInfo[i].qty
      };
      products.push(prodInCart);
    }
    return products;
  }

  doSubmit = () => {
    this.props.history.replace("/orderconfirm");

    console.log("Order has been submitted!!!");
  };

  render() {
    const { orderList } = this.state;
    const totalCost = this.getTotalCost();
    return (
      <React.Fragment>
        <h2 className="mx-2">Order</h2>
        <div className="row m-2">
          <div className="col-md-6">
            <p>Please check the list of products</p>
            <OrderTable sortColumn={"title"} products={orderList} />
            <p className="d-inline float-right">Total cost: {totalCost}</p>
          </div>
          <div className="col-md-5 offset-md-1">
            <p>Please fill out the form to continue</p>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("name", "Name")}
              {this.renderInput("country", "Country")}
              {this.renderInput("city", "City")}
              {this.renderInput("address", "Address")}
              {this.renderInput("phone", "Phone")}
              {this.renderTextArea("comment", "Comment")}
              {this.renderButton("Submit Order")}
            </form>
          </div>
        </div>
      </React.Fragment>
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

export default connect(mapStateToProps)(OrderForm);
