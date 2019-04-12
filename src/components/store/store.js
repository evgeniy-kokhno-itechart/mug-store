import { createStore, combineReducers } from "redux";
import cartReducer from "./reducers/cartReducer";

const initializeStore = () => {
  // const rootReducer = combineReducers({
  //   cart: cartReducer
  // });

  const persistedState = localStorage.getItem("reduxState")
    ? JSON.parse(localStorage.getItem("reduxState"))
    : { cart: [] };
  return createStore(cartReducer, persistedState);
};

export default initializeStore;
