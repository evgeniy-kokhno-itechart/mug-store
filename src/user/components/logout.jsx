import { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { logoutUser } from '../userActions';

class Logout extends Component {
  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { currentUser, history, logoutUser } = this.props;
    logoutUser(currentUser.username);
    history.replace('/');
  }

  render() {
    return null;
  }
}

Logout.propTypes = {
  currentUser: PropTypes.shape({ username: PropTypes.string }).isRequired,
  history: PropTypes.shape({ replace: PropTypes.func }).isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = {
  logoutUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Logout);
