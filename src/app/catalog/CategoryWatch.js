import { takeEvery } from 'redux-saga/effects';
import { categoryActions } from './CategoryActions';
import { workerGetCategories } from './CategoryWorker';

// eslint-disable-next-line import/prefer-default-export
export function* watchGetCategories() {
  yield takeEvery(categoryActions.GetCategories.InitiateApiCall, workerGetCategories);
}
