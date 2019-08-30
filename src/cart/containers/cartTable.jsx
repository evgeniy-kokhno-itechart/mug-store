import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import ResponsiveEllipsis from '../../shared/markup-usage/ResponsiveEllipsis';
import Table from '../../shared/markup-usage/Table';
import ItemCounter from '../../shared/controls/ItemCounter';
import ProductPrice from '../components/ProductPrice';
import {
  incrementQuantity, decrementQuantity, changeQuantity, deleteProductFromCart,
} from '../cartActions';
import '../../styles/CartTable.css';

export class CartTable extends Component {
  columns = [
    {
      key: 'image',
      label: '',
      content: product => (
        <Link to={`/products/${product.id}`} className="clickable ">
          <img src={product.imageURL} alt={product.title} className="img-fluid" />
        </Link>
      ),
      customClasses: 'cart-table--column__image',
    },

    {
      path: 'title',
      label: 'Title',
      content: product => (
        <Link to={`/products/${product.id}`} className="clickable">
          {product.title}
        </Link>
      ),
      customClasses: 'cart-table--column__title',
    },

    {
      path: 'description',
      label: 'Details',
      content: product => <ResponsiveEllipsis text={product.description} maxLine="1" ellipsis="..." basedOn="words" />,
      customClasses: 'cart-table--column__details',
    },

    {
      key: 'quantity',
      label: 'Quantity',
      content: product => (
        <ItemCounter
          count={product.quantity}
          itemId={product.id}
          onIncrementClick={this.props.incrementQuantity}
          onDecrementClick={this.props.decrementQuantity}
          onCountChange={this.props.changeQuantity}
        />
      ),
      customClasses: 'cart-table--column__quantity',
    },

    {
      path: 'cost',
      label: 'Cost',
      content: product => <ProductPrice price={product.currentCurrencyCost} isCurrencyLoading={this.props.isCurrencyLoading} />,
      customClasses: 'text-center cart-table--column__cost',
    },

    {
      key: 'deleteFromCart',
      content: product => (
        <button type="button" id={product.id} className="btn btn-secondary btn-sm" onClick={this.handleDeleteProductFromCart}>
          <FontAwesomeIcon icon="trash" />
        </button>
      ),
      customClasses: 'cart-table--column__delete',
    },
  ];

  handleDeleteProductFromCart = (e) => {
    this.props.deleteProductFromCart(e.target.id);
  };

  render() {
    const { productsInCart, sortColumn } = this.props;
    return <Table columns={this.columns} sortColumn={sortColumn} items={productsInCart} />;
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
      currentCurrencyPrice: PropTypes.number,
      quantity: PropTypes.number,
    }),
  ).isRequired,
  sortColumn: PropTypes.string.isRequired,
  incrementQuantity: PropTypes.func.isRequired,
  decrementQuantity: PropTypes.func.isRequired,
  changeQuantity: PropTypes.func.isRequired,
  deleteProductFromCart: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
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
