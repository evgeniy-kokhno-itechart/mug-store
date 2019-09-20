import { handleActions } from 'redux-actions';
import {
  gettingProductsInProgress,
  gettingProductsFailed,
  gettingProductsSuccess,
  clearCurrentProductInfo,
  gettingProductByIdInProgress,
  gettingProductByIdFailed,
  gettingProductByIdSuccess,
  savingProductInProcess,
  savingProductFailed,
  savingProductSuccess,
  deletingProductInProcess,
  deletingProductFailed,
  deletingProductSuccess,
} from './ProductsActions';
import initialProductsState from './ProductsState';

const productsReducer = handleActions(
  {
    //  GET PRODUCTS
    [gettingProductsInProgress]: (state, { payload: isInProcess }) => ({
      ...state,
      catalogProductsStatus: { isInProcess, hasFailed: false, error: '' },
    }),

    [gettingProductsFailed]: (state, { payload: { hasFailed, error } }) => ({
      ...state,
      catalogProductsStatus: { isInProcess: false, hasFailed, error },
    }),

    [gettingProductsSuccess]: (state, { payload: products }) => ({
      ...state,
      products,
      catalogProductsStatus: { isInProcess: false, hasFailed: false, error: '' },
    }),

    //  GET PRODUCT BY ID
    [clearCurrentProductInfo]: state => ({
      ...state,
      currentProduct: initialProductsState.currentProduct,
      currentProductStatus: initialProductsState.currentProductStatus,
    }),

    [gettingProductByIdInProgress]: (state, { payload: isInProcess }) => ({
      ...state,
      currentProductStatus: { isInProcess, hasFailed: false, error: '' },
    }),

    [gettingProductByIdFailed]: (state, { payload: { hasFailed, error } }) => ({
      ...state,
      currentProduct: initialProductsState.currentProduct,
      currentProductStatus: { isInProcess: false, hasFailed, error },
    }),

    [gettingProductByIdSuccess]: (state, { payload: product }) => ({
      ...state,
      currentProduct: product,
      currentProductStatus: { isInProcess: false, hasFailed: false, error: '' },
    }),

    //  SAVE PRODUCT
    [savingProductInProcess]: (state, { payload: isInProcess }) => ({
      ...state,
      savingStatus: { isInProcess, hasFailed: false, error: '' },
    }),

    [savingProductFailed]: (state, { payload: { hasFailed, error } }) => ({
      ...state,
      savingStatus: { isInProcess: false, hasFailed, error },
    }),

    [savingProductSuccess]: (state, { payload: { resultMessage, updatedProduct } }) => ({
      ...state,
      saveResult: resultMessage, // added for future. will be empty since back-end is fake
      currentProduct: updatedProduct || state.currentProduct,
      savingStatus: { isInProcess: false, hasFailed: false, error: '' },
    }),

    // DELETE PRODUCT
    [deletingProductInProcess]: (state, { payload: isInProcess }) => ({
      ...state,
      deletingStatus: { isInProcess, hasFailed: false, error: '' },
    }),

    [deletingProductFailed]: (state, { payload: { hasFailed, error } }) => ({
      ...state,
      deletingStatus: { isInProcess: false, hasFailed, error },
    }),

    [deletingProductSuccess]: (state, { payload: resultMessage }) => ({
      ...state,
      deleteResult: resultMessage, // added for future. will be empty since back-end is fake
      deletingStatus: { isInProcess: false, hasFailed: false, error: '' },
    }),
  },
  initialProductsState,
);

export default productsReducer;
