/* eslint-disable linebreak-style */
import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import 'babel-polyfill';
import 'unorm';
import './styles/index.scss';
import 'react-image-gallery/styles/css/image-gallery.css';
import AppConnected from './App';
import { initializeStore, history } from './app/root';

const store = initializeStore();
store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppConnected />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
