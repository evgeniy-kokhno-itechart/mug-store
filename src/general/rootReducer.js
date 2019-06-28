import { combineReducers } from 'redux';
import cartReducer from '../cart/cartReducer';
import userReducer from '../user/userReduser';
import currencyReducer from '../catalog/currencyReducer';

const rootReducer = combineReducers({
  cartState: cartReducer,
  userState: userReducer,
  currencyState: currencyReducer,
});

export default rootReducer;
