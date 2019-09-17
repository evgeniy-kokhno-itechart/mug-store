import { applicationApi, currencyApi } from '../shared';

export default class CurrencyService {
  static getCurrenciesList() {
    const response = applicationApi.get('/currencies');
    return response;
  }

  static getCurrencyRates(currencyNames) {
    const arrayOfApiCallPromises = [];

    for (let i = 0; i < currencyNames.length; i++) {
      arrayOfApiCallPromises.push(currencyApi.get(`/${currencyNames[i]}?ParamMode=2`));
    }

    return arrayOfApiCallPromises;
  }
}
