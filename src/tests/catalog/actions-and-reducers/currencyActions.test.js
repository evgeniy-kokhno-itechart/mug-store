/* eslint-disable no-undef */
import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../../catalog/currency-redux-state/currencyActions';
import {
  rootUrl, currencyRatesURL, currencyNameKeyInJson, currencyRateKeyInJson,
} from '../../../services/general/constants';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('categoryActions', () => {
  const mockAxios = new MockAdapter(Axios);
  const fakeCurrencies = [{ id: '1', name: 'CURR1' }, { id: '2', name: 'CURR2' }];
  const fakeRatesResponse = [
    { [currencyNameKeyInJson]: 'CURR1', [currencyRateKeyInJson]: 1 },
    { [currencyNameKeyInJson]: 'CURR2', [currencyRateKeyInJson]: 0.5 },
  ];
  const fakeRatesInStore = [{ name: 'CURR1', rate: 1 }, { name: 'CURR1', rate: 1 }];
  let store;

  beforeEach(() => {
    store = mockStore({
      currencies: [],
      currentCurrency: { id: '0' },
      currenciesStatus: { isGettingCurrenciesInProcess: false, hasGettingCurrenciesFailed: false, error: 'Not started yet' },
      currencyRatesStatus: { isGettingCurrencyRatesInProcess: false, hasGettingCurrencyRatesFailed: false, error: 'Not started yet' },
    });
  });

  afterEach(() => {
    mockAxios.resetHandlers();
    store.clearActions();
  });

  it('should call gettingCurrenciesInProgress and gettingCurrenciesSuccess, getRates on currencies response 200', () => {
    mockAxios.onGet(`${rootUrl}/currencies`).reply(200, fakeCurrencies);

    const expectedActions = [
      actions.gettingCurrenciesInProgress(true),
      actions.gettingCurrenciesInProgress(false),
      actions.gettingCurrenciesSuccess(fakeCurrencies),
      actions.gettingCurrencyRatesInProgress(true),
    ];

    return store.dispatch(actions.getCurrencies()).then(() => {
      const actionsCalled = store.getActions();
      expect(actionsCalled).toEqual(expectedActions);
    });
  });

  it('should call gettingCurrencyRatesInProgress and gettingCurrencyRatesSuccess on rates response 200', () => {
    const currencyRatesURLRegExp = new RegExp(`${currencyRatesURL}.*`);

    // since axios-mock-adapter doesn't have API to retrieve currency name based on URL details (name is not a parameter)
    // hence fake rate will be allways the same for every single call
    // so the action would be { type: 'GETTING_CURRIENCY_RATES_SUCCESS',
    //                          payload: { currencyRatesArray: [{ name: 'CURR1', rate: 1 }, { name: 'CURR1', rate: 1 }],
    //                          baseCurrencyName: 'BYN' } }
    mockAxios.onGet(currencyRatesURLRegExp).reply(200, fakeRatesResponse[0]);

    const expectedActions = [
      actions.gettingCurrencyRatesInProgress(true),
      actions.gettingCurrencyRatesInProgress(false),
      actions.gettingCurrencyRatesSuccess(fakeRatesInStore),
    ];

    return store.dispatch(actions.getRates(fakeCurrencies)).then(() => {
      const actionsCalled = store.getActions();
      expect(actionsCalled).toEqual(expectedActions);
    });
  });

  it('should call gettingCurrenciesInProgress and gettingCurrenciesFailed on currencies response 404', () => {
    mockAxios.onGet(`${rootUrl}/currencies`).reply(404);

    const expectedActions = [
      actions.gettingCurrenciesInProgress(true),
      actions.gettingCurrenciesInProgress(false),
      actions.gettingCurrenciesFailed(true, 'Request failed with status code 404'),
    ];

    return store.dispatch(actions.getCurrencies()).then(() => {
      const actionsCalled = store.getActions();
      expect(actionsCalled).toEqual(expectedActions);
    });
  });

  it('should call gettingCurrencyRatesInProgress and gettingCurrenciesFailed on rates response 404', () => {
    mockAxios.onGet(currencyRatesURL).reply(404);

    const expectedActions = [
      actions.gettingCurrencyRatesInProgress(true),
      actions.gettingCurrencyRatesInProgress(false),
      actions.gettingCurrencyRatesFailed(true, 'Request failed with status code 404'),
    ];

    return store.dispatch(actions.getRates(fakeCurrencies)).then(() => {
      const actionsCalled = store.getActions();
      expect(actionsCalled).toEqual(expectedActions);
    });
  });
});
