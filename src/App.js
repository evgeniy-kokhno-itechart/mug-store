/* eslint-disable linebreak-style */
import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { NavbarConnected, Footer, Routes } from './app/root';
import { IconService } from './app/shared';
import { getCategories } from './app/catalog';
import { getCurrencies } from './app/currency';
import './styles/App.css';

export const App = (props) => {
  IconService.composeIconLibrary();
  props.getCategories();
  props.getCurrencies();

  return (
    <React.Fragment>
      <NavbarConnected />
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
