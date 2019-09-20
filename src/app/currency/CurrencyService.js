import { applicationApi, currencyApi } from '../shared';

export default class CurrencyService {
  static getCurrenciesList() {
    const response = applicationApi.get('/currencies');
    return response;
  }

  static getCurrencyRates() {
    return currencyApi.get('?Periodicity=0');
  }
}
