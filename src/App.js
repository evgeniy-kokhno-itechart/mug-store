/* eslint-disable linebreak-style */
import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Navbar from './general/containers/navbar';
import Footer from './general/components/footer';
import Routes from './general/components/routes';
import './App.css';
import composeIconLibrary from './services/general/iconLibrary';
import { getCategories } from './catalog/categories-redux-state/categoryActions';
import { getCurrencies } from './catalog/currency-redux-state/currencyActions';

const App = (props) => {
  composeIconLibrary();
  props.getCategories();
  props.getCurrencies();

  return (
    <React.Fragment>
      <Navbar />
      <div id="bootstrap-overrides" className="container-fluid">
        <div id="content-wrap">
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

export default connect(null, mapDispatchToProps)(App);
