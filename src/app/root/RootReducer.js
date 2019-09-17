import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { CartReducer } from '../cart';
import { UserReducer } from '../user';
import { CurrencyReducer } from '../currency';
import { ProductsReducer } from '../product';
import { CategoryReducer } from '../catalog';

const createRootReducer = history => combineReducers({
  cart: CartReducer,
  user: UserReducer,
  category: CategoryReducer,
  currency: CurrencyReducer,
  products: ProductsReducer,
  router: connectRouter(history),
});

export default createRootReducer;
