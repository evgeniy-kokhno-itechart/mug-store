import { createStore, combineReducers } from "redux";
import cartReducer from "./reducers/cartReducer";
import userReducer from "./reducers/userReduser";
import currencyReducer from "./reducers/currencyReducer";

const initializeStore = () => {
  const rootReducer = combineReducers({
    cartState: cartReducer,
    userState: userReducer,
    currencyState: currencyReducer
  });

  const persistedState = localStorage.getItem("reduxState")
    ? JSON.parse(localStorage.getItem("reduxState"))
    : {
        cartState: rootReducer.cartState,
        userState: rootReducer.currentUser,
        currencyState: rootReducer.currentCurrency
      };
  return createStore(rootReducer, persistedState);
};

export default initializeStore;
