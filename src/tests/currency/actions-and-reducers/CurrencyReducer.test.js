/* eslint-disable no-undef */
import CurrencyReducer from '../../../app/currency/CurrencyReducer';
import initialCurrencyState from '../../../app/currency/CurrencyState';
import { currencyActions } from '../../../app/currency/CurrencyActions';

describe('products reducer', () => {
  const baseCurrencyName = process.env.REACT_APP_BASE_CURRENCY_NAME;
  const fakeCurrencies = [{ id: '1', name: 'RUB' }, { id: '2', name: baseCurrencyName }, { id: '3', name: 'EUR' }];
  const fakeCurrenciesWithRates = [
    { id: '1', name: 'RUB', rate: 0.7 },
    { id: '2', name: baseCurrencyName, rate: 1 },
    { id: '3', name: 'EUR', rate: 0.43 },
  ];
  const currencyToBeSet = fakeCurrenciesWithRates[1];

  it('should return the initial state', () => {
    expect(CurrencyReducer(initialCurrencyState, {})).toEqual(initialCurrencyState);
  });

  // GET CURRENCIES
  it('should handle currencyActions.GetCurrencies.CallIsInProgress', () => {
    expect(CurrencyReducer(initialCurrencyState, currencyActions.GetCurrencies.CallIsInProgress(true))).toEqual({
      ...initialCurrencyState,
      currenciesStatus: { isInProcess: true, hasFailed: false, error: '' },
    });
  });

  it('should handle currencyActions.GetCurrencies.Failure', () => {
    expect(CurrencyReducer(initialCurrencyState, currencyActions.GetCurrencies.Failure('test error'))).toEqual({
      ...initialCurrencyState,
      currenciesStatus: { isInProcess: false, hasFailed: true, error: 'test error' },
    });
  });

  it('should handle currencyActions.GetCurrencies.Success and set currencies and provided currency as current currency  ', () => {
    expect(
      CurrencyReducer(initialCurrencyState, currencyActions.GetCurrencies.Success({ currencies: fakeCurrencies, currencyToBeSet })),
    )
      .toEqual({
        ...initialCurrencyState,
        currentCurrency: currencyToBeSet,
        currencies: fakeCurrencies,
        currenciesStatus: { isInProcess: false, hasFailed: false, error: '' },
      });
  });

  // GETTING RATES
  it('should handle currencyActions.GetRates.CallIsInProgress', () => {
    expect(CurrencyReducer(initialCurrencyState, currencyActions.GetRates.CallIsInProgress(true))).toEqual({
      ...initialCurrencyState,
      currencyRatesStatus: { isInProcess: true, hasFailed: false, error: '' },
    });
  });

  it('should handle currencyActions.GetRates.Failure', () => {
    expect(CurrencyReducer(initialCurrencyState, currencyActions.GetRates.Failure('test error'))).toEqual({
      ...initialCurrencyState,
      currencyRatesStatus: { isInProcess: false, hasFailed: true, error: 'test error' },
    });
  });

  it('should handle currencyActions.GetRates.Success and set currencies with rates', () => {
    const stateWithCurrencies = { ...initialCurrencyState, currencies: fakeCurrencies };
    expect(CurrencyReducer(stateWithCurrencies, currencyActions.GetRates.Success(fakeCurrenciesWithRates))).toEqual({
      ...initialCurrencyState,
      currencies: fakeCurrenciesWithRates,
      currencyRatesStatus: { isInProcess: false, hasFailed: false, error: '' },
    });
  });

  // CHANGE CURRENCY
  it('should handle changeCurrency', () => {
    const stateWithinCurrenciesAnd1stCurrency = {
      ...initialCurrencyState,
      currencies: fakeCurrenciesWithRates,
      currentCurrency: fakeCurrenciesWithRates[0],
    };

    expect(CurrencyReducer(stateWithinCurrenciesAnd1stCurrency, currencyActions.ChangeCurrency(fakeCurrenciesWithRates[2]))).toEqual({
      ...stateWithinCurrenciesAnd1stCurrency,
      currentCurrency: fakeCurrenciesWithRates[2],
    });
  });
});
