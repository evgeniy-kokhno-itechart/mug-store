import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import ResponsiveEllipsis from '../../shared/markup-usage/responsiveEllipsis';
import Table from '../../shared/markup-usage/table';
import ItemCounter from '../../shared/controls/itemCounter';
import {
  incrementQuantity, decrementQuantity, changeQuantity, deleteProductFromCart,
} from '../cartActions';
import ProductPriceCalculator from './productPriceCalculator';

class CartTable extends Component {
  columns = [
    {
      key: 'image',
      label: '',
      content: product => (
        <Link to={`/products/${product.id}`} className="clickable ">
          <img src={product.imageURL} alt={product.title} className="img-fluid" />
        </Link>
      ),
      style: { width: '15%' },
    },

    {
      path: 'title',
      label: 'Title',
      content: product => (
        <Link to={`/products/${product.id}`} className="clickable">
          {product.title}
        </Link>
      ),
      style: { width: '10%' },
    },

    {
      path: 'description',
      label: 'Details',
      content: product => <ResponsiveEllipsis text={product.description} maxLine="1" ellipsis="..." basedOn="words" />,
      style: { width: '58%' },
    },

    {
      key: 'qty',
      label: 'Quantity',
      content: product => (
        <ItemCounter
          count={product.qty}
          itemId={product.id}
          onIncrementClick={this.props.incrementQuantity}
          onDecrementClick={this.props.decrementQuantity}
          onCountChange={this.props.changeQuantity}
        />
      ),
      style: { width: '5%' },
    },

    {
      path: 'cost',
      label: 'Cost',
      content: product => (
        <ProductPriceCalculator
          price={product.price[this.props.currentCurrency.name]}
          isCurrencyLoading={this.props.isCurrencyLoading}
          quantity={product.qty}
          discount={product.discount}
        />
      ),
      style: { width: '5%' },
      customClasses: 'text-center',
    },

    {
      key: 'deleteFromCart',
      content: product => (
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => this.props.deleteProductFromCart(product.id)}
        >
          <FontAwesomeIcon icon="trash" />
        </button>
      ),
      style: { width: '5%' },
    },
  ];

  render() {
    const { productsInCart, sortColumn } = this.props;
    return <Table columns={this.columns} sortColumn={sortColumn} items={productsInCart} />;
  }
}

CartTable.propTypes = {
  currentCurrency: PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }).isRequired,
  isCurrencyLoading: PropTypes.bool.isRequired,

  productsInCart: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, qty: PropTypes.number })).isRequired,
  sortColumn: PropTypes.string.isRequired,
  incrementQuantity: PropTypes.func.isRequired,
  decrementQuantity: PropTypes.func.isRequired,
  changeQuantity: PropTypes.func.isRequired,
  deleteProductFromCart: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  cart: state.cart.cart,
  currentCurrency: state.currency.currentCurrency,
  isCurrencyLoading: state.currency.currenciesStatus.isGettingCurrenciesInProcess,
});

const mapDispatchToProps = {
  incrementQuantity,
  decrementQuantity,
  changeQuantity,
  deleteProductFromCart,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CartTable);
