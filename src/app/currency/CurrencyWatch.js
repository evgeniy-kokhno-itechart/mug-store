import { takeEvery } from 'redux-saga/effects';
import { currencyActions } from './CurrencyActions';
import { workerGetCurrencies, workerGetRates } from './CurrencyWorker';

export function* watchGetCurrencies() {
  yield takeEvery(currencyActions.GetCurrencies.InitiateApiCall, workerGetCurrencies);
}

export function* watchGetRates() {
  yield takeEvery(currencyActions.GetRates.InitiateApiCall, workerGetRates);
}
