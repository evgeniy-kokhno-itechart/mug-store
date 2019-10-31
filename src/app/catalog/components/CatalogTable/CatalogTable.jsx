import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropTypes } from 'prop-types';
import BuyNowButton from '../BuyNowButton/BuyNowButton';
import DeleteProductButton from '../DeleteProductButton';
import { ResponsiveEllipsis, Table, Rate } from '../../../shared';
import { ProductPrice } from '../../../cart';
import './CatalogTable.scss';

class CatalogTable extends Component {
  state = {
    columns: [
      {
        key: 'image',
        label: '',
        content: product => (
          <Link to={`/products/${product.id}`} className="clickable">
            <img src={product.imageURL} alt={product.title} className="product-image" />
          </Link>
        ),
        customClasses: 'catalog-table__column-image',
      },
      {
        key: 'title',
        label: 'Title',
        content: product => (
          <Link to={`/products/${product.id}`} className="clickable product-title">
            {product.title}
          </Link>
        ),
        customClasses: 'catalog-table__column-title',
      },
      {
        key: 'description',
        label: 'Details',
        content: product => (
          <ResponsiveEllipsis
            text={product.description}
            maxLine="3"
            ellipsis="..."
            basedOn="words"
            customClasses="product-description"
          />
        ),
        customClasses: 'catalog-table__column-details',
      },
      {
        key: 'rate',
        content: product => <Rate rate={product.rate} />,
        customClasses: 'catalog-table__column-rate',
      },
      {
        key: 'price',
        label: 'Price',
        content: product => <ProductPrice price={product.currentCurrencyPrice} isCurrencyLoading={this.props.isCurrencyLoading} />,
        customClasses: 'catalog-table__column-price',
      },
      {
        key: 'buyNow',
        content: product => <BuyNowButton onBuyNow={this.props.addToCart} product={product} />,
        customClasses: 'catalog-table__column-buynow',
      },
    ],
  };

  adminColumns = [
    {
      key: 'edit',
      content: product => (
        <Link to={`/edit/products/${product.id}`}>
          <button type="button" className="button button--solid button--warning focusable">
            <FontAwesomeIcon icon="pen" />
          </button>
        </Link>
      ),
    },
    {
      key: 'delete',
      content: product => (
        <DeleteProductButton
          productId={product.id}
          productTitle={product.title}
          handleDelete={this.props.onDelete}
        />
      ),
    },
  ];

  componentDidMount() {
    const { currentUserRoles } = this.props;
    if (currentUserRoles.includes('admin')) {
      this.setState(prevState => ({ columns: [...prevState.columns, ...this.adminColumns] }));
    }
  }

  render() {
    const { productsOnPage } = this.props;

    return <Table columns={this.state.columns} items={productsOnPage} customClasses="catalog-table" />;
  }
}

CatalogTable.propTypes = {
  currentUserRoles: PropTypes.arrayOf(PropTypes.string),
  isCurrencyLoading: PropTypes.bool,

  productsOnPage: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      imageURL: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      category: PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }),
      basePrice: PropTypes.number,
      currentCurrencyPrice: PropTypes.number,
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
  currentUserRoles: [],
  isCurrencyLoading: true,
};

export default CatalogTable;
