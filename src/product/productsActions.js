import { createAction } from 'redux-actions';
import {
  getProducts as getProductsList,
  getProduct as getProductById,
  saveProduct as saveProductInDB,
  deleteProduct as deleteProductFromDB,
} from '../services/catalog/productsService';

// GET PRODUCTS LIST

export const gettingProductsInProgress = createAction(
  'GETING_PRODUCTS_IN_PROGRESS',
  isGettingProductsInProcess => isGettingProductsInProcess,
);

export const gettingProductsFailed = createAction('GETTING_PRODUCTS_FAILED', (hasGettingProductsFailed, error) => ({
  hasGettingProductsFailed,
  error,
}));

export const gettingProductsSuccess = createAction('GETTING_PRODUCTS_SUCCESS', products => products);

export const getProducts = () => (dispatch) => {
  dispatch(gettingProductsInProgress(true));
  getProductsList()
    .then((response) => {
      if (!response.statusText === 'OK') {
        throw Error(response.statusText);
      }
      dispatch(gettingProductsInProgress(false));
      return response.data;
    })
    .then(products => dispatch(gettingProductsSuccess(products)))
    .catch(error => dispatch(gettingProductsFailed(true, error.message)));
};

//  GET PRODUCT BY ID
export const clearCurrentProductInfo = createAction('CLEAR_CURRENT_PRODUCT_INFO');

export const gettingProductByIdInProgress = createAction(
  'GETING_PRODUCT_BY_ID_IN_PROGRESS',
  isGettingProductByIdInProcess => isGettingProductByIdInProcess,
);

export const gettingProductByIdFailed = createAction('GETTING_PRODUCT_BY_ID_FAILED', (hasGettingProductByIdFailed, error) => ({
  hasGettingProductByIdFailed,
  error,
}));

export const gettingProductByIdSuccess = createAction('GETTING_PRODUCT_BY_ID_SUCCESS', product => product);

export const getProduct = productId => (dispatch) => {
  dispatch(clearCurrentProductInfo());
  dispatch(gettingProductByIdInProgress(true));
  getProductById(productId)
    .then((response) => {
      if (!response.statusText === 'OK') {
        throw Error(response.statusText);
      }
      dispatch(gettingProductByIdInProgress(false));
      return response.data;
    })
    .then(product => dispatch(gettingProductByIdSuccess(product)))
    .catch(error => dispatch(gettingProductByIdFailed(true, error.message)));
};

//   SAVE PRODUCT
export const savingProductInProcess = createAction('SAVING_PRODUCT_IN _PROCESS', isSavingProductInProcess => isSavingProductInProcess);
export const savingProductSuccess = createAction('SAVING_PRODUCT_SUCCESS', resultMessage => resultMessage);
export const savingProductFailed = createAction('SAVING_PRODUCT_FAILED', (hasSavingFailed, error) => ({ hasSavingFailed, error }));

export const saveProduct = product => (dispatch) => {
  dispatch(savingProductInProcess(true));
  saveProductInDB(product)
    .then((response) => {
      if (!response.statusText === 'OK') {
        throw Error(response.statusText);
      }
      dispatch(savingProductInProcess(false));
      return response.data;
    })
    .then(resultMessage => dispatch(savingProductSuccess(resultMessage)))
    .catch(error => dispatch(savingProductFailed(true, error.message)));
};

//  DELETE PRODUCT
export const deletingProductInProcess = createAction(
  'DELETING_PRODUCT_IN _PROCESS',
  isdeletingProductInProcess => isdeletingProductInProcess,
);
export const deletingProductSuccess = createAction('DELETING_PRODUCT_SUCCESS', resultMessage => resultMessage);
export const deletingProductFailed = createAction('DELETING_PRODUCT_FAILED', (hasdeletingFailed, error) => ({ hasdeletingFailed, error }));

export const deleteProduct = product => (dispatch) => {
  dispatch(deletingProductInProcess(true));
  deleteProductFromDB(product)
    .then((response) => {
      if (!response.statusText === 'OK') {
        throw Error(response.statusText);
      }
      dispatch(deletingProductInProcess(false));
      return response.data;
    })
    .then(resultMessage => dispatch(deletingProductSuccess(resultMessage)))
    .catch(error => dispatch(deletingProductFailed(true, error.message)));
};
