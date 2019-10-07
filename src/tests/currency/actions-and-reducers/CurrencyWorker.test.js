/* eslint-disable no-undef */
import { call, select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { currencyActions } from '../../../app/currency/CurrencyActions';
import CurrencyService from '../../../app/currency/CurrencyService';
import { workerGetCurrencies, workerGetRates, currentCurrencySelector } from '../../../app/currency/CurrencyWorker';

describe('Currency saga:', () => {
  const currencyNameKeyInJson = process.env.REACT_APP_CURRENCY_NAME_KEY_IN_JSON;
  const currencyRateKeyInJson = process.env.REACT_APP_CURRENCY_RATE_KEY_IN_JSON;

  const fakeCurrenciesResponse = { data: [{ id: '1', name: 'CURR1' }, { id: '2', name: 'CURR2' }] };
  const fakeCurrencies = fakeCurrenciesResponse.data;
  const fakeRatesResponse = {
    data: [
      { [currencyNameKeyInJson]: 'CURR1', [currencyRateKeyInJson]: 1 },
      { [currencyNameKeyInJson]: 'CURR2', [currencyRateKeyInJson]: 0.5 },
    ],
  };
  const fakeCurrenciesWithRates = [{ id: '1', name: 'CURR1', rate: 1 }, { id: '2', name: 'CURR2', rate: 2 }];

  const fakeError = new Error('error');

  it('workerGetCurrencies fetch currencies and dispatches successfull result within list', () => (
    expectSaga(workerGetCurrencies)
      .provide([
        [call(CurrencyService.getCurrenciesList), fakeCurrenciesResponse],
        [select(currentCurrencySelector), { id: '0' }],
      ])
      .put(currencyActions.GetCurrencies.CallIsInProgress(true))
      .call(CurrencyService.getCurrenciesList)
      .select(currentCurrencySelector)
      .put(currencyActions.GetCurrencies.Success({ currencies: fakeCurrencies, currencyToBeSet: { ...fakeCurrencies[0], rate: 'ERROR!' } }))
      .put(currencyActions.GetRates.InitiateApiCall(fakeCurrencies))
      .run()));

  it('workerGetCurrencies fetch currencies and dispatches error result within error message', () => (
    expectSaga(workerGetCurrencies)
      .provide([[call(CurrencyService.getCurrenciesList), throwError(fakeError)]])
      .put(currencyActions.GetCurrencies.CallIsInProgress(true))
      .call(CurrencyService.getCurrenciesList)
      .put(currencyActions.GetCurrencies.Failure(fakeError.message))
      .run()));

  it('workerGetRates fetch rates and dispatces successfull result within rates', () => (
    expectSaga(workerGetRates, currencyActions.GetRates.InitiateApiCall(fakeCurrencies))
      .provide([[call(CurrencyService.getCurrencyRates), fakeRatesResponse]])
      .put(currencyActions.GetRates.CallIsInProgress(true))
      .call(CurrencyService.getCurrencyRates)
      .put(currencyActions.GetRates.Success(fakeCurrenciesWithRates))
      .run()
  ));

  it('workerGetRates fetch rates and dispatces error result within error message', () => (
    expectSaga(workerGetRates, currencyActions.GetRates.InitiateApiCall(fakeCurrencies))
      .provide([[call(CurrencyService.getCurrencyRates), throwError(fakeError)]])
      .put(currencyActions.GetRates.CallIsInProgress(true))
      .call(CurrencyService.getCurrencyRates)
      .put(currencyActions.GetRates.Failure(fakeError.message))
      .run()
  ));
});
