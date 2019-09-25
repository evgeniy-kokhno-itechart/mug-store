import { createAction } from 'redux-actions';
import { createHttpAction } from '../shared';

// eslint-disable-next-line import/prefer-default-export
export const productsActions = {
  GetProduct: createHttpAction('GET_PRODUCT'),
  GetProducts: createHttpAction('GET_PRODUCTS'),
  SaveProduct: createHttpAction('SAVE_PRODUCT'),
  DeleteProduct: createHttpAction('DELETE_PRODUCT'),
  ClearCurrentProductInfo: createAction('CLEAR_CURRENT_PRODUCT_INFO'),
};
