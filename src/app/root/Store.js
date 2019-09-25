import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import createRootReducer from './RootReducer';
import rootSaga from './RootSaga';


export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

export default function initializeStore() {
  const rootReducer = createRootReducer(history);
  const composedMiddlewares = compose(applyMiddleware(sagaMiddleware, routerMiddleware(history)));

  const reduxStateLocalStoreKey = 'reduxState';
  let persistedState;
  if (localStorage.getItem(reduxStateLocalStoreKey)) {
    persistedState = JSON.parse(localStorage.getItem(reduxStateLocalStoreKey));
  } else {
    persistedState = {
      cart: rootReducer.cart,
      user: rootReducer.user,
      currency: rootReducer.currency,
      products: rootReducer.products,
    };
  }
  delete persistedState.router;
  const store = createStore(rootReducer, persistedState, composedMiddlewares);
  sagaMiddleware.run(rootSaga);
  return store;
}
