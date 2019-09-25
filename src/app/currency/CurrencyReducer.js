import { handleActions } from 'redux-actions';
import { currencyActions } from './CurrencyActions';
import initialCurrencyState from './CurrencyState';

const currencyReducer = handleActions(
  {
    // GETTING CURRENCIES
    [currencyActions.GetCurrencies.CallIsInProgress]: (state, { payload: isInProcess }) => ({
      ...state,
      currenciesStatus: { isInProcess, hasFailed: false, error: '' },
    }),
    [currencyActions.GetCurrencies.Failure]: (state, { payload: error }) => ({
      ...state,
      currenciesStatus: { isInProcess: false, hasFailed: true, error },
    }),
    [currencyActions.GetCurrencies.Success]: (state, { payload: { currencies, currencyToBeSet } }) => ({
      ...state,
      currentCurrency: currencyToBeSet,
      currencies,
      currenciesStatus: { isInProcess: false, hasFailed: false, error: '' },
    }),

    // GETTING RATES
    [currencyActions.GetRates.CallIsInProgress]: (state, { payload: isInProcess }) => ({
      ...state,
      currencyRatesStatus: { isInProcess, hasFailed: false, error: '' },
    }),

    [currencyActions.GetRates.Failure]: (state, { payload: error }) => ({
      ...state,
      currencyRatesStatus: { isInProcess: false, hasFailed: true, error },
    }),

    [currencyActions.GetRates.Success]: (state, { payload: currenciesWithRates }) => ({
      ...state,
      currencies: currenciesWithRates,
      currencyRatesStatus: { isInProcess: false, hasFailed: false, error: '' },
    }),

    // CHANGE CURRENCY
    [currencyActions.ChangeCurrency]: (state, { payload: currency }) => ({
      ...state,
      currentCurrency: currency,
    }),
  },

  initialCurrencyState,
);

export default currencyReducer;
