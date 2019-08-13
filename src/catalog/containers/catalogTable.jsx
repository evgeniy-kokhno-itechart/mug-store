/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import ResponsiveEllipsis from '../../shared/markup-usage/ResponsiveEllipsis';
import Table from '../../shared/markup-usage/Table';
import Rate from '../../shared/markup-usage/Rate';
import Modal from '../../shared/markup-usage/Modal';
import BuyNowButton from '../components/BuyNowButton';
import ProductPrice from '../../cart/components/ProductPrice';
import { addToCart } from '../../cart/cartActions';
import '../../styles/CatalogTable.css';

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
        customClasses: 'catalog_table__column--image',
      },
      {
        key: 'title',
        label: 'Title',
        content: product => (
          <Link to={`/products/${product.id}`} className="clickable catalog_table__product_title">
            {product.title}
          </Link>
        ),
        customClasses: 'catalog_table__column--title',
      },
      {
        key: 'description',
        label: 'Details',
        content: product => <ResponsiveEllipsis text={product.description} maxLine="3" ellipsis="..." basedOn="words" />,
        customClasses: 'd-none d-md-table-cell catalog_table__column--details',
      },
      {
        key: 'rate',
        content: product => <Rate rate={product.rate} />,
        customClasses: 'catalog_table__column--rate',
      },
      {
        key: 'price',
        label: 'Price',
        content: product => <ProductPrice price={product.currentCurrencyPrice} isCurrencyLoading={this.props.isCurrencyLoading} />,
        customClasses: 'catalog_table__column--price',
      },
      {
        key: 'buyNow',
        content: product => <BuyNowButton customClasses="btn-sm" onBuyNow={this.props.addToCart} product={product} />,
        customClasses: 'catalog_table__column--buynow',
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
