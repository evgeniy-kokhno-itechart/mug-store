/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import * as Yup from 'yup';
import _ from 'lodash';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getCategories } from '../../catalog/categories-redux-state/categoryActions';
import { getCurrencies } from '../../catalog/currency-redux-state/currencyActions';
import { getProduct, saveProduct, clearCurrentProductInfo } from '../productsActions';
import FormService from '../../services/general/formService';
import Input from '../../shared/controls/Input';
import Spinner from '../../shared/markup-usage/Spinner';
import ErrorMessage from '../../shared/markup-usage/ErrorMessage';
import TextArea from '../../shared/controls/TextArea';
import Dropdown from '../../shared/controls/Dropdown';
import { productCostSelector } from '../productsSelectors';
import '../../styles/ProductForm.css';

export class ProductForm extends Component {
  state = {
    data: {
      id: '',
      title: '',
      imageURL: '',
      description: '',
      categoryId: '',
      discount: 0,
      producer: '',
      currentCurrencyPrice: 0,
      rate: 0,
    },
    errors: {},
  };

  productObjectSchema = {
    id: Yup.string(),
    imageURL: Yup.string()
      .min(5)
      .label('Image URL'),
    title: Yup.string()
      .required()
      .min(3)
      .label('Title'),
    description: Yup.string()
      .required()
      .max(500)
      .label('Details'),
    categoryId: Yup.number()
      .typeError('Please choose category')
      .required()
      .label('Category'),
    currentCurrencyPrice: Yup.number()
      .typeError('Please enter a valid number')
      .required()
      .moreThan(0)
      .label('Price'),
    discount: Yup.number()
      .typeError('Please enter a valid number')
      .min(0)
      .max(100)
      .label('Discount, %'),
    producer: Yup.string()
      .required()
      .min(5)
      .label('Producer'),
    publishDate: Yup.date(),
    rate: Yup.number()
      .typeError('Please enter a valid number')
      .required()
      .min(0)
      .max(5)
      .label('Rate'),
  };

  componentDidMount() {
    const productId = this.props.match.params.id;
    if (productId === 'new') {
      return;
    }

    this.props.getProduct(productId);
  }

  componentDidUpdate(prevProps, prevState) {
    const { product, currentCurrency } = this.props;

    if (currentCurrency !== prevProps.currentCurrency) {
      const changedData = { ...prevState.data };
      changedData.currentCurrencyPrice = product.currentCurrencyPrice;
      this.setState({ data: changedData });
    }

    if (product.id !== prevState.data.id) {
      this.setState({ data: this.mapToViewModel(this.props.product) });
    }
  }

  componentWillUnmount() {
    this.props.clearCurrentProductInfo();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = FormService.validateForm(this.productObjectSchema, this.state.data);
    this.setState({ errors: errors || {} });
    if (errors) return;

    // eslint-disable-next-line no-shadow
    const { saveProduct } = this.props;
    const product = this.mapFromViewModel(this.state.data);
    saveProduct(product, '/catalog');
  };

  handleChange = (e, matchedInputName) => {
    const { target: input } = e;

    this.setState(prevState => FormService.handleChange(input, matchedInputName, prevState, this.productObjectSchema));
  };

