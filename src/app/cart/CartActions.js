import { createAction } from 'redux-actions';
import { createHttpAction } from '../shared';

// eslint-disable-next-line import/prefer-default-export
export const cartActions = {
  SubmitCartOrder: createHttpAction('SUBMIT_CART_ORDER'),
  ChangeQuantity: createAction('CHANGE_QUANTITY'),
  AddToCart: createAction('ADD_TO_CART'),
  DeleteFromCart: createAction('DELETE_FROM_CART'),
  ClearCart: createAction('CLEAR_CART'),
};
