/* eslint-disable no-nested-ternary */
import React from 'react';
import Joi from 'joi-browser';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Form from '../../shared/form';
import { getCategories } from '../../catalog/categories-redux-state/categoryActions';
import { getCurrencies } from '../../catalog/currency-redux-state/currencyActions';
import { getProduct, saveProduct } from '../productsActions';
import Spinner from '../../shared/markup-usage/spinner';
import ErrorMessage from '../../shared/markup-usage/errorMessage';

class ProductForm extends Form {
  state = {
    data: {
      title: '',
      imageURL: '',
      description: '',
      categoryId: '',
      discount: '',
      producer: '',
      price: {},
      rate: '',
    },
    // categories: [],
    // currencies: [],
    errors: {},
  };

  schema = {
    id: Joi.string(),
    imageURL: Joi.string()
      .min(5)
      .label('Image URL'),
    title: Joi.string()
      .required()
      .min(3)
      .label('Title'),
    description: Joi.string()
      .max(500)
      .label('Details'),
    categoryId: Joi.string()
      .required()
      .label('Category'),
    discount: Joi.number()
      .min(0)
      .max(100)
      .label('Discount, %'),
    producer: Joi.string()
      .required()
      .min(5)
      .label('Producer'),
    publishDate: Joi.date(),
    rate: Joi.number()
      .required()
      .min(0)
      .max(5)
      .label('Rate'),
  };

  // constructor() {
  //   super();
  //   const { currencies } = this.props;
  //   currencies.forEach(
  //     currency => (this.schema[`price.${currency.name}`] = Joi.number()
  //       .required()
  //       .label(`Price, ${currency.name}`)),
  //   );
  //   // this.state.currencies = currencies;

  //   const currNames = currencies.map(curr => curr.name);
  //   const obj = {};
  //   currNames.forEach(name => (obj[`price.${name}`] = ''));
  //   Object.assign(this.state.data, obj);
  // }

  componentDidMount() {
    const {
      // eslint-disable-next-line no-shadow
      currencies, product, getProduct, hasProductLoadingFailed, errorWhileProductLoading,
    } = this.props;
    // if (currencies.length === 0) {
    //   this.props.getCurrencies();
    // }
    // if (categories.length === 0) {
    //   this.props.getCategories();
    // }

    currencies.forEach(
      currency => (this.schema[`price.${currency.name}`] = Joi.number()
        .required()
        .label(`Price, ${currency.name}`)),
    );

    const currencyNames = currencies.map(c => c.name);
    const pricesAsObject = {};
    currencyNames.forEach(name => (pricesAsObject[`price.${name}`] = ''));
    Object.assign(this.state.data, pricesAsObject);

    const productId = this.props.match.params.id;
    if (productId === 'new') {
      return;
    }

    if (product.id !== productId) {
      getProduct(productId);
    }
    if (hasProductLoadingFailed) {
      this.props.history.replace('/not-found');
      // eslint-disable-next-line no-console
      console.error('Error occurred while product loading:', errorWhileProductLoading);
    }
    this.setState({ data: this.mapToViewModel(this.props.product) });
  }

  mapToViewModel(product) {
    const currencyNames = this.props.currencies.map(currency => currency.name);
    const pricesAsObject = {};
    const dataForReturn = {
      id: product.id,
      title: product.title,
      imageURL: product.imageURL,
      description: product.description,
      categoryId: product.category.id,
      discount: product.discount,
      producer: product.producer,
      publishDate: product.publishDate,
      rate: product.rate,
    };

    if (this.props.isProductLoading) {
      currencyNames.forEach((name) => {
        console.log('product', product);
        return pricesAsObject[`price.${name}`] = product.price[name];
      });
      Object.assign(dataForReturn, pricesAsObject);
    }
    return dataForReturn;
  }

  mapFromViewModel(data) {
    const { currencies } = this.props;
    const currencyNames = currencies.map(currency => currency.name);
    return {
      id: data.id,
      title: data.title,
      imageURL: data.imageURL,
      description: data.description,
      categoryId: data.categoryId,
      price: currencyNames.reduce((result, currentItem) => {
        // eslint-disable-next-line no-param-reassign
        result[currentItem] = data[`price.${currentItem}`];
        return result;
      }, {}),
      discount: data.discount,
      producer: data.producer,
      rate: data.rate,
    };
  }

  doSubmit = () => {
    // eslint-disable-next-line no-shadow
    const { isSavingInProcess, hasSavingFailed, saveProduct } = this.props;
    const product = this.mapFromViewModel(this.state.data);
    saveProduct(product);

    // redirect will occurr if save is completed successfullyly
    if (!isSavingInProcess && !hasSavingFailed) {
      this.props.history.push('/catalog');
    }
  };

  renderForm = () => (
    <React.Fragment>
      <h1 className="text-center m-3">Product Info</h1>
      <form className="col-10 col-md-8 col-lg-7 col-xl-5 mx-auto" onSubmit={this.handleSubmit}>
        {this.renderInput('title', 'Title')}
        {this.renderInput('imageURL', 'Image URL')}
        {this.renderTextArea('description', 'Details')}
        {this.renderDropdown('categoryId', 'Category', this.props.categories)}

        {this.props.currencies.map(currency => this.renderInput(`price.${currency.name}`, `Price, ${currency.name}`))}

        {this.renderInput('discount', 'Dicount, %')}
        {this.renderInput('producer', 'Producer')}
        {this.renderInput('rate', 'Rate')}
        {this.renderButton('Save', 'w-100')}
      </form>
    </React.Fragment>
  );

  render() {
    const {
      isProductLoading, hasProductLoadingFailed, errorWhileProductLoading, isSavingInProcess, hasSavingFailed, errorWhileProductSaving,
    } = this.props;
    return (
      (isProductLoading || isSavingInProcess)
        ? <Spinner sizeInRems='5' />
        : (hasProductLoadingFailed || hasSavingFailed)
          ? <ErrorMessage message={errorWhileProductLoading || errorWhileProductSaving} />
          : this.renderForm()
    );
  }
}

ProductForm.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) }),
  history: PropTypes.shape({ replace: PropTypes.func, push: PropTypes.func }).isRequired,

  currencies: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, name: PropTypes.string })),
  getCurrencies: PropTypes.func.isRequired,

  categories: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, name: PropTypes.string })),
  getCategories: PropTypes.func.isRequired,

  product: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    imageURL: PropTypes.string.isRequired,
    category: PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }),
    description: PropTypes.string,
    producer: PropTypes.string,
    discount: PropTypes.number,
    price: PropTypes.object,
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
};

ProductForm.defaultProps = {
  currencies: [],
  categories: [],
  match: { params: { id: '' } },

  isProductLoading: true,
  hasProductLoadingFailed: false,
  errorWhileProductLoading: '',

  isSavingInProcess: true,
  hasSavingFailed: false,
  errorWhileProductSaving: '',
};

const mapStateToProps = state => ({
  currencies: state.currency.currencies,
  categories: state.category.categories,

  product: state.products.currentProduct,

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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductForm);
