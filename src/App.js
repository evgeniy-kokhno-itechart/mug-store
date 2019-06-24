/* eslint-disable linebreak-style */
import React from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Routes from './components/common/routes';
import './App.css';
import composeIconLibrary from './utils/iconLibrary';

const App = () => {
  composeIconLibrary();

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

export default App;
