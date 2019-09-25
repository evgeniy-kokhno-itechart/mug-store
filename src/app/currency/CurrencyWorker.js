import { put, call, select } from 'redux-saga/effects';
import { currencyActions } from './CurrencyActions';
import CurrencyService from './CurrencyService';

// eslint-disable-next-line import/prefer-default-export
export function* workerGetCurrencies() {
  try {
    yield put(currencyActions.GetCurrencies.CallIsInProgress(true));
    const result = yield call(CurrencyService.getCurrenciesList);
    const currencies = result.data;
    const currentCurrency = yield select(state => state.currency.currentCurrency);

    const currencyToBeSet = CurrencyService.setCurrencyIfNone(currentCurrency, currencies);

    yield put(currencyActions.GetCurrencies.Success({ currencies, currencyToBeSet }));
    yield put(currencyActions.GetRates.InitiateApiCall(currencies));
  } catch (error) {
    yield put(currencyActions.GetCurrencies.Failure(error.message));
  }
}

export function* workerGetRates(action) {
  try {
    const currencies = action.payload;
    yield put(currencyActions.GetRates.CallIsInProgress(true));
    const result = yield call(CurrencyService.getCurrencyRates);

    const currenciesWithRates = CurrencyService.matchCurrenciesAndRates(currencies, result.data);

    yield put(currencyActions.GetRates.Success(currenciesWithRates));
  } catch (error) {
    yield put(currencyActions.GetRates.Failure(error.message));
  }
}
