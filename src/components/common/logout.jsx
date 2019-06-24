import { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { logoutUser } from '../../services/authService';
import * as actionTypes from '../../store/actions';

class Logout extends Component {
  componentDidMount() {
    logoutUser();
    this.props.onUserLogout();
    window.location = '/';
  }

  render() {
    return null;
  }
}

Logout.propTypes = {
  onUserLogout: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onUserLogout: () => dispatch({ type: actionTypes.LOGOUT_USER }),
});

export default connect(
  null,
  mapDispatchToProps,
)(Logout);
