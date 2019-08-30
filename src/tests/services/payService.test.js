/* eslint-disable no-undef */
import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getCurrencyRates } from '../../services/general/payService';
import { currencyRatesURL } from '../../services/general/constants';

describe('pay service', () => {
  const mockAxios = new MockAdapter(Axios);
  const fakeCurrencyNamesArray = ['CURR1', 'CURR2'];

  afterEach(() => {
    mockAxios.resetHandlers();
    mockAxios.resetHistory();
  });

  it('should perform 2 fake API calls for both CURR1 and CURR2 from fakeCurrencyNamesArray', () => {
    const currencyRequestURLs = fakeCurrencyNamesArray.map(currencyName => `${currencyRatesURL}/${currencyName}?ParamMode=2`);
    const productURLRegExp = new RegExp(`${currencyRatesURL}/.*`);

    mockAxios.onGet(productURLRegExp).reply(200, {});

    return Promise.all(getCurrencyRates(fakeCurrencyNamesArray)).then(() => {
      expect(mockAxios.history.get.map(historyItem => historyItem.url)).toEqual(currencyRequestURLs);
    });
  });
});
