import Axios from 'axios';
import { rootUrl, currencyRatesURL } from './constants';

export function getCurrenciesList() {
  const response = Axios.get(`${rootUrl}/currencies`);
  return response;
}

export function getCurrencyRates(currencyNames) {
  const arrayOfApiCallPromises = [];

  for (let i = 0; i < currencyNames.length; i++) {
    const currencyRequestURL = `${currencyRatesURL}/${currencyNames[i]}?ParamMode=2`;
    arrayOfApiCallPromises.push(Axios.get(currencyRequestURL));
  }

  return arrayOfApiCallPromises;
}
