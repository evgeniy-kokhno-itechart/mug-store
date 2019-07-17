/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import _ from 'lodash';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import getProductImageURLs from '../../services/general/imageService';
import InformationItem from '../../shared/markup-usage/informationItem';
import { addToCart } from '../../cart/cartActions';
import { getProduct } from '../productsActions';
import BuyNowButton from '../../catalog/components/buyNowButton';
import ToCatalogButton from '../../catalog/components/toCatalogButton';
import Spinner from '../../shared/markup-usage/spinner';
import ErrorMessage from '../../shared/markup-usage/errorMessage';

class ProductDetails extends Component {
  state = {
    imageURLs: [],
    // product: {
    //   id: '',
    //   imageURLs: [],
    //   title: '',
    //   description: '',
    //   category: {},
    //   prices: [{ value: '', currencyName: '' }],
    //   discount: '0',
    //   producer: '',
    //   rate: '',
    // },
  };

  fields = [
    { label: 'Title', path: 'title' },
    { label: 'Description', path: 'description' },
    { label: 'Category', path: 'category.name' },
    { label: 'Producer', path: 'producer' },
    {
      label: 'Price',
      content: (product, currencyName) => {
        const priceObj = product.price;
        return priceObj ? priceObj[currencyName] : '';
      },
    },
  ];

  componentDidMount() {
    const { match, history, product } = this.props;

    const productId = match.params.id;
    if (!productId) {
      history.replace('/not-found');
    }
    // send request to server if different from the stored product id was supplied to component
    if (product.id !== productId) {
      this.props.getProduct(productId);
    }

    // imageURLs were separated from original model for sample purposes
    //  my-json-server.typicode.com char limit 10000 has been reached thus URLs data couldn't be placed there
    const imageURLs = getProductImageURLs(productId);
    this.setState({ imageURLs });
  }

  getInfo = (item, path) => _.get(item, path);

  renderFieldInfo = (field) => {
    const { currentCurrency, product } = this.props;

    let fieldInfo = null;
    if (!field.content) {
      fieldInfo = this.getInfo(product, field.path);
    } else {
      fieldInfo = field.content(product, currentCurrency.name);
    }
    return <InformationItem key={field.label} label={field.label} info={fieldInfo} />;
  };

  renderSpinner = () => <Spinner />;

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
  currentCurrency: PropTypes.shape({ name: PropTypes.string }).isRequired,
  product: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    category: PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }),
    description: PropTypes.string,
    producer: PropTypes.string,
    price: PropTypes.shape({ BYN: PropTypes.number, USD: PropTypes.number }),
  }).isRequired,
  isProductLoading: PropTypes.bool.isRequired,
  hasProductLoadingFailed: PropTypes.bool,
  errorWhileLoading: PropTypes.string,
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) }).isRequired,
  history: PropTypes.shape({ replace: PropTypes.func }).isRequired,
  addToCart: PropTypes.func.isRequired,
  getProduct: PropTypes.func.isRequired,
};

ProductDetails.defaultProps = {
  hasProductLoadingFailed: false,
  errorWhileLoading: '',
};

const mapStateToProps = state => ({
  currentCurrency: state.currency.currentCurrency,
  product: state.products.currentProduct,
  isProductLoading: state.products.currentProductStatus.isGettingByIdInProcess,
  hasProductLoadingFailed: state.products.currentProductStatus.hasGettingByIdFailed,
  errorWhileLoading: state.products.currentProductStatus.error,
});

const mapDispatchToProps = {
  addToCart,
  getProduct,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductDetails);
