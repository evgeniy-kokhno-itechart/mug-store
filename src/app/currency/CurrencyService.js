import { applicationApi, currencyApi } from '../shared';

export default class CurrencyService {
  static getCurrenciesList() {
    const response = applicationApi.get('/currencies');
    return response;
  }

  static getCurrencyRates() {
    return currencyApi.get('?Periodicity=0');
  }

  static setCurrencyIfNone(currentCurrency, currenciesList) {
    const baseCurrencyName = process.env.REACT_APP_BASE_CURRENCY_NAME;

    // this is to define the 1st currency as default if none is stored in Redux state
    let currencyToBeSet;
    if (!currentCurrency.rate) {
      currencyToBeSet = currenciesList.find(currency => currency.name === baseCurrencyName);
      currencyToBeSet.rate = 1;
    } else {
      currencyToBeSet = currentCurrency;
    }
    return currencyToBeSet;
  }

  static matchCurrenciesAndRates(currencies, rates) {
    // exclude base currency from currencies and get names for remaning
    const baseCurrencyName = process.env.REACT_APP_BASE_CURRENCY_NAME;
    const arrayOfCurrencyNames = currencies
      .filter(currency => currency.name !== baseCurrencyName)
      .map(currency => currency.name);

    const nameKey = process.env.REACT_APP_CURRENCY_NAME_KEY_IN_JSON;
    const rateKey = process.env.REACT_APP_CURRENCY_RATE_KEY_IN_JSON;

    const currencyRatesArray = rates
      .filter(currency => arrayOfCurrencyNames.includes(currency[nameKey])) // extract rates for app currencies only
      .map(filteredCurrencies => ({ // compose handy array
        name: filteredCurrencies[nameKey],
        rate: 1 / filteredCurrencies[rateKey],
      }));

    // double checking that none of rates is missed in response, also set base currency rate to 1
    const currenciesWithRates = currencies.map((currency) => {
      const correspondingRateObject = currencyRatesArray.find(currencyRate => currencyRate.name === currency.name);
      let currentRate;

      // need to compare weither the currency is base currency or not to separate cases where rate for some reason wasn't
      // fetched from API. So it would have rate 1 (accordingly to the below code) although this is incorrect and is undefined
      if (!correspondingRateObject) {
        if (currency.name === baseCurrencyName) {
          currentRate = 1; // if NOT - then currentRate will be undefined
        }
      } else {
        currentRate = correspondingRateObject.rate;
      }
      return { ...currency, rate: currentRate };
    });
    return currenciesWithRates;
  }
}
