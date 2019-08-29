/* eslint-disable no-undef */
import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../../catalog/categories-redux-state/categoryActions';
import { rootUrl } from '../../../services/general/constants';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('categoryActions', () => {
  const mockAxios = new MockAdapter(Axios);
  const fakeCategories = [{ id: '1', name: 'category 1' }, { id: '2', name: 'category 2' }];
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    mockAxios.resetHandlers();
  });

  it('should call gettingCategoriesInProgress and gettingCategoriesSuccess on success response', () => {
    mockAxios.onGet(`${rootUrl}/categories`).reply(200, fakeCategories);

    const expectedActions = [
      actions.gettingCategoriesInProgress(true),
      actions.gettingCategoriesInProgress(false),
      actions.gettingCategoriesSuccess(fakeCategories),
    ];

    return store.dispatch(actions.getCategories()).then(() => {
      const actionsCalled = store.getActions();
      expect(actionsCalled).toEqual(expectedActions);
    });
  });

  it('should call gettingCategoriesInProgress and gettingCategoriesSuccess on error response', () => {
    mockAxios.onGet(`${rootUrl}/categories`).reply(404, 'error');

    const expectedActions = [
      actions.gettingCategoriesInProgress(true),
      actions.gettingCategoriesInProgress(false),
      actions.gettingCategoriesFailed(true, 'Request failed with status code 404'),
    ];

    return store.dispatch(actions.getCategories()).then(() => {
      const actionsCalled = store.getActions();
      expect(actionsCalled).toEqual(expectedActions);
    });
  });
});
