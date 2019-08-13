import React, { Component } from 'react';
import * as Yup from 'yup';
import _ from 'lodash';
import { PropTypes } from 'prop-types';
import Input from '../../shared/controls/Input';
import TextArea from '../../shared/controls/TextArea';
import FormService from '../../services/general/formService';

class OrderForm extends Component {
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
      this.setState({
        data: this.mapToViewModel(this.props.currentUser),
      });
    }
  }

  handleChange = (e) => {
    const { currentTarget: input } = e;

    // null stands for matchedInputName
    this.setState(prevState => FormService.handleChange(input, null, prevState, this.orderFormSchema));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onOrderSubmit('/orderconfirm');
    // this.props.routeReplace('/orderconfirm'); // this.props.routeHistory.replace('/orderconfirm');
  };

  mapToViewModel({
    name, country, city, address, phone,
  }) {
    return {
      name,
      country,
      city,
      address,
      phone,
    };
  }

  render() {
    const { data, errors } = this.state;
    return (
      <React.Fragment>
        <p>Please fill out the form to continue</p>
        <form onSubmit={this.handleSubmit}>
          <Input type="text" name="name" label="Name" value={_.get(data, 'name')} error={errors.name} onChange={this.handleChange} />

          <Input
            type="text"
            name="country"
            label="Country"
            value={_.get(data, 'country')}
            error={errors.country}
            onChange={this.handleChange}
          />

          <Input type="text" name="city" label="City" value={_.get(data, 'city')} error={errors.city} onChange={this.handleChange} />

          <Input
            type="text"
            name="address"
            label="Address"
            value={_.get(data, 'address')}
            error={errors.address}
            onChange={this.handleChange}
          />

          <Input type="text" name="phone" label="Phone" value={_.get(data, 'phone')} error={errors.phone} onChange={this.handleChange} />

          <TextArea name="comment" label="Comment" value={data.comment} error={errors.comment} onChange={this.handleChange} />

          <button
            type="submit"
            disabled={FormService.validateForm(this.orderFormSchema, data)}
            className="btn btn-secondary d-block mx-auto mx-md-0"
          >
            Submit Order
          </button>
        </form>
      </React.Fragment>
    );
  }
}

OrderForm.propTypes = {
  currentUser: PropTypes.shape({ name: PropTypes.string }),
  onOrderSubmit: PropTypes.func.isRequired,
};

OrderForm.defaultProps = {
  currentUser: {},
};

export default OrderForm;
