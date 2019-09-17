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
    [gettingProductsInProgress]: (state, { payload: isGettingInProcess }) => ({
      ...state,
      tableProductsStatus: { isGettingInProcess, hasGettingFailed: false, error: '' },
    }),

    [gettingProductsFailed]: (state, { payload: { hasGettingFailed, error } }) => ({
      ...state,
      tableProductsStatus: { isGettingInProcess: false, hasGettingFailed, error },
    }),

    [gettingProductsSuccess]: (state, { payload: products }) => ({
      ...state,
      products,
      tableProductsStatus: { isGettingInProcess: false, hasGettingFailed: false, error: '' },
    }),

    //  GET PRODUCT BY ID
    [clearCurrentProductInfo]: state => ({
      ...state,
      currentProduct: initialProductsState.currentProduct,
      currentProductStatus: initialProductsState.currentProductStatus,
    }),

    [gettingProductByIdInProgress]: (state, { payload: isGettingByIdInProcess }) => ({
      ...state,
      currentProductStatus: { isGettingByIdInProcess, hasGettingByIdFailed: false, error: '' },
    }),

    [gettingProductByIdFailed]: (state, { payload: { hasGettingByIdFailed, error } }) => ({
      ...state,
      currentProduct: initialProductsState.currentProduct,
      currentProductStatus: { isGettingByIdInProcess: false, hasGettingByIdFailed, error },
    }),

    [gettingProductByIdSuccess]: (state, { payload: product }) => ({
      ...state,
      currentProduct: product,
      currentProductStatus: { isGettingByIdInProcess: false, hasGettingByIdFailed: false, error: '' },
    }),

    //  SAVE PRODUCT
    [savingProductInProcess]: (state, { payload: isSavingInProcess }) => ({
      ...state,
      savingStatus: { isSavingInProcess, hasSavingFailed: false, error: '' },
    }),

    [savingProductFailed]: (state, { payload: { hasSavingFailed, error } }) => ({
      ...state,
      savingStatus: { isSavingInProcess: false, hasSavingFailed, error },
    }),

    [savingProductSuccess]: (state, { payload: { resultMessage, updatedProduct } }) => ({
      ...state,
      saveResult: resultMessage, // added for future. will be empty since back-end is fake
      currentProduct: updatedProduct || state.currentProduct,
      savingStatus: { isSavingInProcess: false, hasSavingFailed: false, error: '' },
    }),

    // DELETE PRODUCT
    [deletingProductInProcess]: (state, { payload: isDeletingInProcess }) => ({
      ...state,
      deletingStatus: { isDeletingInProcess, hasDeletingFailed: false, error: '' },
    }),

    [deletingProductFailed]: (state, { payload: { hasDeletingFailed, error } }) => ({
      ...state,
      deletingStatus: { isDeletingInProcess: false, hasDeletingFailed, error },
    }),

    [deletingProductSuccess]: (state, { payload: resultMessage }) => ({
      ...state,
      deleteResult: resultMessage, // added for future. will be empty since back-end is fake
      deletingStatus: { isDeletingInProcess: false, hasDeletingFailed: false, error: '' },
    }),
  },
  initialProductsState,
);

export default productsReducer;
