import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Table from '../../shared/markup-usage/table';
import ProductPriceCalculator from '../../cart/containers/productPriceCalculator';

class OrderTable extends Component {
  columns = [
    {
      path: 'title',
      label: 'Title',
      content: product => (
        <Link to={`/products/${product._id}`} className="clickable">
          {product.title}
        </Link>
      ),
      style: { width: '70%' },
    },
    {
      path: 'qty',
      label: 'Quantity',
      customClasses: 'text-center',
    },
    {
      key: 'cost',
      path: 'cost',
      label: 'Cost',
      content: product => (
        <ProductPriceCalculator
          price={product.price[this.props.currentCurrency.name]}
          quantity={product.qty}
          discount={product.discount}
        />
      ),
      style: { width: '10%' },
      customClasses: 'text-center',
    },
  ];

  render() {
    const { products, sortColumn } = this.props;

    return (
      <React.Fragment>
        <p>Please check the list of products</p>
        <Table columns={this.columns} sortColumn={sortColumn} items={products} />
      </React.Fragment>
    );
  }
}

OrderTable.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      qty: PropTypes.number,
      price: PropTypes.object,
      title: PropTypes.string,
    }),
  ).isRequired,
  sortColumn: PropTypes.string.isRequired,
  currentCurrency: PropTypes.shape({ _id: PropTypes.string, name: PropTypes.string }).isRequired,
};

const mapStateToProps = state => ({
  currentCurrency: state.currencyState.currentCurrency,
});

export default connect(mapStateToProps)(OrderTable);
