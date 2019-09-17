/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import _ from 'lodash';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import getProductImageURLs from '../ImageService';
import { productCostSelector } from '../ProductsSelectors';
import { getProduct, clearCurrentProductInfo } from '../ProductsActions';
import { InformationItem, ErrorMessage, Spinner } from '../../shared';
import { addToCart } from '../../cart';
import { BuyNowButton, ToCatalogButton } from '../../catalog';

export class ProductDetails extends Component {
  state = {
    imageURLs: [],
  };

  fields = [
    { label: 'Title', path: 'title' },
    { label: 'Description', path: 'description' },
    { label: 'Category', path: 'category.name' },
    { label: 'Producer', path: 'producer' },
    { label: 'Price', path: 'currentCurrencyPrice' },
  ];

  componentDidMount() {
    const { match } = this.props;

    const productId = match.params.id;

    this.props.getProduct(productId);

    //  imageURLs were separated from original model for sample purposes since they are the same across all products
    //  my-json-server.typicode.com char limit 10000 has been reached thus URLs data couldn't be placed there
    const imageURLs = getProductImageURLs(productId);
    this.setState({ imageURLs });
  }

  getInfo = (item, path) => _.get(item, path);

  conponentWillUnmount() {
    this.props.clearCurrentProductInfo();
  }

  renderFieldInfo = (field) => {
    const { product } = this.props;

    let fieldInfo = null;
    if (!field.content) {
      fieldInfo = this.getInfo(product, field.path);
    } else {
      fieldInfo = field.content(product);
    }
    return <InformationItem key={field.label} label={field.label} info={fieldInfo} />;
  };

  renderSpinner = () => <Spinner customSizeClassName="product-details__spinner" marginBootstrapClassName="mt-5" />;

  renderErrorMessage = message => <ErrorMessage message={message} />;

  renderProductDetails = () => {
    const { imageURLs } = this.state;
    const { product } = this.props;

    return (
      <React.Fragment>
        <h1 className="display-5 text-center m-3">{`${product.title} Details`}</h1>
        {imageURLs && (
          <div className="col-10 col-md-9 col-lg-7 mx-auto">
            <ImageGallery
              items={imageURLs}
              infinite={false}
              showPlayButton={false}
              showBullets={false}
              showFullscreenButton={false}
              useBrowserFullscreen={false}
            />
          </div>
        )}

        {this.fields.map(field => this.renderFieldInfo(field))}

        <div className="d-flex m-3">
          <ToCatalogButton />
          <BuyNowButton customClasses="ml-auto" onBuyNow={this.props.addToCart} product={product} />
        </div>
      </React.Fragment>
    );
  };

  render() {
    return this.props.isProductLoading
      ? this.renderSpinner()
      : this.props.hasProductLoadingFailed
        ? this.renderErrorMessage(this.props.errorWhileLoading)
        : this.renderProductDetails();
  }
}

ProductDetails.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    category: PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }),
    description: PropTypes.string,
    producer: PropTypes.string,
    currentCurrencyPrice: PropTypes.number,
  }),
  isProductLoading: PropTypes.bool.isRequired,
  hasProductLoadingFailed: PropTypes.bool,
  errorWhileLoading: PropTypes.string,
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) }).isRequired,

  addToCart: PropTypes.func.isRequired,
  getProduct: PropTypes.func.isRequired,
  clearCurrentProductInfo: PropTypes.func.isRequired,
};

ProductDetails.defaultProps = {
  product: {
    id: '',
    imageURL: '',
    title: 'defaultProduct',
    description: '',
    category: {},
    basePrice: 0,
    currentCurrencyPrice: 0,
    discount: 0,
    producer: '',
    rate: '',
  },
  hasProductLoadingFailed: false,
  errorWhileLoading: '',
};

const mapStateToProps = state => ({
  product: productCostSelector(state),
  isProductLoading: state.products.currentProductStatus.isGettingByIdInProcess,
  hasProductLoadingFailed: state.products.currentProductStatus.hasGettingByIdFailed,
  errorWhileLoading: state.products.currentProductStatus.error,
});

const mapDispatchToProps = {
  addToCart,
  getProduct,
  clearCurrentProductInfo,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductDetails);
