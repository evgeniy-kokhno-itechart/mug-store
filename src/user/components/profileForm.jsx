import React, { Component } from 'react';
import * as Yup from 'yup';
import _ from 'lodash';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { saveEditedUserInfo, registerNewUserAndLogin } from '../userActions';
import FormService from '../../services/general/formService';
import Input from '../../shared/controls/Input';

export class ProfileForm extends Component {
  state = {
    data: {
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
      this.setState({ data: this.mapToViewModel(user) });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.props.user.name) {
      try {
        const { data } = this.state;
        this.props.registerNewUserAndLogin(data);
      } catch (ex) {
        this.setState((prevState) => {
          const errors = { ...prevState.errors, ...{ confirmPassword: ex.message } };
          return { errors };
        });
      }
    } else {
      this.props.saveEditedUserInfo(this.state.data);
    }
  };

  handleChange = (e, matchedInputName) => {
    const { target: input } = e;

    this.setState(prevState => FormService.handleChange(input, matchedInputName, prevState, this.profileObjectSchema));
  };

  mapToViewModel({
    username, name, country, city, address, phone,
  }) {
    return {
      username,
      name,
      country,
      city,
      address,
      phone,
      password: '',
      confirmPassword: '',
    };
  }

  render() {
    const { data, errors } = this.state;
    return (
      <React.Fragment>
        <h1 className="text-center m-3">{this.props.user.name ? 'Edit profile' : 'Register'}</h1>
        <form className="col-10 col-md-8 col-lg-7 col-xl-5 mx-auto" onSubmit={this.handleSubmit}>
          <Input
            type="text"
            name="username"
            label="Username (a valid E-mail)"
            value={_.get(data, 'username')}
            error={errors.username}
            onValueChange={this.handleChange}
          />

          <Input type="text" name="name" label="Name" value={_.get(data, 'name')} error={errors.name} onValueChange={this.handleChange} />

          <Input
            type="text"
            name="country"
            label="Country"
            value={_.get(data, 'country')}
            error={errors.country}
            onValueChange={this.handleChange}
          />

          <Input type="text" name="city" label="City" value={_.get(data, 'city')} error={errors.city} onValueChange={this.handleChange} />

          <Input
            type="text"
            name="address"
            label="Address"
            value={_.get(data, 'address')}
            error={errors.address}
            onValueChange={this.handleChange}
          />

          <Input type="text" name="phone" label="Phone" value={_.get(data, 'phone')} error={errors.phone} onValueChange={this.handleChange} />

          <Input
            type="password"
            name="password"
            label="Password"
            value={_.get(data, 'password')}
            error={errors.password}
            onValueChange={this.handleChange}
          />

          <Input
            type="password"
            name="confirmPassword"
            label="Title"
            value={_.get(data, 'confirmPassword')}
            error={errors.confirmPassword}
            matchedInputName="password"
            onValueChange={this.handleChange}
          />

          <button type="submit" disabled={FormService.validateForm(this.profileObjectSchema, data)} className="btn btn-secondary w-100">
            Save
          </button>
        </form>
      </React.Fragment>
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
  saveEditedUserInfo: PropTypes.func.isRequired,
  registerNewUserAndLogin: PropTypes.func.isRequired,
};

ProfileForm.defaultProps = {
  user: {},
};

const mapStateToProps = state => ({
  user: state.user.currentUser,
});

const mapDispatchToProps = {
  saveEditedUserInfo,
  registerNewUserAndLogin,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileForm);
