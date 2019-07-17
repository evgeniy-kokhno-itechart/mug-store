import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const initializeStore = () => {
  const reduxStateLocalStoreKey = 'reduxState';
  const persistedState = localStorage.getItem(reduxStateLocalStoreKey)
    ? JSON.parse(localStorage.getItem(reduxStateLocalStoreKey))
    : {
      cart: rootReducer.cart,
      user: rootReducer.user,
      currency: rootReducer.currency,
      products: rootReducer.products,
    };

  return createStore(rootReducer, persistedState, applyMiddleware(thunk));
};

export default initializeStore;
