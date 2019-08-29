/* eslint-disable no-undef */
import currencyReducer from '../../../catalog/currency-redux-state/currencyReducer';
import initialCurrencyState from '../../../catalog/currency-redux-state/currencyState';
import { baseCurrencyName } from '../../../services/general/constants';
import {
  gettingCurrenciesInProgress,
  gettingCurrenciesFailed,
  gettingCurrenciesSuccess,
  gettingCurrencyRatesInProgress,
  gettingCurrencyRatesFailed,
  gettingCurrencyRatesSuccess,
  changeCurrency,
} from '../../../catalog/currency-redux-state/currencyActions';

describe('products reducer', () => {
  const fakeCurrencies = [{ id: '1', name: 'RUB' }, { id: '2', name: baseCurrencyName }, { id: '3', name: 'EUR' }];
  const fakeCurrenciesWithRates = [
    { id: '1', name: 'RUB', rate: 0.7 },
    { id: '2', name: baseCurrencyName, rate: 1 },
    { id: '3', name: 'EUR', rate: 0.43 },
  ];

  // considered base currency name is baseCurrencyName
  const fakeRates = [{ name: 'RUB', rate: 0.7 }, { name: 'EUR', rate: 0.43 }];

  it('should return the initial state', () => {
    expect(currencyReducer(initialCurrencyState, {})).toEqual(initialCurrencyState);
  });

  // GET CURRENCIES
  it('should handle gettingCurrenciesInProgress', () => {
    expect(currencyReducer(initialCurrencyState, gettingCurrenciesInProgress(true))).toEqual({
      ...initialCurrencyState,
      currenciesStatus: { isGettingCurrenciesInProcess: true, hasGettingCurrenciesFailed: false, error: '' },
    });
  });

  it('should handle gettingCurrenciesFailed', () => {
    expect(currencyReducer(initialCurrencyState, gettingCurrenciesFailed(true, 'test error'))).toEqual({
      ...initialCurrencyState,
      currenciesStatus: { isGettingCurrenciesInProcess: false, hasGettingCurrenciesFailed: true, error: 'test error' },
    });
  });

  it('should handle gettingCurrenciesSuccess and set base currency as current with rate 1 if none exists', () => {
    expect(currencyReducer(initialCurrencyState, gettingCurrenciesSuccess(fakeCurrencies))).toEqual({
      ...initialCurrencyState,
      currentCurrency: { ...fakeCurrencies[1], rate: 1 },
      currencies: fakeCurrencies,
      currenciesStatus: { isGettingCurrenciesInProcess: false, hasGettingCurrenciesFailed: false, error: '' },
    });
  });

  it('should handle gettingCurrenciesSuccess and set leave current currency without changes if rates exist', () => {
    const currencyStateWithRates = { ...initialCurrencyState, currentCurrency: fakeCurrenciesWithRates[1] };
    expect(currencyReducer(currencyStateWithRates, gettingCurrenciesSuccess(fakeCurrenciesWithRates))).toEqual({
      ...initialCurrencyState,
      currentCurrency: fakeCurrenciesWithRates[1],
      currencies: fakeCurrenciesWithRates,
      currenciesStatus: { isGettingCurrenciesInProcess: false, hasGettingCurrenciesFailed: false, error: '' },
    });
  });

  // GETTING RATES
  it('should handle gettingCurrencyRatesInProgress', () => {
    expect(currencyReducer(initialCurrencyState, gettingCurrencyRatesInProgress(true))).toEqual({
      ...initialCurrencyState,
      currencyRatesStatus: { isGettingCurrencyRatesInProcess: true, hasGettingCurrencyRatesFailed: false, error: '' },
    });
  });

  it('should handle gettingCurrencyRatesFailed', () => {
    expect(currencyReducer(initialCurrencyState, gettingCurrencyRatesFailed(true, 'test error'))).toEqual({
      ...initialCurrencyState,
      currencyRatesStatus: { isGettingCurrencyRatesInProcess: false, hasGettingCurrencyRatesFailed: true, error: 'test error' },
    });
  });

  // 2 cases with currentCurrency has NOT been set yet
  it('should handle gettingCurrencyRatesSuccess and map and the rates fetched to corresponding currency, except base currency', () => {
    const stateWithCurrencies = { ...initialCurrencyState, currencies: fakeCurrencies };
    expect(currencyReducer(stateWithCurrencies, gettingCurrencyRatesSuccess(fakeRates))).toEqual({
      ...initialCurrencyState,
      currencies: fakeCurrenciesWithRates,
      currentCurrency: fakeCurrenciesWithRates[1], // the currency with name === baseCurrencyName
      currencyRatesStatus: { isGettingCurrencyRatesInProcess: false, hasGettingCurrencyRatesFailed: false, error: '' },
    });
  });

  it('should handle gettingCurrencyRatesSuccess and return currencies within rate===undefined in case they were missed in rates response', () => {
    const stateWithCurrencies = { ...initialCurrencyState, currencies: fakeCurrencies };
    const fakeRatesWithout2ndRate = [...fakeRates];
    fakeRatesWithout2ndRate.splice(1, 1);

    // delete rate from 3rd currency item for assertion purposes
    const fakeCurrenciesWithoutOneRate = [...fakeCurrenciesWithRates];
    const thirdWithoutRate = { ...fakeCurrenciesWithRates[2] };
    thirdWithoutRate.rate = undefined;
    fakeCurrenciesWithoutOneRate[2] = thirdWithoutRate;

    expect(currencyReducer(stateWithCurrencies, gettingCurrencyRatesSuccess(fakeRatesWithout2ndRate))).toEqual({
      ...initialCurrencyState,
      currencies: fakeCurrenciesWithoutOneRate,
      currentCurrency: fakeCurrenciesWithRates[1], // the currency with name === baseCurrencyName
      currencyRatesStatus: { isGettingCurrencyRatesInProcess: false, hasGettingCurrencyRatesFailed: false, error: '' },
    });
  });

  // similar 2 cases with currentCurrency has already been set
  it('should handle gettingCurrencyRatesSuccess and map and the rates fetched to corresponding currency, except base currency and persist currentCurrency', () => {
    const stateWithCurrenciesAndCurrency = {
      ...initialCurrencyState,
      currencies: fakeCurrencies,
      currentCurrency: fakeCurrenciesWithRates[0],
    };

    expect(currencyReducer(stateWithCurrenciesAndCurrency, gettingCurrencyRatesSuccess(fakeRates))).toEqual({
      ...initialCurrencyState,
      currencies: fakeCurrenciesWithRates,
      currentCurrency: fakeCurrenciesWithRates[0], // the currency with name === baseCurrencyName
      currencyRatesStatus: { isGettingCurrencyRatesInProcess: false, hasGettingCurrencyRatesFailed: false, error: '' },
    });
  });

  it('should handle gettingCurrencyRatesSuccess and return currencies within rate===undefined in case they were missed in rates response and persist currentCurrency', () => {
    const stateWithCurrenciesAndCurrency = {
      ...initialCurrencyState,
      currencies: fakeCurrencies,
      currentCurrency: fakeCurrenciesWithRates[0],
    };

    const fakeRatesWithout2ndRate = [...fakeRates];
    fakeRatesWithout2ndRate.splice(1, 1);

    // delete rate from 3rd currency item for assertion purposes
    const fakeCurrenciesWithoutOneRate = [...fakeCurrenciesWithRates];
    const thirdWithoutRate = { ...fakeCurrenciesWithRates[2] };
    thirdWithoutRate.rate = undefined;
    fakeCurrenciesWithoutOneRate[2] = thirdWithoutRate;

    expect(currencyReducer(stateWithCurrenciesAndCurrency, gettingCurrencyRatesSuccess(fakeRatesWithout2ndRate))).toEqual({
      ...initialCurrencyState,
      currencies: fakeCurrenciesWithoutOneRate,
      currentCurrency: fakeCurrenciesWithRates[0], // the currency with name === baseCurrencyName
      currencyRatesStatus: { isGettingCurrencyRatesInProcess: false, hasGettingCurrencyRatesFailed: false, error: '' },
    });
  });

  // CHANGE CURRENCY
  it('should handle changeCurrency', () => {
    const stateWithinCurrenciesAnd1stCurrency = {
      ...initialCurrencyState,
      currencies: fakeCurrenciesWithRates,
      currentCurrency: fakeCurrenciesWithRates[0],
    };

    expect(currencyReducer(stateWithinCurrenciesAnd1stCurrency, changeCurrency(fakeCurrenciesWithRates[2]))).toEqual({
      ...stateWithinCurrenciesAnd1stCurrency,
      currentCurrency: fakeCurrenciesWithRates[2],
    });
  });
});
