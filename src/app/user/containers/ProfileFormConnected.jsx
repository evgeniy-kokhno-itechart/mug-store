import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { userActions } from '../UserActions';
import ProfileForm from '../components/ProfileForm/ProfileForm';

export class ProfileFormConnected extends Component {
  handleSubmit = (user) => {
    if (!user.id) {
      this.props.registerNewUserAndLogin(user);
    } else {
      this.props.saveEditedUserInfo(user);
    }
  };

  render() {
    const { user } = this.props;
    return (
      <ProfileForm user={user} onSubmit={this.handleSubmit} />
    );
  }
}

ProfileFormConnected.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.string),
    username: PropTypes.string,
  }),
  saveEditedUserInfo: PropTypes.func.isRequired,
  registerNewUserAndLogin: PropTypes.func.isRequired,
};

ProfileFormConnected.defaultProps = {
  user: {},
};

const mapStateToProps = state => ({
  user: state.user.currentUser,
});

const mapDispatchToProps = {
  saveEditedUserInfo: userActions.SaveEdited.InitiateApiCall,
  registerNewUserAndLogin: userActions.Register.InitiateApiCall,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileFormConnected);
