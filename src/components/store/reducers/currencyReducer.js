import * as actionTypes from "../actions";
import { getCurrencies } from "../../../services/payService";

const initialState = {
  currentCurrency: getCurrencies()[0]
};

const currencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_CURRENCY: {
      return { ...state, currentCurrency: action.currentCurrency };
    }
    default:
      return state;
  }
};

export default currencyReducer;
