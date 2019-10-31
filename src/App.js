/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Routes } from './app/root';
import { Navbar, Footer } from './app/layout';
import { IconService } from './app/shared';
import { categoryActions } from './app/catalog';
import { currencyActions } from './app/currency';
import { userActions } from './app/user';
import './styles/App.css';

export class App extends Component {
  constructor(props) {
    super(props);
    const { getCategories, getCurrencies } = this.props;
    IconService.composeIconLibrary();
    getCategories();
    getCurrencies();
  }

  render() {
    const {
      cart, currencyState, currentUserName, changeCurrency, logoutUser,
    } = this.props;
    return (
      <React.Fragment>
        <Navbar
          cart={cart}
          currencyState={currencyState}
          currentUserName={currentUserName}
          changeCurrency={changeCurrency}
          logoutUser={logoutUser}
        />
        <div className="content-wrap">
          <Routes />
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

App.propTypes = {
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
  getCategories: PropTypes.func.isRequired,
  getCurrencies: PropTypes.func.isRequired,
};

App.defaultProps = {
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
  getCategories: categoryActions.GetCategories.InitiateApiCall,
  getCurrencies: currencyActions.GetCurrencies.InitiateApiCall,
  changeCurrency: currencyActions.ChangeCurrency,
  logoutUser: userActions.Logout.InitiateApiCall,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
