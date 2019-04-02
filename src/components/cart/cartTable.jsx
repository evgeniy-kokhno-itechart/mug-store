import React, { Component } from "react";
import { Link } from "react-router-dom";
import LinesEllipsis from "react-lines-ellipsis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Table from "../common/table";

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
    { path: "qty", label: "Quantity", style: { width: "5%" } },
    {
      path: "cost",
      label: "Cost",
      content: product => product.qty * product.price,
      style: { width: "10%" }
    },
    {
      key: "deleteFromCart",
      content: product => (
        <button
          className="bth btn-secondary btn-sm"
          onClick={() => this.props.onDeleteFromCart(product, 1)}
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

export default CartTable;
