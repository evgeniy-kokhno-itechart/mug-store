import React, { Component } from "react";
import { Link } from "react-router-dom";
import LinesEllipsis from "react-lines-ellipsis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import Table from "../common/table";
import Increment from "../common/increment";
import * as actionTypes from "../store/actions";

class CartTable extends Component {
  state = {
    sortColumn: "title"
  };

  columns = [
    {
      key: "image",
      label: "",
      content: product => (
        <Link to={`/products/${product._id}`} className="clickable">
          <img src={product.imageURL} alt={product.title} />
        </Link>
      ),
      style: { width: "20%" }
    },
    {
      path: "title",
      label: "Title",
      content: product => (
        <Link to={`/products/${product._id}`} className="clickable">
          {product.title}
        </Link>
      ),
      style: { width: "10%" }
    },
    {
      path: "description",
      label: "Details",
      content: product => (
        <LinesEllipsis
          text={product.description}
          maxLine="1"
          ellipsis="..."
          trimRight
          basedOn="words"
        />
      ),
      style: { width: "50%" }
    },
    {
      key: "qty",
      label: "Quantity",
      content: product => (
        <Increment
          quantity={product.qty}
          productId={product._id}
          onIncrementClick={this.props.onIncrementClick}
          onDecrementClick={this.props.onDecrementClick}
          onQuantityChange={this.props.onQuantityChange}
        />
      ),
      style: { width: "15%" }
    },
    {
      path: "cost",
      label: "Cost",
      content: product => {
        const cost =
          product.qty *
          product.price[this.props.currentCurrency.name] *
          (1 - product.discount / 100);
        if (cost) return cost.toString();
        else return 0;
      },
      style: { width: "10%" }
    },
    {
      key: "deleteFromCart",
      content: product => (
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => this.props.onDeleteFromCart(product._id)}
        >
          <FontAwesomeIcon icon="trash" />
        </button>
      ),
      style: { width: "10%" }
    }
  ];

  render() {
    const { productsInCart, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        items={productsInCart}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cartState.cart,
    currentCurrency: state.currencyState.currentCurrency
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIncrementClick: productId =>
      dispatch({
        type: actionTypes.INCREMENT_PRODUCT_QTY,
        productId
      }),
    onDecrementClick: productId =>
      dispatch({
        type: actionTypes.DECREMENT_PRODUCT_QTY,
        productId
      }),
    onQuantityChange: (value, productId) =>
      dispatch({
        type: actionTypes.CHANGE_PRODUCT_QTY,
        details: { value, productId }
      }),
    onDeleteFromCart: productId =>
      dispatch({
        type: actionTypes.DELETE_PRODUCT_FROM_CART,
        productId
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartTable);
