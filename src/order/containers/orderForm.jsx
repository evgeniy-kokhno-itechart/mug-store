import React from 'react';
import Joi from 'joi-browser';
import Form from '../../shared/form';

class OrderForm extends Form {
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

  schema = {
    name: Joi.string()
      .required()
      .max(100)
      .label('Name'),
    country: Joi.string()
      .required()
      .max(100)
      .label('Country'),
    city: Joi.string()
      .required()
      .max(100)
      .label('City'),
    address: Joi.string()
      .required()
      .max(250)
      .label('Address'),
    phone: Joi.string()
      .required()
      .min(12)
      .max(17)
      .label('Phone'),
    comment: Joi.any().label('Comment'),
  };

  componentDidMount() {
    if (this.props.currentUser.name) {
      this.setState({
        data: this.mapToViewModel(this.props.currentUser),
      });
    }
  }

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

  doSubmit = () => this.props.routeHistory.replace('/orderconfirm');

  render() {
    return (
      <React.Fragment>
        <p>Please fill out the form to continue</p>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('name', 'Name')}
          {this.renderInput('country', 'Country')}
          {this.renderInput('city', 'City')}
          {this.renderInput('address', 'Address')}
          {this.renderInput('phone', 'Phone')}
          {this.renderTextArea('comment', 'Comment')}
          {this.renderButton('Submit Order', 'd-block mx-auto mx-md-0')}
        </form>
      </React.Fragment>
    );
  }
}

export default OrderForm;
