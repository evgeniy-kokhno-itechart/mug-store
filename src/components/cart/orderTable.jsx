import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../common/table";

class OrderTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: product => (
        <Link to={`/products/${product._id}`} className="clickable">
          {product.title}
        </Link>
      ),
      style: { width: "70%" }
    },
    {
      path: "qty",
      label: "Quantity"
    },
    {
      key: "cost",
      path: "cost",
      label: "Cost",
      content: product => product.qty * product.price,
      style: { width: "10%" }
    }
  ];
  render() {
    const { products, sortColumn } = this.props;

    return (
      <Table columns={this.columns} sortColumn={sortColumn} items={products} />
    );
  }
}

export default OrderTable;
