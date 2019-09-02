/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import ResponsiveEllipsis from '../../shared/markup-usage/ResponsiveEllipsis';
import Table from '../../shared/markup-usage/Table';
import Rate from '../../shared/markup-usage/Rate';
import BuyNowButton from '../components/BuyNowButton';
import ProductPrice from '../../cart/components/ProductPrice';
import CatalogDeletAction from '../components/CatalogDeleteAction';
import { addToCart } from '../../cart/cartActions';
import '../../styles/CatalogTable.css';

export class CatalogTable extends Component {
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
      content: product => <CatalogDeletAction productId={product.id} productTitle={product.title} handleAction={this.props.onDelete} />,
    },
  ];

  componentDidMount() {
    const { currentUser: user } = this.props;
    if (user.name && user.roles.includes('admin')) {
      this.setState(prevState => ({ columns: [...prevState.columns, ...this.adminColumns] }));
    }
  }

  // handleDeleteConfirmed = (e) => {
  //   console.log('e.target.id', e.target.id);
  //   this.props.onDelete(e.target.id);
  // };

  render() {
    const { productsOnPage } = this.props;

    return <Table columns={this.state.columns} items={productsOnPage} />;
  }
}

CatalogTable.propTypes = {
  currentUser: PropTypes.shape({ name: PropTypes.string, roles: PropTypes.arrayOf(PropTypes.string) }),
  isCurrencyLoading: PropTypes.bool,

  productsOnPage: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      imageURL: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      category: PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }),
      basePrice: PropTypes.number,
      currentCurrencyPrice: PropTypes.number, // !!!
      discount: PropTypes.number,
      producer: PropTypes.string,
      publishDate: PropTypes.string,
      rate: PropTypes.string,
    }),
  ).isRequired,
  addToCart: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

CatalogTable.defaultProps = {
  currentUser: {},
  isCurrencyLoading: true,
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  isCurrencyLoading: state.currency.currenciesStatus.isGettingCurrenciesInProcess,
});

const mapDispatchToProps = {
  addToCart,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CatalogTable);
