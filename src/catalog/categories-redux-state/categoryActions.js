import { createAction } from 'redux-actions';
import { getCategories as getCategoriesList } from '../../services/catalog/categoriesService';

export const gettingCategoriesInProgress = createAction('GETING_CATEGORIES_IN_PROGRESS', isInProcess => isInProcess);

export const gettingCategoriesFailed = createAction('GETTING_CATEGORIES_FAILED', (hasFailed, error) => ({ hasFailed, error }));

export const gettingCategoriesSuccess = createAction('GETTING_CATEGORIES_SUCCESS', categories => categories);

export const changeCategory = createAction('CHANGE_CATEGORY', category => category);

export const getCategories = () => (dispatch) => {
  dispatch(gettingCategoriesInProgress(true));
  return getCategoriesList()
    .then((response) => {
      if (!response.statusText === 'OK') {
        throw Error(response.statusText);
      }
      dispatch(gettingCategoriesInProgress(false));
      return response.data;
    })
    .then(categories => dispatch(gettingCategoriesSuccess(categories)))
    .catch((error) => {
      dispatch(gettingCategoriesInProgress(false));
      dispatch(gettingCategoriesFailed(true, error.message));
    });
};
