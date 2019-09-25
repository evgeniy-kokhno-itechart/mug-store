import { handleActions } from 'redux-actions';
import { categoryActions } from './CategoryActions';
import initialCategoryState from './CategoryState';

const categoryReducer = handleActions(
  {
    [categoryActions.GetCategories.CallIsInProgress]: (state, { payload: isInProcess }) => ({
      ...state,
      loadingStatus: { isInProcess, hasFailed: false, error: '' },
    }),

    [categoryActions.GetCategories.Failure]: (state, { payload: error }) => ({
      ...state,
      loadingStatus: { isInProcess: false, hasFailed: true, error },
    }),

    [categoryActions.GetCategories.Success]: (state, { payload: categories }) => ({
      ...state,
      categories,
      loadingStatus: { isInProcess: false, hasFailed: false, error: '' },
    }),

    [categoryActions.ChangeCategory]: (state, { payload: category }) => ({
      ...state,
      currentCategory: category,
    }),
  },
  initialCategoryState,
);

export default categoryReducer;
