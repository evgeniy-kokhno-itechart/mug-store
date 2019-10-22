import React from 'react';
import { Link } from 'react-router-dom';
import './LoginRegisterButtons.scss';

const LoginRegisterButtons = () => (
  <React.Fragment>
    <Link to="/login" className="login-btn text--gray">
        Login
    </Link>
    <Link to="/register" className="register-btn text--gray">
        Register
    </Link>
  </React.Fragment>
);

export default LoginRegisterButtons;
