import React from 'react';
import * as Yup from 'yup';
import _ from 'lodash';
import { PropTypes } from 'prop-types';
import { Input, TextArea, FormBase } from '../../shared';

class OrderForm extends FormBase {
  state = {
    data: {
      name: '',
      country: '',
      city: '',
      address: '',
      phone: '',
      comment: '',
    },
    errors: {},
  };

  orderFormSchema = {
    name: Yup.string()
      .required()
      .max(100)
      .label('Name'),
    country: Yup.string()
      .required()
      .max(100)
      .label('Country'),
    city: Yup.string()
      .required()
      .max(100)
      .label('City'),
    address: Yup.string()
      .required()
      .max(250)
      .label('Address'),
    phone: Yup.string()
      .required()
      .min(12)
      .max(17)
      .label('Phone'),
    comment: Yup.string().label('Comment'),
  };

  componentDidMount() {
    if (this.props.currentUser.name) {
      this.setState({ data: this.props.currentUser });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit();
  };

  render() {
    const { data, errors } = this.state;
    return (
      <React.Fragment>
        <p>Please fill out the form to continue</p>
        <form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            name="name"
            label="Name"
            value={_.get(data, 'name')}
            error={errors.name}
            validationSchema={this.orderFormSchema.name}
            onChange={this.handleControlChange}
          />

          <Input
            type="text"
            name="country"
            label="Country"
            value={_.get(data, 'country')}
            error={errors.country}
            validationSchema={this.orderFormSchema.country}
            onChange={this.handleControlChange}
          />

          <Input
            type="text"
            name="city"
            label="City"
            value={_.get(data, 'city')}
            error={errors.city}
            validationSchema={this.orderFormSchema.city}
            onChange={this.handleControlChange}
          />

          <Input
            type="text"
            name="address"
            label="Address"
            value={_.get(data, 'address')}
            error={errors.address}
            validationSchema={this.orderFormSchema.address}
            onChange={this.handleControlChange}
          />

          <Input
            type="text"
            name="phone"
            label="Phone"
            value={_.get(data, 'phone')}
            error={errors.phone}
            validationSchema={this.orderFormSchema.phone}
            onChange={this.handleControlChange}
          />

          <TextArea
            name="comment"
            label="Comment"
            value={data.comment}
            error={errors.comment}
            validationSchema={this.orderFormSchema.comment}
            onChange={this.handleControlChange}
          />

          <button type="submit" disabled={this.validateForm(this.orderFormSchema)} className="btn btn-secondary d-block mx-auto mx-md-0">
            Submit Order
          </button>
        </form>
      </React.Fragment>
    );
  }
}

OrderForm.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.string),
    username: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
};

OrderForm.defaultProps = {
  currentUser: {},
};

export default OrderForm;
