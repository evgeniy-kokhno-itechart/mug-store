import React from 'react';
import Joi from 'joi-browser';
import { PropTypes } from 'prop-types';
import Form from '../../shared/form';
import { getCategories } from '../../services/categoriesService';
import { getProduct, saveProduct } from '../../services/productsService';
import { getCurrencies } from '../../services/payService';

class ProductForm extends Form {
  state = {
    data: {
      title: '',
      imageURL: '',
      description: '',
      categoryId: '1',
      discount: '',
      producer: '',
      rate: '',
    },
    categories: [],
    currencies: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
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

  constructor() {
    super();
    const currencies = getCurrencies();
    currencies.forEach(
      currency => (this.schema[`price.${currency.name}`] = Joi.number()
        .required()
        .label(`Price, ${currency.name}`)),
    );
    this.state.currencies = currencies;

    const currNames = currencies.map(curr => curr.name);
    const obj = {};
    currNames.forEach(name => (obj[`price.${name}`] = ''));
    Object.assign(this.state.data, obj);
  }

  componentDidMount() {
    const categories = getCategories();
    this.setState({ categories });
    const productId = this.props.match.params.id;

    if (productId === 'new') {
      return;
    }

    const product = getProduct(productId);
    if (!product) {
      this.props.history.replace('/not-found');
    }
    this.setState({ data: this.mapToViewModel(product) });
  }

  mapToViewModel(product) {
    const currNames = this.state.currencies.map(curr => curr.name);
    const obj = {};
    const dataForReturn = {
      _id: product._id,
      title: product.title,
      imageURL: product.imageURL,
      description: product.description,
      categoryId: product.category._id,
      discount: product.discount,
      producer: product.producer,
      publishDate: product.publishDate,
      rate: product.rate,
    };

    currNames.forEach(name => (obj[`price.${name}`] = product.price[name]));
    Object.assign(dataForReturn, obj);
    return dataForReturn;
  }

  mapFromViewModel(data) {
    const { currencies } = this.state;
    const currNames = currencies.map(curr => curr.name);
    return {
      _id: data._id,
      title: data.title,
      imageURL: data.imageURL,
      description: data.description,
      categoryId: data.categoryId,
      price: currNames.reduce((result, currentItem) => {
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
    const product = this.mapFromViewModel(this.state.data);
    saveProduct(product);
    this.props.history.push('/catalog');
  };

  render() {
    return (
      <React.Fragment>
        <h1 className="text-center m-3">Product Info</h1>
        <form className="col-10 col-md-8 col-lg-7 col-xl-5 mx-auto" onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderInput('imageURL', 'Image URL')}
          {this.renderTextArea('description', 'Details')}
          {this.renderDropdown('categoryId', 'Category', this.state.categories)}

          {this.state.currencies.map(currency => this.renderInput(`price.${currency.name}`, `Price, ${currency.name}`))}

          {this.renderInput('discount', 'Dicount, %')}
          {this.renderInput('producer', 'Producer')}
          {this.renderInput('rate', 'Rate')}
          {this.renderButton('Save', 'w-100')}
        </form>
      </React.Fragment>
    );
  }
}

ProductForm.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) }),
  history: PropTypes.shape({ replace: PropTypes.func, push: PropTypes.func }).isRequired,
};

ProductForm.defaultProps = {
  match: { params: { id: '' } },
};

export default ProductForm;
