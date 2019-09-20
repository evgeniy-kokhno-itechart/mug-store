import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { loginUser as loginUserAction } from '../UserActions';
import { FormService, Input } from '../../shared';

export class LoginForm extends Component {
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

  handleChange = (e, matchedInputName) => {
    const { target: input } = e;

    this.setState(prevState => FormService.handleChange(input, matchedInputName, prevState, this.loginObjectSchema));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    try {
      const { data } = this.state;
      // eslint-disable-next-line no-shadow
      const { location, loginUserAction } = this.props;
      const { fromPath } = location;
      const redirectPath = fromPath ? fromPath.pathname : null;
      loginUserAction(data.username, data.password, redirectPath);
    } catch (ex) {
      const errors = {};
      errors.password = ex.message;
      this.setState({ errors });
    }
  };

  renderForm = () => {
    const { data, errors } = this.state;
    return (
      <React.Fragment>
        <h1 className="text-center m-3">Login</h1>
        <form className="col-10 col-md-8 col-lg-7 col-xl-5 mx-auto" onSubmit={this.handleSubmit}>
          <Input
            type="text"
            name="username"
            label="Username"
            value={_.get(data, 'username')}
            error={errors.username}
            onValueChange={this.handleChange}
          />

          <Input
            type="password"
            name="password"
            label="Password"
            value={_.get(data, 'password')}
            error={errors.password}
            onValueChange={this.handleChange}
          />

          <button type="submit" disabled={FormService.validateForm(this.loginObjectSchema, data)} className="btn btn-secondary w-100">
            Login
          </button>
        </form>
      </React.Fragment>
    );
  };

  render() {
    return this.props.currentUserName ? <Redirect to="/" /> : this.renderForm();
  }
}

LoginForm.propTypes = {
  currentUserName: PropTypes.string,
  location: PropTypes.shape({ fromPath: PropTypes.shape({ pathname: PropTypes.string }) }),
  loginUserAction: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
  currentUserName: '',
  location: { fromPath: null },
};

const mapStateToProps = state => ({ currentUserName: state.user.currentUser.name });

const mapDispatchToProps = {
  loginUserAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm);
