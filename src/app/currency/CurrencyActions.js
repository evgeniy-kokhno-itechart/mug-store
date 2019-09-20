import { createAction } from 'redux-actions';
import CurrencyService from './CurrencyService';

// CURRENCIES
export const gettingCurrenciesInProgress = createAction('GETING_CURRENCIES_IN_PROGRESS', isInProcess => isInProcess);
export const gettingCurrenciesFailed = createAction('GETTING_CURRIENCIES_FAILED', (hasFailed, error) => ({ hasFailed, error }));
export const gettingCurrenciesSuccess = createAction('GETTING_CURRIENCIES_SUCCESS', currencies => ({
  currencies,
  baseCurrencyName: process.env.REACT_APP_BASE_CURRENCY_NAME,
}));

// CURRENCY RATES
export const gettingCurrencyRatesInProgress = createAction('GETING_CURRENCY_RATES_IN_PROGRESS', isInProcess => isInProcess);
export const gettingCurrencyRatesFailed = createAction('GETTING_CURRIENCY_RATES_FAILED', (hasFailed, error) => ({ hasFailed, error }));
export const gettingCurrencyRatesSuccess = createAction('GETTING_CURRIENCY_RATES_SUCCESS', currencyRatesArray => ({
  currencyRatesArray,
  baseCurrencyName: process.env.REACT_APP_BASE_CURRENCY_NAME,
}));

// GETTING CURRENCY RATES
export const getRates = currencies => (dispatch) => {
  // consider usage response.data with rate is a JSON object with key 'currencyRateKeyInJson' defined in constants

  // exclude base currency from currencies and get names for remaning
  const arrayOfCurrencyNames = currencies
    .filter(currency => currency.name !== process.env.REACT_APP_BASE_CURRENCY_NAME)
    .map(currency => currency.name);
  dispatch(gettingCurrencyRatesInProgress(true));

  // getting currency rates
  return CurrencyService.getCurrencyRates()
    .then((response) => {
      if (!response.statusText === 'OK') {
        throw Error(response.statusText);
      }

      const nameKey = process.env.REACT_APP_CURRENCY_NAME_KEY_IN_JSON;
      const rateKey = process.env.REACT_APP_CURRENCY_RATE_KEY_IN_JSON;
      const currencyRatesArray = response.data
        .filter(currency => arrayOfCurrencyNames.includes(currency[nameKey])) // extract rates for app currencies only
        .map(filteredCurrencies => ({ // compose handy array
          name: filteredCurrencies[nameKey],
          rate: 1 / filteredCurrencies[rateKey],
        }));

      dispatch(gettingCurrencyRatesInProgress(false));
      return currencyRatesArray;
    })
    .then(ratesArray => dispatch(gettingCurrencyRatesSuccess(ratesArray)))
    .catch((ratesError) => {
      dispatch(gettingCurrencyRatesInProgress(false));
      dispatch(gettingCurrencyRatesFailed(true, ratesError.message));
    });
};

// GETTING CURRENCIES
export const getCurrencies = () => (dispatch) => {
  dispatch(gettingCurrenciesInProgress(true));
  return CurrencyService.getCurrenciesList()
    .then((response) => {
      if (!response.statusText === 'OK') {
        throw Error(response.statusText);
      }
      dispatch(gettingCurrenciesInProgress(false));
      return response.data;
    })
    .then((currencies) => {
      dispatch(gettingCurrenciesSuccess(currencies));
      dispatch(getRates(currencies));
    })

    .catch((error) => {
      dispatch(gettingCurrenciesInProgress(false));
      dispatch(gettingCurrenciesFailed(true, error.message));
    });
};

// CHANGE CURRENCY
export const changeCurrency = createAction('CHANGE_CURRENCY', currency => currency);
