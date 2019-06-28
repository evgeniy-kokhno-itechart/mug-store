/* eslint-disable linebreak-style */
import React from 'react';
import Navbar from './general/components/navbar';
import Footer from './general/components/footer';
import Routes from './general/components/routes';
import './App.css';
import composeIconLibrary from './services/iconLibrary';

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
