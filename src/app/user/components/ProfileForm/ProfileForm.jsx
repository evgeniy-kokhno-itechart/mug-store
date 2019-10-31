import React from 'react';
import * as Yup from 'yup';
import _ from 'lodash';
import { PropTypes } from 'prop-types';
import { FormBase, Input } from '../../../shared';
import './ProfileForm.scss';

class ProfileForm extends FormBase {
  state = {
    data: {
      id: '',
      username: '',
      name: '',
      country: '',
      city: '',
      address: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    errors: {},
  };

  profileObjectSchema = {
    id: Yup.string(),
    username: Yup.string()
      .email()
      .required()
      .max(100)
      .label('Username'),
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
    password: Yup.string()
      .required()
      .min(5)
      .max(200)
      .label('Password'),
    confirmPassword: Yup.string()
      .required()
      .min(5)
      .max(200)
      .label('Confirm Password'),
  };

  componentDidMount() {
    const { user } = this.props;
    if (user.name) {
      this.setState({ data: { ...user, password: '', confirmPassword: '' } });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    try {
      this.props.onSubmit(this.state.data);
    } catch (ex) {
      this.setState((prevState) => {
        const errors = { ...prevState.errors, ...{ confirmPassword: ex.message } };
        return { errors };
      });
    }
  };

  render() {
    const { data, errors } = this.state;
    return (
      <div className="profile-form">
        <h1 className="profile-form__header">{this.props.user.name ? 'Edit profile' : 'Register'}</h1>
        <form className="profile-form__content" onSubmit={this.handleSubmit}>
          <Input
            type="text"
            name="username"
            label="Username (a valid E-mail)"
            value={_.get(data, 'username')}
            error={errors.username}
            validationSchema={this.profileObjectSchema.username}
            onChange={this.handleControlChange}
          />

          <Input
            type="text"
            name="name"
            label="Name"
            value={_.get(data, 'name')}
            error={errors.name}
            validationSchema={this.profileObjectSchema.name}
            onChange={this.handleControlChange}
          />

          <Input
            type="text"
            name="country"
            label="Country"
            value={_.get(data, 'country')}
            error={errors.country}
            validationSchema={this.profileObjectSchema.country}
            onChange={this.handleControlChange}
          />

          <Input
            type="text"
            name="city"
            label="City"
            value={_.get(data, 'city')}
            error={errors.city}
            validationSchema={this.profileObjectSchema.city}
            onChange={this.handleControlChange}
          />

          <Input
            type="text"
            name="address"
            label="Address"
            value={_.get(data, 'address')}
            error={errors.address}
            validationSchema={this.profileObjectSchema.address}
            onChange={this.handleControlChange}
          />

          <Input
            type="text"
            name="phone"
            label="Phone"
            value={_.get(data, 'phone')}
            error={errors.phone}
            validationSchema={this.profileObjectSchema.phone}
            onChange={this.handleControlChange}
          />

          <Input
            type="password"
            name="password"
            label="Password"
            value={_.get(data, 'password')}
            error={errors.password}
            validationSchema={this.profileObjectSchema.password}
            onChange={this.handleControlChange}
          />

          <Input
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            value={_.get(data, 'confirmPassword')}
            error={errors.confirmPassword}
            validationSchema={this.profileObjectSchema.confirmPassword}
            matchedInput={{ name: 'Password', value: this.state.data.password }}
            onChange={this.handleControlChange}
          />

          <button
            type="submit"
            disabled={this.validateForm(this.profileObjectSchema, data)}
            className="button button--solid profile-form-button"
          >
            Save
          </button>
        </form>
      </div>
    );
  }
}

ProfileForm.propTypes = {
  user: PropTypes.shape({
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

ProfileForm.defaultProps = {
  user: {},
};

export default ProfileForm;
