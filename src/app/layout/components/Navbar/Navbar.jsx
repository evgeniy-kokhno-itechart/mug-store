import React from 'react';
import { NavLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CurrenciesDropdown } from '../../../currency';
import { CartService } from '../../../cart';
import { LoginLogoutBar } from '../../../shared';
import './Navbar.scss';

const Navbar = ({
  currentUserName,
  currencyState,
  cart,
  changeCurrency,
  logoutUser,
}) => {
  const cartCount = CartService.countProducts(cart);

  return (
    <nav className="nav-bar">
      <input className="nav-bar__checkbox" id="nav-toggle" type="checkbox" />
      <label htmlFor="nav-toggle" className="nav-bar__burger-btn" role="button">
        <FontAwesomeIcon icon="bars" />
      </label>

      <div className="nav-bar__collapse-wrapper">
        <div className="nav-bar__left">
          <NavLink className="navbrand" to="/">
            Mug Store
          </NavLink>

          <NavLink to="/catalog" className="navlink" role="navigation">
            Catalog
          </NavLink>

          <NavLink to="/about" className="navlink" role="navigation">
            About
          </NavLink>

          <NavLink to="/cart" className="navlink" role="navigation">
            Cart
            {cartCount !== 0
              ? <span className="cart-count-badge">{cartCount}</span>
              : null}
          </NavLink>
        </div>

        <div className="nav-bar__right">
          <CurrenciesDropdown currencyState={currencyState} onChange={changeCurrency} />
          <LoginLogoutBar currentUserName={currentUserName} logoutUser={logoutUser} />
        </div>
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

export default Navbar;
