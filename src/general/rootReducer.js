import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import cartReducer from '../cart/cartReducer';
import userReducer from '../user/userReduser';
import currencyReducer from '../catalog/currency-redux-state/currencyReducer';
import productsReducer from '../product/productsReducer';
import categoryReducer from '../catalog/categories-redux-state/categoryReducer';

const createRootReducer = history => combineReducers({
  cart: cartReducer,
  user: userReducer,
  category: categoryReducer,
  currency: currencyReducer,
  products: productsReducer,
  router: connectRouter(history),
});

export default createRootReducer;
