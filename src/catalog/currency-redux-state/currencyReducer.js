import { handleActions } from 'redux-actions';
import {
  gettingCurrenciesInProgress,
  gettingCurrenciesFailed,
  gettingCurrenciesSuccess,
  gettingCurrencyRatesInProgress,
  gettingCurrencyRatesFailed,
  gettingCurrencyRatesSuccess,
  changeCurrency,
} from './currencyActions';
import initialCurrencyState from './currencyState';

const currencyReducer = handleActions(
  {
    // GETTING CURRENCIES
    [gettingCurrenciesInProgress]: (state, { payload: isGettingCurrenciesInProcess }) => ({
      ...state,
      currenciesStatus: { isGettingCurrenciesInProcess, hasGettingCurrenciesFailed: false, error: '' },
    }),
    [gettingCurrenciesFailed]: (state, { payload: { hasGettingCurrenciesFailed, error } }) => ({
      ...state,
      currenciesStatus: { isGettingCurrenciesInProcess: false, hasGettingCurrenciesFailed, error },
    }),
    [gettingCurrenciesSuccess]: (state, { payload: currencies, baseCurrencyName }) => {
      const { currentCurrency } = state;
      // this is to define the 1st currency as default if none is stored in Redux state
      let currentCurrencyToBeSet;
      if (!currentCurrency.rate) {
        currentCurrencyToBeSet = currencies.find(currency => currency.name === baseCurrencyName);
        currentCurrencyToBeSet.rate = 1;
      } else {
        currentCurrencyToBeSet = currentCurrency;
      }
      return {
        ...state,
        currentCurrency: currentCurrencyToBeSet,
        currencies,
        currenciesStatus: { isGettingCurrenciesInProcess: false, hasGettingCurrenciesFailed: false, error: '' },
      };
    },

    // GETTING RATES
    [gettingCurrencyRatesInProgress]: (state, { payload: isGettingCurrencyRatesInProcess }) => ({
      ...state,
      currencyRatesStatus: { isGettingCurrencyRatesInProcess, hasGettingCurrencyRatesFailed: false, error: '' },
    }),

    [gettingCurrencyRatesFailed]: (state, { payload: { hasGettingCurrencyRatesFailed, error } }) => ({
      ...state,
      currencyRatesStatus: { isGettingCurrencyRatesInProcess: false, hasGettingCurrencyRatesFailed, error },
    }),

    [gettingCurrencyRatesSuccess]: (state, { payload: { currencyRatesArray, baseCurrencyName } }) => {
      const { currencies } = state;
      const currenciesWithRatesAdded = currencies.map((currency) => {
        const relatedRateObject = currencyRatesArray.find(currencyRate => currencyRate.name === currency.name);
        let currentRate;

        // need to compare weither the currency is base currency or not to separate the cases when rate for some reason wasn't fetched
        // and will have wrong rate 1 (accordingly to the below code), from the cases when the currency is base currency
        if (!relatedRateObject) {
          if (currency.name === baseCurrencyName) {
            currentRate = 1; // if NOT currentRate is undefined
          }
        } else {
          currentRate = relatedRateObject.rate;
        }
        return { ...currency, rate: currentRate };
      });
      const currentCurrency = state.currentCurrency.rate ? state.currentCurrency : currenciesWithRatesAdded[0];
      return {
        ...state,
        currencies: currenciesWithRatesAdded,
        currentCurrency,
        currencyRatesStatus: { isGettingCurrencyRatesInProcess: false, hasGettingCurrencyRatesFailed: false, error: '' },
      };
    },

    // CHANGE CURRENCY
    [changeCurrency]: (state, { payload: currency }) => ({
      ...state,
      currentCurrency: currency,
    }),
  },

  initialCurrencyState,
);

export default currencyReducer;
