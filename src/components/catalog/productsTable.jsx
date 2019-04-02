import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LinesEllipsis from "react-lines-ellipsis";
import { getCurrentUser } from "../../services/authService";
import Table from "./../common/table";
import Rate from "./../common/rate";

class ProductsTable extends Component {
  columns = [
    {
      key: "image",
      label: "",
      content: product => (
        <Link to={`/products/${product._id}`} className="clickable">
          <img src={product.imageLink} alt={product.title} />
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
      path: "rate",
      content: product => (
        <Rate rate={product.rate} /> // onClick={this.props.onRateClick(product)} />
      ),
      style: { width: "10%" }
    },
    {
      path: "price",
      label: "Price",
      content: product => product.price,
      style: { width: "5%" }
    },
    {
      key: "buyNow",
      content: product => (
        <button
          className="bth btn-secondary btn-sm"
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
          <button className="bth btn-warning btn-sm">Edit</button>
        </Link>
      )
    },
    {
      key: "delete",
      content: product => (
        <button
          onClick={() => this.props.onDelete(product)}
          className="bth btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];

  constructor() {
    super();
    const user = getCurrentUser();
    if (user && user.roles.includes("admin")) {
      this.columns = [...this.columns, ...this.adminColumns];
    }
  }

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
