/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import ResponsiveEllipsis from '../../shared/markup-usage/responsiveEllipsis';
import Table from '../../shared/markup-usage/table';
import Rate from '../../shared/markup-usage/rate';
import Modal from '../../shared/markup-usage/modal';
import BuyNowButton from '../components/buyNowButton';
import ProductPrice from '../../cart/components/productPrice';
import { addToCart } from '../../cart/cartActions';

class CatalogTable extends Component {
  state = {
    columns: [
      {
        key: 'image',
        label: '',
        content: product => (
          <Link to={`/products/${product.id}`} className="clickable">
            <img src={product.imageURL} alt={product.title} className="img-fluid" />
          </Link>
        ),
        style: { width: '20%' },
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
        content: product => <ResponsiveEllipsis text={product.description} maxLine="3" ellipsis="..." basedOn="words" />,
        customClasses: 'd-none d-md-table-cell',
        style: { width: '50%' },
      },
      {
        path: 'rate',
        content: product => <Rate rate={product.rate} />,
        style: { width: '11%' },
      },
      {
        path: `price. ${this.props.currentCurrency.name}`,
        label: 'Price',
        content: product => <ProductPrice price={product.currentCurrencyPrice} isCurrencyLoading={this.props.isCurrencyLoading} />,
        style: { width: '5%' },
      },
      {
        key: 'buyNow',
        content: product => <BuyNowButton customClasses="btn-sm" onBuyNow={this.props.addToCart} product={product} />,
        style: { width: '10%' },
      },
    ],
  };

  adminColumns = [
    {
      key: 'edit',
      content: product => (
        <Link to={`/edit/products/${product.id}`}>
          <button type="button" className="btn btn-warning btn-sm">
            Edit
          </button>
        </Link>
      ),
    },
    {
      key: 'delete',
      content: product => (
        <Modal
          id="product-deletion-confirmation"
          buttonLabel="Delete"
          buttonClasses="btn btn-danger btn-sm"
          title="Confirm product deletion"
          text={`You are about to completely delete ${product.title} from the database!`}
          textConfirm="Confirm"
          textAbort="Dismiss"
          onConfirm={() => this.props.onDelete(product.id)}
        />
      ),
    },
  ];

  componentDidMount() {
    const { currentUser: user } = this.props;
    if (user.name && user.roles.includes('admin')) {
      this.setState(prevState => ({ columns: [...prevState.columns, ...this.adminColumns] }));
    }
  }

  render() {
    const { productsOnPage, sortColumn } = this.props;

    return <Table columns={this.state.columns} sortColumn={sortColumn} items={productsOnPage} />;
  }
}

CatalogTable.propTypes = {
  currentUser: PropTypes.shape({ name: PropTypes.string }).isRequired,
  currentCurrency: PropTypes.shape({ name: PropTypes.string }).isRequired,
  isCurrencyLoading: PropTypes.bool.isRequired,

  productsOnPage: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortColumn: PropTypes.shape({ order: PropTypes.string, path: PropTypes.string }).isRequired,
  addToCart: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentCurrency: state.currency.currentCurrency,
  isCurrencyLoading: state.currency.currenciesStatus.isGettingCurrenciesInProcess,
});

const mapDispatchToProps = {
  addToCart,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CatalogTable);
