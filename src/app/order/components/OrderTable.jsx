import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { Table } from '../../shared';
import { ProductPrice } from '../../cart';

class OrderTable extends Component {
  columns = [
    {
      key: 'title',
      label: 'Title',
      content: product => (
        <Link to={`/products/${product.id}`} className="clickable product-title">
          {product.title}
        </Link>
      ),
      customClasses: 'order-table__column-title',
    },
    {
      path: 'quantity',
      label: 'Quantity',
      customClasses: 'text-center',
    },
    {
      key: 'cost',
      label: 'Cost',
      content: product => <ProductPrice price={product.currentCurrencyCost} isCurrencyLoading={this.props.isCurrencyLoading} />,
      customClasses: 'text-center order-table__column-cost',
    },
  ];

  render() {
    const { products, sortColumn } = this.props;

    return (
      <React.Fragment>
        <p>Please check the list of products</p>
        <Table columns={this.columns} sortColumn={sortColumn} items={products} customClasses="order-table" />
      </React.Fragment>
    );
  }
}

OrderTable.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      quantity: PropTypes.number,
      price: PropTypes.object,
      title: PropTypes.string,
    }),
  ).isRequired,
  sortColumn: PropTypes.string.isRequired,

  isCurrencyLoading: PropTypes.bool,
};

OrderTable.defaultProps = {
  isCurrencyLoading: true,
};

export default OrderTable;
