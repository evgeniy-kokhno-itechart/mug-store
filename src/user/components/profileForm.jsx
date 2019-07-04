import React from 'react';
import Joi from 'joi-browser';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Form from '../../shared/form';
import { registerUser, saveUser } from '../../services/userService';
import { loginUserWithJwt } from '../../services/authService';
import { loginUser } from '../userActions';

class ProfileForm extends Form {
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

  componentDidMount() {
    const { user } = this.props;
    if (user.name) {
      this.setState({ data: this.mapToViewModel(user) });
    }
  }

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

  schema = {
    username: Joi.string()
      .email()
      .required()
      .max(100)
      .label('Username'),
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
    password: Joi.string()
      .required()
      .min(5)
      .max(200)
      .label('Password'),
    confirmPassword: Joi.string()
      .required()
      .min(5)
      .max(200)
      .label('Confirm Password'),
  };

  doSubmit = () => {
    if (!this.props.user.name) {
      try {
        const { data } = this.state;
        const token = registerUser(data);
        const userInfo = loginUserWithJwt(token);
        this.props.loginUser(userInfo);
        this.props.history.replace('/');
      } catch (ex) {
        // paste error handling logic here
        this.setState((prevState) => {
          const errors = { ...prevState.errors, ...{ confirmPassword: ex.message } };
          return { errors };
        });
      }
    } else {
      saveUser(this.state.data);
      this.props.history.replace('/');
    }
  };

  render() {
    return (
      <React.Fragment>
        <h1 className="text-center m-3">{this.props.user.name ? 'Edit profile' : 'Register'}</h1>
        <form className="col-10 col-md-8 col-lg-7 col-xl-5 mx-auto" onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username (a valid E-mail)')}
          {this.renderInput('name', 'Name')}
          {this.renderInput('country', 'Country')}
          {this.renderInput('city', 'City')}
          {this.renderInput('address', 'Address')}
          {this.renderInput('phone', 'Phone')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderInput('confirmPassword', 'Confirm Password', 'password', 'password')}
          {this.props.user.name ? this.renderButton('Save', 'w-100') : this.renderButton('Register', 'w-100')}
        </form>
      </React.Fragment>
    );
  }
}

ProfileForm.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.string),
    username: PropTypes.string,
  }),
  loginUser: PropTypes.func.isRequired,
};

ProfileForm.defaultProps = {
  user: {},
};

const mapStateToProps = state => ({
  user: state.userState.currentUser,
});

const mapDispatchToProps = {
  loginUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileForm);
