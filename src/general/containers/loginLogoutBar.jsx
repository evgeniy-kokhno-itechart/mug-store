import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { logoutUser } from '../../user/userActions';

export class LoginLogoutBar extends Component {
  renderLoginAndRegister = () => (
    <React.Fragment>
      <Link to="/login" className="nav navbar-text mr-3 d-inline clickable">
        Login
      </Link>
      <Link to="/register" className="nav navbar-text d-inline clickable">
        Register
      </Link>
    </React.Fragment>
  );

  renderUserNameAndLogout = () => (
    <React.Fragment>
      <p className="nav navbar-text mr-3 d-inline">{this.props.currentUserName}</p>
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
          <button type="button" className="dropdown-item px-3" onClick={this.props.logoutUser}>
            Logout
          </button>
        </div>
      </div>
    </React.Fragment>
  );

  render() {
    return this.props.currentUserName ? this.renderUserNameAndLogout() : this.renderLoginAndRegister();
  }
}

LoginLogoutBar.propTypes = {
  currentUserName: PropTypes.string,
  logoutUser: PropTypes.func.isRequired,
};

LoginLogoutBar.defaultProps = {
  currentUserName: undefined,
};

const mapStateToProps = state => ({
  currentUserName: state.user.currentUser.name,
});

const mapDispatchToProps = {
  logoutUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginLogoutBar);
