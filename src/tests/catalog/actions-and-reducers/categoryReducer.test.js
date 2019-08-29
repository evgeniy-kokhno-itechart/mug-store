/* eslint-disable no-undef */
import categoryReducer from '../../../catalog/categories-redux-state/categoryReducer';
import initialCategoryState from '../../../catalog/categories-redux-state/categoryState';
import {
  gettingCategoriesInProgress,
  gettingCategoriesFailed,
  gettingCategoriesSuccess,
  changeCategory,
} from '../../../catalog/categories-redux-state/categoryActions';

describe('products reducer', () => {
  const fakeCategories = [{ id: '1', name: 'category 1' }, { id: '2', name: 'category 2' }];

  it('should return the initial state', () => {
    expect(categoryReducer(initialCategoryState, {})).toEqual(initialCategoryState);
  });

  it('should handle gettingCategoriesInProgress', () => {
    expect(categoryReducer(initialCategoryState, gettingCategoriesInProgress(true))).toEqual({
      ...initialCategoryState,
      categoriesStatus: { isInProcess: true, hasFailed: false, error: '' },
    });
  });

  it('should handle gettingCategoriesFailed', () => {
    expect(categoryReducer(initialCategoryState, gettingCategoriesFailed(true, 'test error'))).toEqual({
      ...initialCategoryState,
      categoriesStatus: { isInProcess: false, hasFailed: true, error: 'test error' },
    });
  });

  it('should handle gettingCategoriesSuccess', () => {
    expect(categoryReducer(initialCategoryState, gettingCategoriesSuccess(fakeCategories))).toEqual({
      ...initialCategoryState,
      categories: fakeCategories,
      categoriesStatus: { isInProcess: false, hasFailed: false, error: '' },
    });
  });

  it('should handle changeCategory', () => {
    expect(categoryReducer(initialCategoryState, changeCategory(fakeCategories[0]))).toEqual({
      ...initialCategoryState,
      currentCategory: fakeCategories[0],
    });
  });
});
