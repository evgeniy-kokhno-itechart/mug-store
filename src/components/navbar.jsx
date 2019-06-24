import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getCurrencies } from '../services/payService';
import * as actionTypes from '../store/actions';

class Navbar extends Component {
  state = { currencyOptions: [] };

  componentDidMount() {
    const currencyOptions = getCurrencies();
    this.setState({ currencyOptions });
  }

  render() {
    const { currencyOptions } = this.state;
    const { currentCurrency, cart } = this.props;
    const cartCount = cart.reduce((sumQty, currentProduct) => sumQty + currentProduct.qty, 0);

    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mugStoreNavbar"
          aria-controls="mugStoreNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mugStoreNavbar">
          <NavLink className="navbar-brand" to="/">
            Mug Store
          </NavLink>
          <div className="navbar-nav">
            <NavLink to="/catalog" className=" nav-item nav-link">
              Catalog
            </NavLink>
            <NavLink to="/about" className="nav-item nav-link">
              About
            </NavLink>
            <NavLink to="/cart" className="nav-item nav-link">
              Cart
              {cartCount !== 0 ? <span className="badge badge-warning ml-1">{cartCount}</span> : null}
            </NavLink>
          </div>
        </div>

        <div>
          <p className="navbar-text d-inline ">Currency:</p>
          <select
            className="text-white bg-dark border-0 ml-1 mr-3"
            type="dropdown"
            id="currencyDropdownButton"
            value={currentCurrency._id}
            onChange={(e) => {
              this.props.onCurrencyChange({
                _id: e.currentTarget.value,
                name: e.currentTarget.options[e.currentTarget.selectedIndex].text,
                // .selectedOptions[0].text doesn't work for IE
              });
            }}
          >
            {currencyOptions.map(option => (
              <option key={option._id} value={option._id}>
                {option.name}
              </option>
            ))}
          </select>

          {this.props.currentUser.name ? (
            <React.Fragment>
              <p className="nav navbar-text mr-3 d-inline">{this.props.currentUser.name}</p>
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
                  <Link className="dropdown-item px-3" to="/logout">
                    Logout
                  </Link>
                </div>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Link to="/login" className="nav navbar-text mr-3 d-inline clickable">
                Login
              </Link>
              <Link to="/register" className="nav navbar-text d-inline clickable">
                Register
              </Link>
            </React.Fragment>
          )}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  currentUser: PropTypes.shape({ name: PropTypes.string }),
  currentCurrency: PropTypes.shape({ _id: PropTypes.number }).isRequired,
  cart: PropTypes.arrayOf(PropTypes.object),
  onCurrencyChange: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  currentUser: null,
  cart: [],
};

const mapStateToProps = state => ({
  cart: state.cartState.cart,
  currentUser: state.userState.currentUser,
  currentCurrency: state.currencyState.currentCurrency,
});

const mapDispatchToProps = dispatch => ({
  onCurrencyChange: (newCurrency) => {
    dispatch({
      type: actionTypes.CHANGE_CURRENCY,
      currentCurrency: newCurrency,
    });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Navbar);
