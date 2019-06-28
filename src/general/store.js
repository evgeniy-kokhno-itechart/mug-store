import { createStore } from 'redux';
import rootReducer from './rootReducer';

const initializeStore = () => {
  const reduxStateLocalStorKey = 'reduxState';
  const persistedState = localStorage.getItem(reduxStateLocalStorKey)
    ? JSON.parse(localStorage.getItem(reduxStateLocalStorKey))
    : {
      cartState: rootReducer.cartState,
      userState: rootReducer.currentUser,
      currencyState: rootReducer.currentCurrency,
    };

  return createStore(rootReducer, persistedState);
};

export default initializeStore;
