import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { changeCurrency, CurrenciesDropdown } from '../../currency';
import { logoutUser } from '../../user';
import { CartService } from '../../cart';
import LoginLogoutBar from '../components/LoginLogoutBar';

export const Navbar = ({
  currentUserName,
  currencyState,
  cart,
  // eslint-disable-next-line no-shadow
  changeCurrency,
  // eslint-disable-next-line no-shadow
  logoutUser,
}) => {
  const cartCount = CartService.countProducts(cart);

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
            {cartCount !== 0
              ? <span className="badge badge-warning ml-1">{cartCount}</span>
              : null}
          </NavLink>
        </div>
      </div>

      <div>
        <CurrenciesDropdown
          currencyState={currencyState}
          onChange={changeCurrency}
        />

        <LoginLogoutBar currentUserName={currentUserName} logoutUser={logoutUser} />
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({ quantity: PropTypes.number })),
  currentUserName: PropTypes.string,

  currencyState: PropTypes.shape({
    currencies: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, name: PropTypes.string })),
    currenciesStatus: PropTypes.shape({
      isInProcess: PropTypes.bool,
      hasFailed: PropTypes.bool,
      error: PropTypes.string,
    }),
    currentCurrency: PropTypes.shape({ id: PropTypes.string }),
  }),
  changeCurrency: PropTypes.func.isRequired,

  logoutUser: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  currencyState: {
    currencies: [],
    currenciesStatus: {
      isInProcess: true,
      hasFailed: false,
      error: '',
    },
    currentCurrency: { id: '0' },
  },
  currentUserName: '',
  cart: [],
};

const mapStateToProps = state => ({
  cart: state.cart.cart,
  currencyState: state.currency,
  currentUserName: state.user.currentUser.name,
});

const mapDispatchToProps = {
  changeCurrency,
  logoutUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Navbar);
