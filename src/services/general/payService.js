import Axios from 'axios';
import { rootUrl, currencyRatesURL } from './constants';

// const currencies = [{ _id: '1', name: 'BYN' }, { _id: '2', name: 'USD' }];

export function getCurrenciesList() {
  const response = Axios.get(`${rootUrl}/currencies`);
  return response;
}

export function getCurrencyRates(currencyNames) {
  const arrayOfApiCallPromises = [];
  // const requestConfig = { headers: { 'Access-Control-Request-Headers': 'GET' } };
  for (let i = 0; i < currencyNames.length; i++) {
    const currencyRequestURL = `${currencyRatesURL}/${currencyNames[i]}?ParamMode=2`;
    arrayOfApiCallPromises.push(Axios.get(currencyRequestURL)); // requestConfig));
  }
  return arrayOfApiCallPromises;
}

// this function was added to have single algorithm of price calculating, i.e. price rounding
// to avoid cases when sum of prices in ProductPriceCalculator !== total in TotalCostCalculator due to rounding details
// export function calculateProductPrice(price, quantity, discount, currentCurrencyName, currencyRates) {
//   let rateForPriceCalculating = 1;
//   if (currentCurrencyName !== baseCurrencyName) {
//     const rateObject = currencyRates.find(currencyRateObj => currencyRateObj.name === currentCurrencyName);
//     rateForPriceCalculating = rateObject.rate;
//   }

//   return +(quantity * price * (1 / rateForPriceCalculating) * (1 - discount / 100)).toFixed(1);
// }

// export function setCurrentCurrency(currency) {
//   let currencyInStorage = localStorage.getItem("currency");
//   if (currencyInStorage) {
//     localStorage.removeItem("currency");
//   }
//   localStorage.setItem("currency", JSON.stringify(currency));
// }

// export function getCurrentCurrency() {
//   const defaultCurrency = currencies[0];
//   try {
//     let currentCurrency = localStorage.getItem('currency');
//     currentCurrency = currentCurrency ? JSON.parse(currentCurrency) : defaultCurrency;
//     return currentCurrency;
//   } catch (ex) {
//     return defaultCurrency;
//   }
// }
