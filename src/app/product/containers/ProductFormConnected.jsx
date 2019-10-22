import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { productsActions } from '../ProductsActions';
import { productCostSelector } from '../ProductsSelectors';
import { FormBase, Spinner, ErrorMessage } from '../../shared';
import ProductForm from '../components/ProductForm/ProductForm';
import { CurrencyService } from '../../currency';


export class ProductFormConnected extends FormBase {
  // define state and componentDidUpdate to avoid direct mapping props to child when productId is "new"
  // and componentWillUnmount wasn't called so clearCurrentProductInfo wasn't call as well
  state = { data: {} }

  componentDidMount() {
    const productId = this.props.match.params.id;
    if (productId === 'new') {
      return;
    }

    this.props.getProduct(productId);
  }

  componentDidUpdate(prevProps, prevState) {
    const { productState } = this.props;

    if (prevState.data.id !== productState.product.id) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ data: this.mapToViewModel(this.props.productState.product) });
    }
  }

  displayIsLoading = () => {
    const { productState } = this.props;
    if (productState.loadingStatus.isInProcess || productState.savingStatus.isInProcess) {
      return <Spinner spinnerClasses="spinner--medium" wrapperClasses="mt-5" />;
    }
    return null;
  }

  displayGotError = () => {
    const { productState } = this.props;
    if (productState.loadingStatus.hasFailed || productState.savingStatus.hasFailed) {
      return <ErrorMessage message={productState.loadingStatus.error || productState.savingStatus.error} />;
    }
    return null;
  }

  handleSubmit = (productViewModel) => {
    const product = this.mapFromViewModel(productViewModel);
    this.props.saveProduct({ product, redirectUrl: '/catalog' });
  };

  mapToViewModel(product) {
    return {
      id: product.id,
      title: product.title,
      imageURL: product.imageURL,
      description: product.description,
      categoryId: product.category.id,
      currentCurrencyPrice: product.currentCurrencyPrice,
      discount: product.discount,
      producer: product.producer,
      publishDate: product.publishDate,
      rate: product.rate,
    };
  }

  mapFromViewModel(data) {
    return {
      id: data.id,
      title: data.title,
      imageURL: data.imageURL,
      description: data.description,
      category: this.props.categories.find(category => category.id === data.categoryId),
      basePrice: CurrencyService.getBasePrice(data.currentCurrencyPrice, this.props.currentCurrency.rate),
      discount: data.discount,
      producer: data.producer,
      rate: data.rate,
    };
  }

  renderForm = () => {
    const { categories, currentCurrency } = this.props;
    return (
      <ProductForm
        currentCurrencyName={currentCurrency.name}
        categories={categories}
        product={this.state.data}
        onSubmit={this.handleSubmit}
      />
    );
  };

  render() {
    return this.displayIsLoading() || this.displayGotError() || this.renderForm();
  }
}

ProductFormConnected.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) }),

  currentCurrency: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    rate: PropTypes.number,
  }).isRequired,

  categories: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, name: PropTypes.string })).isRequired,

  productState: PropTypes.shape({
    product: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      imageURL: PropTypes.string.isRequired,
      category: PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }),
      description: PropTypes.string,
      producer: PropTypes.string,
      discount: PropTypes.number,
      currentCurrencyPrice: PropTypes.number,
      rate: PropTypes.string,
    }),
    loadingStatus: PropTypes.shape({
      isInProcess: PropTypes.bool,
      hasFailed: PropTypes.bool,
      error: PropTypes.string,
    }),
    savingStatus: PropTypes.shape({
      isInProcess: PropTypes.bool,
      hasFailed: PropTypes.bool,
      error: PropTypes.string,
    }),
  }),

  getProduct: PropTypes.func.isRequired,
  saveProduct: PropTypes.func.isRequired,
};

ProductFormConnected.defaultProps = {
  categories: [],
  match: { params: { id: '' } },

  productState: {
    product: {
      id: '',
      imageURL: '',
      title: 'defaultProduct',
      description: '',
      category: {},
      currentCurrencyPrice: 0,
      discount: 0,
      producer: '',
      rate: '',
    },
    loadingStatus: {
      isInProcess: true,
      hasFailed: false,
      error: '',
    },
    savingStatus: {
      isInProcess: true,
      hasFailed: false,
      error: '',
    },
  },
};

const mapStateToProps = state => ({
  currentCurrency: state.currency.currentCurrency,
  categories: state.category.categories,

  productState: {
    product: productCostSelector(state),
    loadingStatus: state.products.currentProductStatus,
    savingStatus: state.products.savingStatus,
  },
});

const mapDispatchToProps = {
  getProduct: productsActions.GetProduct.InitiateApiCall,
  saveProduct: productsActions.SaveProduct.InitiateApiCall,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductFormConnected);
