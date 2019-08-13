import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Table from '../../shared/markup-usage/Table';
import ProductPrice from '../../cart/components/ProductPrice';
import '../../styles/OrderTable.css';

class OrderTable extends Component {
  columns = [
    {
      key: 'title',
      label: 'Title',
      content: product => (
        <Link to={`/products/${product.id}`} className="clickable">
          {product.title}
        </Link>
      ),
      customClasses: 'order_table__column--title',
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
      customClasses: 'text-center order_table__column--cost',
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
      id: PropTypes.string,
      quantity: PropTypes.number,
      price: PropTypes.object,
      title: PropTypes.string,
    }),
  ).isRequired,
  sortColumn: PropTypes.string.isRequired,

  currentCurrency: PropTypes.shape({ _id: PropTypes.string, name: PropTypes.string }).isRequired,
  isCurrencyLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  currentCurrency: state.currency.currentCurrency,
  isCurrencyLoading: state.currency.currenciesStatus.isGettingCurrenciesInProcess,
});

export default connect(mapStateToProps)(OrderTable);
