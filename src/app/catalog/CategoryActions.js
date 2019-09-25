import { createAction } from 'redux-actions';
import { createHttpAction } from '../shared';

// eslint-disable-next-line import/prefer-default-export
export const categoryActions = {
  GetCategories: createHttpAction('GET_CATEGORIES'),
  ChangeCategory: createAction('CHANGE_CATEGORY'),
};
