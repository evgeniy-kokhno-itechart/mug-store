import React from 'react';
import _ from 'lodash';
import * as Yup from 'yup';
import { PropTypes } from 'prop-types';
import { FormBase, Input } from '../../../shared';
import './LoginForm.scss';

export class LoginForm extends FormBase {
  state = {
    data: { username: '', password: '' },
    errors: {},
  };

  loginObjectSchema = {
    username: Yup.string()
      .required()
      .label('Username'),
    password: Yup.string()
      .required()
      .label('Password'),
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { data } = this.state;
    this.props.onSubmit(data.username, data.password);
  };

  render() {
    const { data, errors } = this.state;
    return (
      <div className="login-form">
        <h1 className="login-form__header">Login</h1>
        <form className="login-form__content" onSubmit={this.handleSubmit}>
          <Input
            type="text"
            name="username"
            label="Username"
            value={_.get(data, 'username')}
            error={errors.username}
            validationSchema={this.loginObjectSchema.username}
            onChange={this.handleControlChange}
          />

          <Input
            type="password"
            name="password"
            label="Password"
            value={_.get(data, 'password')}
            error={errors.password}
            validationSchema={this.loginObjectSchema.password}
            onChange={this.handleControlChange}
          />

          <button
            type="submit"
            disabled={this.validateForm(this.loginObjectSchema, data)}
            className="button button--solid login-form-button"
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  currentUserName: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
  currentUserName: '',
};

export default LoginForm;
