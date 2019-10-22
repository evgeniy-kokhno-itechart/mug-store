import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { userActions } from '../../UserActions';
import { FormBase, ErrorMessage } from '../../../shared';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import './LoginFormConnected.scss';

export class LoginFormConnected extends FormBase {
  handleSubmit = (username, password) => {
    const { location, loginUserAction } = this.props;
    const { fromPath } = location;
    const redirectPath = fromPath ? fromPath.pathname : null;
    loginUserAction({ username, password, redirectPath });
  }

  componentWillUnmount() {
    this.props.resetLoginStatus();
  }

  renderForm = () => {
    const { loginError } = this.props;
    return (
      <React.Fragment>
        <LoginForm currentUserName={this.props.currentUserName} onSubmit={this.handleSubmit} />
        {loginError && <ErrorMessage message={loginError} customClasses='login-form-error' />}
      </React.Fragment>
    );
  }

  render() {
    const { currentUserName } = this.props;
    return currentUserName
      ? <Redirect to="/" />
      : this.renderForm();
  }
}

LoginFormConnected.propTypes = {
  currentUserName: PropTypes.string,
  loginError: PropTypes.string,
  location: PropTypes.shape({ fromPath: PropTypes.shape({ pathname: PropTypes.string }) }),
  loginUserAction: PropTypes.func.isRequired,
};

LoginFormConnected.defaultProps = {
  currentUserName: '',
  loginError: '',
  location: { fromPath: null },
};

const mapStateToProps = state => ({
  currentUserName: state.user.currentUser.name,
  loginError: state.user.loginStatus.error,
});

const mapDispatchToProps = {
  loginUserAction: userActions.Login.InitiateApiCall,
  resetLoginStatus: userActions.ResetLoginStatus,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginFormConnected);
