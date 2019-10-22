/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import _ from 'lodash';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import getProductImageURLs from '../../ImageService';
import { productCostSelector } from '../../ProductsSelectors';
import { productsActions } from '../../ProductsActions';
import { InformationItem, ErrorMessage, Spinner } from '../../../shared';
import { cartActions } from '../../../cart';
import { BuyNowButton, ToCatalogButton } from '../../../catalog';
import './ProductDetails.scss';

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
    const { productState } = this.props;

    let fieldInfo = null;
    if (!field.content) {
      fieldInfo = this.getInfo(productState.product, field.path);
    } else {
      fieldInfo = field.content(productState.product);
    }
    return <InformationItem key={field.label} label={field.label} info={fieldInfo} />;
  };

  renderSpinner = () => <Spinner spinnerClasses="spinner--medium" wrapperClasses="prod-details__spinner" />;

  renderErrorMessage = message => <ErrorMessage message={message} />;

  renderProductDetails = () => {
    const { imageURLs } = this.state;
    const { productState } = this.props;

    return (
      <div className="prod-details">
        <h1 className="prod-details__header">{`${productState.product.title} Details`}</h1>
        {imageURLs && (
          <div className="prod-details__images">
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

        <div className="prod-details__footer">
          <ToCatalogButton />
          <BuyNowButton customClasses="" onBuyNow={this.props.addToCart} product={productState.product} />
        </div>
      </div>
    );
  };

  render() {
    const { productState } = this.props;
    return productState.productStatus.isInProcess
      ? this.renderSpinner()
      : productState.productStatus.hasFailed
        ? this.renderErrorMessage(productState.productStatus.error)
        : this.renderProductDetails();
  }
}

ProductDetails.propTypes = {
  productState: PropTypes.shape({
    product: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      category: PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }),
      description: PropTypes.string,
      producer: PropTypes.string,
      currentCurrencyPrice: PropTypes.number,
    }),
    productStatus: PropTypes.shape({
      isInProcess: PropTypes.bool,
      hasFailed: PropTypes.bool,
      error: PropTypes.string,
    }),
  }),

  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) }).isRequired,

  addToCart: PropTypes.func.isRequired,
  getProduct: PropTypes.func.isRequired,
  clearCurrentProductInfo: PropTypes.func.isRequired,
};

ProductDetails.defaultProps = {
  productState: {
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
    productStatus: {
      isInProcess: true,
      hasFailed: false,
      error: '',
    },
  },
};

const mapStateToProps = state => ({
  productState: {
    product: productCostSelector(state),
    productStatus: state.products.currentProductStatus,
  },
});

const mapDispatchToProps = {
  addToCart: cartActions.AddToCart,
  getProduct: productsActions.GetProduct.InitiateApiCall,
  clearCurrentProductInfo: productsActions.ClearCurrentProductInfo,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductDetails);