  mapToViewModel(product) {
    const dataForReturn = {
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
    return dataForReturn;
  }

  mapFromViewModel(data) {
    return {
      id: data.id,
      title: data.title,
      imageURL: data.imageURL,
      description: data.description,
      category: this.props.categories.find(category => category.id === data.categoryId),
      basePrice: data.currentCurrencyPrice / this.props.currentCurrency.rate,
      discount: data.discount,
      producer: data.producer,
      rate: data.rate,
    };
  }

  renderForm = () => {
    const { data, errors } = this.state;
    const { categories, currentCurrency } = this.props;

    return (
      <React.Fragment>
        <h1 className="text-center m-3">Product Info</h1>
        <form className="col-10 col-md-8 col-lg-7 col-xl-5 mx-auto" onSubmit={this.handleSubmit}>
          <Input
            type="text"
            name="title"
            label="Title"
            value={_.get(data, 'title')}
            error={errors.title}
            onValueChange={this.handleChange}
          />

          <Input
            type="text"
            name="imageURL"
            label="Image URL"
            value={_.get(data, 'imageURL')}
            error={errors.imageURL}
            onValueChange={this.handleChange}
          />

          <TextArea
            name="description"
            label="Details"
            value={data.description}
            error={errors.description}
            onValueChange={this.handleChange}
          />

          <Dropdown
            name="categoryId"
            label="Category"
            options={categories}
            value={data.categoryId}
            error={errors.categoryId}
            defaultText="Please choose..."
            onValueChange={this.handleChange}
          />

          <Input
            type="text"
            name="currentCurrencyPrice"
            label={`Price, ${currentCurrency.name}`}
            value={_.get(data, 'currentCurrencyPrice')}
            error={errors.currentCurrencyPrice}
            onValueChange={this.handleChange}
          />

          <Input
            type="text"
            name="discount"
            label="Dicount, %"
            value={_.get(data, 'discount')}
            error={errors.discount}
            onValueChange={this.handleChange}
          />

          <Input
            type="text"
            name="producer"
            label="Producer"
            value={_.get(data, 'producer')}
            error={errors.producer}
            onValueChange={this.handleChange}
          />

          <Input type="text" name="rate" label="Rate" value={_.get(data, 'rate')} error={errors.rate} onValueChange={this.handleChange} />

          <button type="submit" disabled={FormService.validateForm(this.productObjectSchema, data)} className="btn btn-secondary w-100">
            Save
          </button>
        </form>
      </React.Fragment>
    );
  };

  render() {
    const {
      isProductLoading,
      hasProductLoadingFailed,
      errorWhileProductLoading,
      isSavingInProcess,
      hasSavingFailed,
      errorWhileProductSaving,
    } = this.props;
    return isProductLoading || isSavingInProcess ? (
      <Spinner customSizeClassName="product-form__spinner" marginBootstrapClassName="mt-5" />
    ) : hasProductLoadingFailed || hasSavingFailed ? (
      <ErrorMessage message={errorWhileProductSaving || errorWhileProductLoading} />
    ) : (
      this.renderForm()
    );
  }
}

ProductForm.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) }),

  currentCurrency: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    rate: PropTypes.number,
  }).isRequired,

  categories: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, name: PropTypes.string })),

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

  getProduct: PropTypes.func.isRequired,
  isProductLoading: PropTypes.bool,
  hasProductLoadingFailed: PropTypes.bool,
  errorWhileProductLoading: PropTypes.string,

  saveProduct: PropTypes.func.isRequired,
  isSavingInProcess: PropTypes.bool,
  hasSavingFailed: PropTypes.bool,
  errorWhileProductSaving: PropTypes.string,

  clearCurrentProductInfo: PropTypes.func.isRequired,
};

ProductForm.defaultProps = {
  categories: [],
  match: { params: { id: '' } },

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

  isProductLoading: true,
  hasProductLoadingFailed: false,
  errorWhileProductLoading: '',

  isSavingInProcess: true,
  hasSavingFailed: false,
  errorWhileProductSaving: '',
};

const mapStateToProps = state => ({
  currentCurrency: state.currency.currentCurrency,
  currencies: state.currency.currencies,
  categories: state.category.categories,

  product: productCostSelector(state),

  isProductLoading: state.products.currentProductStatus.isGettingByIdInProcess,
  hasProductLoadingFailed: state.products.currentProductStatus.hasGettingByIdFailed,
  errorWhileProductLoading: state.products.currentProductStatus.error,

  isSavingInProcess: state.products.savingStatus.isSavingInProcess,
  hasSavingFailed: state.products.savingStatus.hasSavingFailed,
  errorWhileProductSaving: state.products.savingStatus.error,
});

const mapDispatchToProps = {
  getCurrencies,
  getCategories,
  getProduct,
  saveProduct,
  clearCurrentProductInfo,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductForm);
