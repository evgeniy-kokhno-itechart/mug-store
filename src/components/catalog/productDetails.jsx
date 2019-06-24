import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import _ from 'lodash';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropTypes } from 'prop-types';
import { getProduct } from '../../services/productsService';
import getProductImageURLs from '../../services/imageService';
import InformationItem from '../common/informationItem';
import * as actionTypes from '../../store/actions';

class ProductDetails extends Component {
  state = {
    product: {
      _id: '',
      imageURLs: [],
      title: '',
      description: '',
      category: {},
      prices: [{ value: '', currencyName: '' }],
      discount: '0',
      producer: '',
      rate: '',
    },
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
    const { match, history } = this.props;

    const productId = match.params.id;
    const product = getProduct(productId);
    if (!product) {
      history.replace('/not-found');
    }
    const imageURLs = getProductImageURLs(productId);
    this.setState({ product, imageURLs });
  }

  getInfo = (item, path) => _.get(item, path);

  renderFieldInfo = (field) => {
    const { currentCurrency } = this.props;
    const { product } = this.state;

    let fieldInfo = null;
    if (!field.content) {
      fieldInfo = this.getInfo(product, field.path);
    } else {
      fieldInfo = field.content(product, currentCurrency.name);
    }
    return <InformationItem key={field.label} label={field.label} info={fieldInfo} />;
  };

  render() {
    const { imageURLs, product } = this.state;
    const { onBuyNow } = this.props;

    return (
      <React.Fragment>
        <h2 className="text-center m-3">
          {product.title}
          Details
        </h2>
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
          <Link className="btn btn-secondary" to="/catalog">
            Back To Catalog
          </Link>
          <button type="button" className="btn btn-secondary ml-auto" onClick={() => onBuyNow(product, 1)}>
            <FontAwesomeIcon icon="cart-arrow-down" />
          </button>
        </div>
      </React.Fragment>
    );
  }
}

ProductDetails.propTypes = {
  currentCurrency: PropTypes.shape({ name: PropTypes.string }).isRequired,
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) }).isRequired,
  history: PropTypes.shape({ replace: PropTypes.func }).isRequired,
  onBuyNow: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ currentCurrency: state.currencyState.currentCurrency });

const mapDispatchToProps = dispatch => ({
  onBuyNow: (product, quantity) => dispatch({ type: actionTypes.ADD_TO_CART, cart: { product, quantity } }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductDetails);
