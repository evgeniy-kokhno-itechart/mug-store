import { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { logoutUser } from '../../services/authService';
import { logoutUser as logoutUserAction } from '../userActions';

class Logout extends Component {
  componentDidMount() {
    logoutUser();
    // eslint-disable-next-line no-shadow
    const { history, logoutUserAction } = this.props;
    logoutUserAction();
    history.replace('/');
  }

  render() {
    return null;
  }
}

Logout.propTypes = {
  history: PropTypes.shape({ replace: PropTypes.func }).isRequired,
  logoutUserAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  logoutUserAction,
};

export default connect(
  null,
  mapDispatchToProps,
)(Logout);
