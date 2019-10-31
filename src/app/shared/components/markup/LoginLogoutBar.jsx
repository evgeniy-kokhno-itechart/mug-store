import React from 'react';
import { PropTypes } from 'prop-types';
import NameLogoutButtons from './NameLogoutButtons/NameLogoutButtons';
import LoginRegisterButtons from './LoginRegisterButtons/LoginRegisterButtons';

const LoginLogoutBar = ({ currentUserName, logoutUser }) => (
  currentUserName
    ? <NameLogoutButtons currentUserName={currentUserName} logoutUser={logoutUser} />
    : <LoginRegisterButtons />
);

LoginLogoutBar.propTypes = {
  currentUserName: PropTypes.string,
  logoutUser: PropTypes.func.isRequired,
};

LoginLogoutBar.defaultProps = {
  currentUserName: '',
};

export default LoginLogoutBar;
