import React from 'react';
import * as Yup from 'yup';
import _ from 'lodash';
import { PropTypes } from 'prop-types';
import {
  FormBase, Input, TextArea, Dropdown,
} from '../../shared';


class ProductForm extends FormBase {
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

  objectSchema = {
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
    if (this.props.product.id) {
      this.setState({ data: this.props.product });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validateForm();
    this.setState({ errors: errors || {} });
    if (errors) {
      return;
    }
    this.props.onSubmit(this.state.data);
  };

  render() {
    const { data, errors } = this.state;
    const { categories, currentCurrencyName } = this.props;

    return (
      <React.Fragment>
        <h1 className="text-center m-3">Product Info</h1>
        <form className="col-10 col-md-8 col-lg-7 col-xl-5 mx-auto" onSubmit={this.handleSubmit}>
          <Input
            type="text"
            name="title"
            label="Title"
            value={data.title}
            error={errors.title}
            validationSchema={this.objectSchema.title}
            onChange={this.handleControlChange}
          />

          <Input
            type="text"
            name="imageURL"
            label="Image URL"
            value={_.get(data, 'imageURL')}
            error={errors.imageURL}
            validationSchema={this.objectSchema.imageURL}
            onChange={this.handleControlChange}
          />

          <TextArea
            name="description"
            label="Details"
            value={data.description}
            error={errors.description}
            validationSchema={this.objectSchema.description}
            onChange={this.handleControlChange}
          />

          <Dropdown
            name="categoryId"
            label="Category"
            options={categories}
            value={data.categoryId}
            error={errors.categoryId}
            defaultText="Please choose..."
            selectClasses="form-control"
            validationSchema={this.objectSchema.categoryId}
            onChange={this.handleControlChange}
          />

          <Input
            type="text"
            name="currentCurrencyPrice"
            label={`Price, ${currentCurrencyName}`}
            value={_.get(data, 'currentCurrencyPrice')}
            error={errors.currentCurrencyPrice}
            validationSchema={this.objectSchema.currentCurrencyPrice}
            onChange={this.handleControlChange}
          />

          <Input
            type="text"
            name="discount"
            label="Dicount, %"
            value={_.get(data, 'discount')}
            error={errors.discount}
            validationSchema={this.objectSchema.discount}
            onChange={this.handleControlChange}
          />

          <Input
            type="text"
            name="producer"
            label="Producer"
            value={_.get(data, 'producer')}
            error={errors.producer}
            validationSchema={this.objectSchema.producer}
            onChange={this.handleControlChange}
          />

          <Input
            type="text"
            name="rate"
            label="Rate"
            value={_.get(data, 'rate')}
            error={errors.rate}
            validationSchema={this.objectSchema.rate}
            onChange={this.handleControlChange}
          />

          <button type="submit" disabled={this.validateForm(this.objectSchema, data)} className="btn btn-secondary w-100">
            Save
          </button>
        </form>
      </React.Fragment>
    );
  }
}

ProductForm.propTypes = {
  currentCurrencyName: PropTypes.string.isRequired,

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

  onSubmit: PropTypes.func.isRequired,
};

ProductForm.defaultProps = {
  categories: [],

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
};

export default ProductForm;
