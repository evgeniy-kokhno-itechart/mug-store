import React from 'react';
import { Link } from 'react-router-dom';

const LoginRegisterButtons = () => (
  <React.Fragment>
    <Link to="/login" className="nav navbar-text mr-3 d-inline clickable">
        Login
    </Link>
    <Link to="/register" className="nav navbar-text d-inline clickable">
        Register
    </Link>
  </React.Fragment>
);

export default LoginRegisterButtons;
