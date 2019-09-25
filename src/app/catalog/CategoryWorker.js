import { put, call } from 'redux-saga/effects';
import { categoryActions } from './CategoryActions';
import CategoryService from './CategoryService';

// eslint-disable-next-line import/prefer-default-export
export function* workerGetCategories() {
  try {
    yield put(categoryActions.GetCategories.CallIsInProgress(true));
    const result = yield call(CategoryService.getCategories);
    yield put(categoryActions.GetCategories.Success(result.data));
  } catch (error) {
    yield put(categoryActions.GetCategories.Failure(error.message));
  }
}
