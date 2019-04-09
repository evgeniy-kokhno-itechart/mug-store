import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LinesEllipsis from "react-lines-ellipsis";
import { getCurrentUser } from "../../services/authService";
import { getCurrentCurrency } from "./../../services/payService";
import Table from "./../common/table";
import Rate from "./../common/rate";
import Modal from "../common/modal";

class ProductsTable extends Component {
  state = { currentCurrency: {} };

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
          maxLine="3"
          ellipsis="..."
          trimRight
          basedOn="words"
        />
      ),
      style: { width: "50%" }
    },
    {
      path: "rate",
      content: product => (
        <Rate rate={product.rate} /> // onClick={this.props.onRateClick(product)} />
      ),
      style: { width: "11%" }
    },
    {
      path: "price." + this.state.currentCurrency.name,
      label: "Price",
      content: product => {
        return (
          product.price[this.state.currentCurrency.name] *
          (1 - product.discount / 100)
        );
      },
      style: { width: "5%" }
    },
    {
      key: "buyNow",
      content: product => (
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => this.props.onBuyNow(product, 1)}
        >
          <FontAwesomeIcon icon="cart-arrow-down" />
        </button>
      ),
      style: { width: "10%" }
    }
  ];

  adminColumns = [
    {
      key: "edit",
      content: product => (
        <Link to={`/edit/products/${product._id}`}>
          <button className="btn btn-warning btn-sm">Edit</button>
        </Link>
      )
    },
    {
      key: "delete",
      content: product => (
        <Modal
          id="product-deletion-confirmation" //{product._id + product.title.replace(/\s/g, "")}
          buttonLabel="Delete"
          buttonClasses="btn btn-danger btn-sm"
          title="Confirm product deletion"
          text={
            "You are about to completely delete " +
            product.title +
            " from the database?"
          }
          textConfirm="Confirm"
          textAbort="Dismiss"
          onConfirm={() => this.props.onDelete(product._id)}
        />
        // <button
        //   onClick={() => this.props.onDelete(product._id)}
        //   className="bth btn-danger btn-sm"
        // >
        //   Delete
        // </button>
      )
    }
  ];

  constructor() {
    super();
    const user = getCurrentUser();
    if (user && user.roles.includes("admin")) {
      this.columns = [...this.columns, ...this.adminColumns];
    }
    const currentCurrency = getCurrentCurrency();
    this.state.currentCurrency = currentCurrency;
  }

  // componentDidMount() {
  //   const currentCurrency = getCurrentCurrency();
  //   this.setState({ currentCurrency });
  // }

  render() {
    const { productsOnPage, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        items={productsOnPage}
      />
    );
  }
}

export default ProductsTable;
