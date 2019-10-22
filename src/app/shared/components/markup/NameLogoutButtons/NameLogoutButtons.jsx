import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import './NameLogoutButtons.scss';

class NameLogoutButtons extends Component {
  state = { displayProfileMenu: false };

  constructor(props) {
    super(props);
    this.loginLogoutBarRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  showMenu = () => (
    <div className="name-logout-bar__profile-menu profile-menu">
      <Link className="profile-menu__link" to="/myprofile" onClick={this.handleProfileBtnClick}>
        My Profile
      </Link>
      <button type="button" className="profile-menu__logout-btn clickable" onClick={this.props.logoutUser}>
        Logout
      </button>
    </div>
  );


  handleProfileBtnClick = () => {
    this.setState(prevState => ({ displayProfileMenu: !prevState.displayProfileMenu }));
  }

  handleClickOutside(event) {
    if (this.loginLogoutBarRef && !this.loginLogoutBarRef.current.contains(event.target)) {
      this.setState({ displayProfileMenu: false });
    }
  }

  render() {
    const { currentUserName } = this.props;
    return (
      <div className="name-logout-bar" ref={this.loginLogoutBarRef}>
        <span className="name-logout-bar__username text--gray">{currentUserName}</span>
        <button
          className="name-logout-bar__profile-button text--white clickable"
          type="button"
          onClick={this.handleProfileBtnClick}
        >
          Profile
        </button>
        {this.state.displayProfileMenu && this.showMenu()}
      </div>
    );
  }
}

NameLogoutButtons.propTypes = {
  currentUserName: PropTypes.string.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

export default NameLogoutButtons;
