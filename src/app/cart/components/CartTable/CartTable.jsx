import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropTypes } from 'prop-types';
import { ResponsiveEllipsis, Table, ItemCounter } from '../../../shared';
import ProductPrice from '../ProductPrice';
import './CartTable.scss';

class CartTable extends Component {
  columns = [
    {
      key: 'image',
      label: '',
      content: product => (
        <Link to={`/products/${product.id}`} className="clickable ">
          <img src={product.imageURL} alt={product.title} className="product-image" />
        </Link>
      ),
      customClasses: 'cart-table--column-image',
    },

    {
      path: 'title',
      label: 'Title',
      content: product => (
        <Link to={`/products/${product.id}`} className="clickable product-title">
          {product.title}
        </Link>
      ),
      customClasses: 'cart-table--column-title',
    },

    {
      path: 'description',
      label: 'Details',
      content: product => (
        <ResponsiveEllipsis
          text={product.description}
          maxLine="2"
          ellipsis="..."
          basedOn="words"
          customClasses="product-description"
        />
      ),
      customClasses: 'cart-table--column-details',
    },

    {
      key: 'quantity',
      label: 'Quantity',
      content: product => (
        <ItemCounter
          item={product}
          onQuantityChanged={this.props.changeQuantity}
        />
      ),
      customClasses: 'cart-table--column-quantity',
    },

    {
      path: 'cost',
      label: 'Cost',
      content: product => <ProductPrice price={product.currentCurrencyCost} isCurrencyLoading={this.props.isCurrencyLoading} />,
      customClasses: 'text-center cart-table--column-cost',
    },

    {
      key: 'deleteFromCart',
      content: product => (
        <button type="button" id={product.id} className="button button-solid" onClick={this.handleDeleteProductFromCart}>
          <FontAwesomeIcon icon="trash" />
        </button>
      ),
      customClasses: 'cart-table--column-delete',
    },
  ];

  handleDeleteProductFromCart = (e) => {
    this.props.deleteProductFromCart(e.target.id);
  };

  render() {
    const { productsInCart, sortColumn } = this.props;
    return <Table columns={this.columns} sortColumn={sortColumn} items={productsInCart} customClasses="cart-table" />;
  }
}

CartTable.propTypes = {
  isCurrencyLoading: PropTypes.bool.isRequired,

  productsInCart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      imageURL: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      currentCurrencyCost: PropTypes.number,
      quantity: PropTypes.number,
    }),
  ).isRequired,
  sortColumn: PropTypes.string.isRequired,
  changeQuantity: PropTypes.func.isRequired,
  deleteProductFromCart: PropTypes.func.isRequired,
};

export default CartTable;
