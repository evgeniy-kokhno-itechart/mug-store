/* eslint-disable no-undef */
import categoryReducer from '../../../app/catalog/CategoryReducer';
import initialCategoryState from '../../../app/catalog/CategoryState';
import { categoryActions } from '../../../app/catalog/CategoryActions';

describe('category reducer', () => {
  const fakeCategories = [{ id: '1', name: 'category 1' }, { id: '2', name: 'category 2' }];

  it('should return the initial state', () => {
    expect(categoryReducer(initialCategoryState, {})).toEqual(initialCategoryState);
  });

  it('should handle categoryActions.GetCategories.CallIsInProgress', () => {
    expect(categoryReducer(initialCategoryState, categoryActions.GetCategories.CallIsInProgress(true))).toEqual({
      ...initialCategoryState,
      loadingStatus: { isInProcess: true, hasFailed: false, error: '' },
    });
  });

  it('should handle categoryActions.GetCategories.Failure', () => {
    expect(categoryReducer(initialCategoryState, categoryActions.GetCategories.Failure('test error'))).toEqual({
      ...initialCategoryState,
      loadingStatus: { isInProcess: false, hasFailed: true, error: 'test error' },
    });
  });

  it('should handle categoryActions.GetCategories.Success', () => {
    expect(categoryReducer(initialCategoryState, categoryActions.GetCategories.Success(fakeCategories))).toEqual({
      ...initialCategoryState,
      categories: fakeCategories,
      loadingStatus: { isInProcess: false, hasFailed: false, error: '' },
    });
  });

  it('should handle categoryActions.ChangeCategory', () => {
    expect(categoryReducer(initialCategoryState, categoryActions.ChangeCategory(fakeCategories[0]))).toEqual({
      ...initialCategoryState,
      currentCategory: fakeCategories[0],
    });
  });
});
