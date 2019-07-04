import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import ResponsiveEllipsis from '../../shared/markup-usage/responsiveEllipsis';
import Table from '../../shared/markup-usage/table';
import Rate from '../../shared/markup-usage/rate';
import Modal from '../../shared/markup-usage/modal';
import BuyNowButton from '../components/buyNowButton';
import ProductPriceCalculator from '../../cart/containers/productPriceCalculator';
import { addToCart } from '../../cart/cartActions';

class ProductsTable extends Component {
  state = {
    columns: [
      {
        key: 'image',
        label: '',
        content: product => (
          <Link to={`/products/${product._id}`} className="clickable">
            <img src={product.imageURL} alt={product.title} className="img-fluid" />
          </Link>
        ),
        style: { width: '20%' },
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
        content: product => (
          <ProductPriceCalculator price={product.price[this.props.currentCurrency.name]} quantity={1} discount={product.discount} />
        ),
        style: { width: '5%' },
      },
      {
        key: 'buyNow',
        content: product => <BuyNowButton customClasses="btn-sm" onBuyNow={this.props.addToCart} productId={product._id} />,
        style: { width: '10%' },
      },
    ],
  };

  adminColumns = [
    {
      key: 'edit',
      content: product => (
        <Link to={`/edit/products/${product._id}`}>
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
          onConfirm={() => this.props.onDelete(product._id)}
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

ProductsTable.propTypes = {
  currentUser: PropTypes.shape({ name: PropTypes.string }).isRequired,
  currentCurrency: PropTypes.shape({ name: PropTypes.string }).isRequired,
  productsOnPage: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortColumn: PropTypes.shape({ order: PropTypes.string, path: PropTypes.string }).isRequired,
  addToCart: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentUser: state.userState.currentUser,
  currentCurrency: state.currencyState.currentCurrency,
});

const mapDispatchToProps = {
  addToCart,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductsTable);
