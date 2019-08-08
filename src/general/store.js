import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import createRootReducer from './rootReducer';

export const history = createBrowserHistory();

export default function initializeStore() {
  const rootReducer = createRootReducer(history);
  const composedMiddlewares = compose(applyMiddleware(thunk, routerMiddleware(history)));

  const reduxStateLocalStoreKey = 'reduxState';
  const persistedState = localStorage.getItem(reduxStateLocalStoreKey)
    ? JSON.parse(localStorage.getItem(reduxStateLocalStoreKey))
    : {
      cart: rootReducer.cart,
      user: rootReducer.user,
      currency: rootReducer.currency,
      products: rootReducer.products,
    };
  delete persistedState.router;
  return createStore(rootReducer, persistedState, composedMiddlewares);
}
