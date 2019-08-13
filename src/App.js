/* eslint-disable linebreak-style */
import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Navbar from './general/containers/Navbar';
import Footer from './general/components/Footer';
import Routes from './general/components/Routes';
import composeIconLibrary from './services/general/iconLibrary';
import { getCategories } from './catalog/categories-redux-state/categoryActions';
import { getCurrencies } from './catalog/currency-redux-state/currencyActions';
import './styles/App.css';

const App = (props) => {
  composeIconLibrary();
  props.getCategories();
  props.getCurrencies();

  return (
    <React.Fragment>
      <Navbar />
      <div id="bootstrap-overrides" className="container-fluid">
        <div id="app__content--wrap">
          <Routes />
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

App.propTypes = {
  getCategories: PropTypes.func.isRequired,
  getCurrencies: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  getCategories,
  getCurrencies,
};

export default connect(
  null,
  mapDispatchToProps,
)(App);
