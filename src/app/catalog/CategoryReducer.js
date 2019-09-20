import { handleActions } from 'redux-actions';
import {
  gettingCategoriesInProgress, gettingCategoriesFailed, gettingCategoriesSuccess, changeCategory,
} from './CategoryActions';
import initialCategoryState from './CategoryState';

const categoryReducer = handleActions(
  {
    [gettingCategoriesInProgress]: (state, { payload: isInProcess }) => ({
      ...state,
      loadingStatus: { isInProcess, hasFailed: false, error: '' },
    }),

    [gettingCategoriesFailed]: (state, { payload: { hasFailed, error } }) => ({
      ...state,
      loadingStatus: { isInProcess: false, hasFailed, error },
    }),

    [gettingCategoriesSuccess]: (state, { payload: categories }) => ({
      ...state,
      categories,
      loadingStatus: { isInProcess: false, hasFailed: false, error: '' },
    }),

    [changeCategory]: (state, { payload: category }) => ({
      ...state,
      currentCategory: category,
    }),
  },
  initialCategoryState,
);

export default categoryReducer;
