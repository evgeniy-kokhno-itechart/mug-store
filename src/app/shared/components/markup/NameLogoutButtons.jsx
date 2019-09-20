import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

const NameLogoutButtons = ({ currentUserName, logoutUser }) => (
  <React.Fragment>
    <p className="nav navbar-text mr-3 d-inline">{currentUserName}</p>
    <div className="dropdown d-inline">
      <button
        className="text-white bg-dark border-0 px-0"
        type="button"
        id="profileDropdownButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
          Profile
      </button>
      <div className="dropdown-menu dropdown-menu-right" aria-labelledby="profileDropdownButton">
        <Link className="dropdown-item px-3" to="/myprofile">
            My Profile
        </Link>
        <div className="dropdown-divider" />
        <button type="button" className="dropdown-item px-3" onClick={logoutUser}>
            Logout
        </button>
      </div>
    </div>
  </React.Fragment>
);

NameLogoutButtons.propTypes = {
  currentUserName: PropTypes.string.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

export default NameLogoutButtons;
