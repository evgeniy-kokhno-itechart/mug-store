import React from 'react';
import { Redirect } from 'react-router-dom';
import Joi from 'joi-browser';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Form from '../../shared/form';
import { loginUser as loginUserAction } from '../userActions';

class LoginForm extends Form {
  state = {
    data: { username: '', password: '' },
    errors: {},
  };

  schema = {
    username: Joi.string()
      .required()
      .label('Username'),
    password: Joi.string()
      .required()
      .label('Password'),
  };

  doSubmit = () => {
    try {
      const { data } = this.state;
      // eslint-disable-next-line no-shadow
      const { location, history, loginUserAction } = this.props;

      // get user's token from the back-end, store it in localStorage and get user's info
      // const userInfo = loginUser(data.username, data.password);
      loginUserAction(data.username, data.password);
      // loginUserAction(userInfo);
      const { fromPath } = location;
      history.replace(fromPath ? fromPath.pathname : '/');
    } catch (ex) {
      const errors = {};
      errors.password = ex.message;
      this.setState({ errors });
    }
  };

  render() {
    if (this.props.currentUser.name) return <Redirect to="/" />;
    return (
      <React.Fragment>
        <h1 className="text-center m-3">Login</h1>
        <form className="col-10 col-md-8 col-lg-7 col-xl-5 mx-auto" onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Login', 'w-100')}
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
