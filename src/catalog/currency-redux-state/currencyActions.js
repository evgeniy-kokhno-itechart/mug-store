import { createAction } from 'redux-actions';
import { getCurrenciesList, getCurrencyRates } from '../../services/general/payService';
import { currencyRateKeyInJson, currencyNameKeyInJson, baseCurrencyName } from '../../services/general/constants';

// CURRENCIES
export const gettingCurrenciesInProgress = createAction(
  'GETING_CURRENCIES_IN_PROGRESS',
  isGettingCurrenciesInProcess => isGettingCurrenciesInProcess,
);
export const gettingCurrenciesFailed = createAction('GETTING_CURRIENCIES_FAILED', (hasGettingCurrenciesFailed, error) => ({
  hasGettingCurrenciesFailed,
  error,
}));
export const gettingCurrenciesSuccess = createAction('GETTING_CURRIENCIES_SUCCESS', currencies => ({ currencies, baseCurrencyName }));

// CURRENCY RATES
export const gettingCurrencyRatesInProgress = createAction(
  'GETING_CURRENCY_RATES_IN_PROGRESS',
  isGettingCurrencyRatesInProcess => isGettingCurrencyRatesInProcess,
);
export const gettingCurrencyRatesFailed = createAction('GETTING_CURRIENCY_RATES_FAILED', (hasGettingCurrencyRatesFailed, error) => ({
  hasGettingCurrencyRatesFailed,
  error,
}));
export const gettingCurrencyRatesSuccess = createAction('GETTING_CURRIENCY_RATES_SUCCESS', currencyRatesArray => ({
  currencyRatesArray,
  baseCurrencyName,
}));

export const getCurrencies = () => (dispatch) => {
  dispatch(gettingCurrenciesInProgress(true));
  getCurrenciesList()
    .then((response) => {
      if (!response.statusText === 'OK') {
        throw Error(response.statusText);
      }
      dispatch(gettingCurrenciesInProgress(false));
      return response.data;
    })
    .then((currencies) => {
      dispatch(gettingCurrenciesSuccess(currencies));
      // GETTING CURRENCY RATES
      // consider usage response.data with rate is a JSON object with key 'currencyRateKeyInJson' defined in constants

      // exclude base currency from currencies and get names for remaning
      const arrayOfCurrencyNames = currencies.filter(currency => currency.name !== baseCurrencyName).map(currency => currency.name);

      const arrayOfCurrencyApiCallPromises = getCurrencyRates(arrayOfCurrencyNames);
      dispatch(gettingCurrencyRatesInProgress(true));
      Promise.all(arrayOfCurrencyApiCallPromises)
        .then((currencyRatesResponses) => {
          const currencyRatesArray = currencyRatesResponses.map(response => ({
            name: response.data[currencyNameKeyInJson],
            rate: 1 / response.data[currencyRateKeyInJson],
          }));
          dispatch(gettingCurrencyRatesInProgress(false));
          return currencyRatesArray;
        })
        .then(ratesArray => dispatch(gettingCurrencyRatesSuccess(ratesArray)))
        .catch(ratesError => dispatch(gettingCurrencyRatesFailed(true, ratesError.message)));
    })

    .catch(error => dispatch(gettingCurrenciesFailed(true, error.message)));
};

// CHANGE CURRENCY
export const changeCurrency = createAction('CHANGE_CURRENCY', currency => currency);
