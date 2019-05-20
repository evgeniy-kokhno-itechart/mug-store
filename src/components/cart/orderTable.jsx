import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
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
      label: "Quantity",
      customClasses: "text-center"
    },
    {
      key: "cost",
      path: "cost",
      label: "Cost",
      content: product =>
        product.qty *
        product.price[this.props.currentCurrency.name] *
        (1 - product.discount / 100),
      style: { width: "10%" },
      customClasses: "text-center"
    }
  ];

  render() {
    const { products, sortColumn } = this.props;

    return (
      <Table columns={this.columns} sortColumn={sortColumn} items={products} />
    );
  }
}

const mapStateToProps = state => {
  return {
    currentCurrency: state.currencyState.currentCurrency
  };
};

export default connect(mapStateToProps)(OrderTable);
