import { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { logoutUser } from '../../services/authService';
import * as userActionTypes from '../userActions';

class Logout extends Component {
  componentDidMount() {
    logoutUser();
    const { history, onUserLogout } = this.props;
    onUserLogout();
    history.replace('/');
  }

  render() {
    return null;
  }
}

Logout.propTypes = {
  history: PropTypes.shape({ replace: PropTypes.func }).isRequired,
  onUserLogout: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onUserLogout: () => dispatch({ type: userActionTypes.LOGOUT_USER }),
});

export default connect(
  null,
  mapDispatchToProps,
)(Logout);
