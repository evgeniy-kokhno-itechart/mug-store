import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { loginUser as loginUserAction } from '../userActions';
import FormService from '../../services/general/formService';
import Input from '../../shared/controls/input';

class LoginForm extends Component {
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
    const { currentTarget: input } = e;

    this.setState(prevState => FormService.handleChange(input, matchedInputName, prevState, this.loginObjectSchema));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    try {
      const { data } = this.state;
      // eslint-disable-next-line no-shadow
      const { location, loginUserAction } = this.props;
      const { fromPath } = location;
      loginUserAction(data.username, data.password, fromPath);
    } catch (ex) {
      const errors = {};
      errors.password = ex.message;
      this.setState({ errors });
    }
  };

  render() {
    const { data, errors } = this.state;

    if (this.props.currentUser.name) {
      return <Redirect to="/" />;
    }
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
            onChange={this.handleChange}
          />

          <Input
            type="password"
            name="password"
            label="Password"
            value={_.get(data, 'password')}
            error={errors.password}
            onChange={this.handleChange}
          />

          <button type="submit" disabled={FormService.validateForm(this.loginObjectSchema, data)} className="btn btn-secondary w-100">
            Save
          </button>
        </form>
      </React.Fragment>
    );
  }
}

LoginForm.propTypes = {
  currentUser: PropTypes.shape({ name: PropTypes.string }),
  location: PropTypes.shape({ fromPath: PropTypes.shape({ pathname: PropTypes.string }) }),
  history: PropTypes.shape({ replace: PropTypes.func }).isRequired,
  loginUserAction: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
  currentUser: null,
  location: { fromPath: null },
};

const mapStateToProps = state => ({ currentUser: state.user.currentUser });

const mapDispatchToProps = {
  loginUserAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm);
