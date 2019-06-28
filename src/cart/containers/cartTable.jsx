import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import ResponsiveEllipsis from '../../shared/markup-usage/responsiveEllipsis';
import Table from '../../shared/markup-usage/table';
import ItemCounter from '../../shared/controls/itemCounter';
import * as cartActionTypes from '../cartActions';
import ProductPriceCalculator from './productPriceCalculator';

class CartTable extends Component {
  columns = [
    {
      key: 'image',
      label: '',
      content: product => (
        <Link to={`/products/${product._id}`} className="clickable ">
          <img src={product.imageURL} alt={product.title} className="img-fluid" />
        </Link>
      ),
      style: { width: '15%' },
    },

    {
      path: 'title',
      label: 'Title',
      content: product => (
        <Link to={`/products/${product._id}`} className="clickable">
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
          itemId={product._id}
          onIncrementClick={this.props.onIncrementClick}
          onDecrementClick={this.props.onDecrementClick}
          onCountChange={this.props.onQuantityChange}
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
          quantity={product.qty}
          discount={product.discount}
        />
        // const cost = product.qty * product.price[this.props.currentCurrency.name] * (1 - product.discount / 100);
        // if (cost) {
        //   return cost.toString();
        // }
        // return 0;
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
          onClick={() => this.props.onDeleteFromCart(product._id)}
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
  currentCurrency: PropTypes.shape({ _id: PropTypes.string, name: PropTypes.string }).isRequired,
  productsInCart: PropTypes.arrayOf(PropTypes.shape({ _id: PropTypes.string, qty: PropTypes.number })).isRequired,
  sortColumn: PropTypes.string.isRequired,
  onIncrementClick: PropTypes.func.isRequired,
  onDecrementClick: PropTypes.func.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
  onDeleteFromCart: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ cart: state.cartState.cart, currentCurrency: state.currencyState.currentCurrency });

const mapDispatchToProps = dispatch => ({
  onIncrementClick: productId => dispatch({ type: cartActionTypes.INCREMENT_PRODUCT_QTY, productId }),
  onDecrementClick: productId => dispatch({ type: cartActionTypes.DECREMENT_PRODUCT_QTY, productId }),
  onQuantityChange: (value, productId) => dispatch({ type: cartActionTypes.CHANGE_PRODUCT_QTY, details: { value, productId } }),
  onDeleteFromCart: productId => dispatch({ type: cartActionTypes.DELETE_PRODUCT_FROM_CART, productId }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CartTable);
