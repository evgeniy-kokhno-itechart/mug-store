import { handleActions } from 'redux-actions';
import {
  gettingCurrenciesInProgress, gettingCurrenciesFailed, gettingCurrenciesSuccess, changeCurrency,
} from './currencyActions';
import initialCurrencyState from './currencyState';

const currencyReducer = handleActions(
  {
    [gettingCurrenciesInProgress]: (state, { payload: isGettingCurrenciesInProcess }) => ({
      ...state,
      currenciesStatus: { isGettingCurrenciesInProcess, hasGettingCurrenciesFailed: false, error: '' },
    }),

    [gettingCurrenciesFailed]: (state, { payload: { hasGettingCurrenciesFailed, error } }) => ({
      ...state,
      currenciesStatus: { isGettingCurrenciesInProcess: false, hasGettingCurrenciesFailed, error },
    }),

    [gettingCurrenciesSuccess]: (state, { payload: currencies }) => {
      // this is to define the 1st currency as default if none stored in Redux state
      if (!state.currentCurrency.name) {
        return {
          ...state,
          currentCurrency: currencies[0],
          currencies,
          currenciesStatus: { isGettingCurrenciesInProcess: false, hasGettingCurrenciesFailed: false, error: '' },
        };
      }
      return {
        ...state,
        currencies,
        currenciesStatus: { isGettingCurrenciesInProcess: false, hasGettingCurrenciesFailed: false, error: '' },
      };
    },

    [changeCurrency]: (state, { payload: { currencyId, currencyName } }) => ({
      ...state,
      currentCurrency: { id: currencyId, name: currencyName },
    }),
  },
  initialCurrencyState,
);

export default currencyReducer;
