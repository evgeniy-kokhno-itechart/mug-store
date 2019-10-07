/* eslint-disable no-undef */
import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { workerGetCategories } from '../../../app/catalog/CategoryWorker';
import { categoryActions } from '../../../app/catalog/CategoryActions';
import CategoryService from '../../../app/catalog/CategoryService';

describe('workerGetCategories saga', () => {
  const fakeCategoriesResponse = { data: [{ id: '1', name: 'category 1' }, { id: '2', name: 'category 2' }] };
  const fakeError = new Error('error');

  it('fetch categories and dispatches successfull result', () => expectSaga(workerGetCategories)
    .provide([[call(CategoryService.getCategories), fakeCategoriesResponse]])
    .put(categoryActions.GetCategories.CallIsInProgress(true))
    .call(CategoryService.getCategories)
    .put(categoryActions.GetCategories.Success(fakeCategoriesResponse.data))
    .run());

  it('submits fetch categories and dispatches error result', () => expectSaga(workerGetCategories)
    .provide([[call(CategoryService.getCategories), throwError(fakeError)]])
    .put(categoryActions.GetCategories.CallIsInProgress(true))
    .call(CategoryService.getCategories)
    .put(categoryActions.GetCategories.Failure(fakeError.message))
    .run());
});
