import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { changeCurrency, CurrenciesDropdown } from '../../currency';
import LoginLogoutPanel from './LoginLogoutBar';

export const Navbar = ({
  currentCurrency,
  cart,
  isCurrenciesLoading,
  hasCurrenciesLoadFailed,
  errorCurrenciesLoading,
  currencies: currencyOptions,
  // eslint-disable-next-line no-shadow
  changeCurrency,
}) => {
  const cartCount = cart.reduce((sumQty, currentProduct) => sumQty + currentProduct.quantity, 0);

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
        <CurrenciesDropdown
          currentCurrencyId={currentCurrency.id}
          currencyOptions={currencyOptions}
          onCurrencyChange={changeCurrency}
          isCurrenciesLoading={isCurrenciesLoading}
          hasLoadFailed={hasCurrenciesLoadFailed}
          errorMessage={errorCurrenciesLoading}
        />

        <LoginLogoutPanel />
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  currentUser: PropTypes.shape({ name: PropTypes.string }),
  currentCurrency: PropTypes.shape({ id: PropTypes.string }).isRequired,
  isCurrenciesLoading: PropTypes.bool.isRequired,
  hasCurrenciesLoadFailed: PropTypes.bool,
  errorCurrenciesLoading: PropTypes.string,
  cart: PropTypes.arrayOf(PropTypes.shape({ quantity: PropTypes.number })),
  currencies: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, name: PropTypes.string })),
  changeCurrency: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  hasCurrenciesLoadFailed: false,
  errorCurrenciesLoading: '',
  currencies: [],
  currentUser: { roles: [] },
  cart: [],
};

const mapStateToProps = state => ({
  cart: state.cart.cart,
  currentUser: state.user.currentUser,
  currencies: state.currency.currencies,
  isCurrenciesLoading: state.currency.currenciesStatus.isGettingCurrenciesInProcess,
  hasCurrenciesLoadFailed: state.currency.currenciesStatus.hasGettingCurrenciesFailed,
  errorCurrenciesLoading: state.currency.currenciesStatus.error,
  currentCurrency: state.currency.currentCurrency,
});

const mapDispatchToProps = {
  changeCurrency,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Navbar);
