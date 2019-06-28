import * as currencyActionTypes from './currencyActions';
import initialCurrencyState from './currencyState';

const currencyReducer = (state = initialCurrencyState, action) => {
  switch (action.type) {
    case currencyActionTypes.CHANGE_CURRENCY: {
      return { ...state, currentCurrency: action.currentCurrency };
    }
    default:
      return state;
  }
};

export default currencyReducer;
