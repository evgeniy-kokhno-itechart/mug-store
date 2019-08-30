import { createAction } from 'redux-actions';
import { push, replace } from 'connected-react-router';
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

export const gettingProductsFailed = createAction('GETTING_PRODUCTS_FAILED', (hasGettingFailed, error) => ({
  hasGettingFailed,
  error,
}));

export const gettingProductsSuccess = createAction('GETTING_PRODUCTS_SUCCESS', products => products);

// GET PRODUCTS
export const getProducts = () => (dispatch) => {
  dispatch(gettingProductsInProgress(true));
  return getProductsList()
    .then((response) => {
      if (!response.statusText === 'OK') {
        throw Error(response.statusText);
      }
      dispatch(gettingProductsInProgress(false));
      return response.data;
    })
    .then(products => dispatch(gettingProductsSuccess(products)))
    .catch((error) => {
      dispatch(gettingProductsInProgress(false));
      dispatch(gettingProductsFailed(true, error.message));
    });
};

//  GET PRODUCT BY ID
export const clearCurrentProductInfo = createAction('CLEAR_CURRENT_PRODUCT_INFO');

export const gettingProductByIdInProgress = createAction(
  'GETING_PRODUCT_BY_ID_IN_PROGRESS',
  isGettingByIdInProcess => isGettingByIdInProcess,
);

export const gettingProductByIdFailed = createAction('GETTING_PRODUCT_BY_ID_FAILED', (hasGettingByIdFailed, error) => ({
  hasGettingByIdFailed,
  error,
}));

export const gettingProductByIdSuccess = createAction('GETTING_PRODUCT_BY_ID_SUCCESS', product => product);

export const getProduct = productId => (dispatch) => {
  dispatch(gettingProductByIdInProgress(true));
  return getProductById(productId)
    .then((response) => {
      if (!response.statusText === 'OK') {
        throw Error(`${response.status} ${response.statusText}`);
      }
      return response.data;
    })
    .then((product) => {
      // should send the product received to store and just then notify components that the fetch has been completed
      dispatch(gettingProductByIdSuccess(product));
      dispatch(gettingProductByIdInProgress(false));
    })
    .catch((error) => {
      dispatch(gettingProductByIdInProgress(false));
      dispatch(gettingProductByIdFailed(true, error.message));
      if (error.message.includes('404')) {
        dispatch(replace('/not-found'));
      }
    });
};

//   SAVE PRODUCT
export const savingProductInProcess = createAction('SAVING_PRODUCT_IN _PROCESS', isSavingProductInProcess => isSavingProductInProcess);
export const savingProductSuccess = createAction('SAVING_PRODUCT_SUCCESS', (resultMessage, updatedProduct) => ({
  resultMessage,
  updatedProduct,
}));
export const savingProductFailed = createAction('SAVING_PRODUCT_FAILED', (hasSavingFailed, error) => ({ hasSavingFailed, error }));

export const saveProduct = (product, redirectUrl) => (dispatch) => {
  dispatch(savingProductInProcess(true));
  return saveProductInDB(product)
    .then((response) => {
      if (!response.statusText === 'OK') {
        throw Error(response.statusText);
      }
      dispatch(savingProductInProcess(false));
      return response.data;
    })
    .then((data) => {
      const { resultMessage, updatedProduct } = data;
      dispatch(savingProductSuccess(resultMessage, updatedProduct));
      dispatch(push(redirectUrl));
    })
    .catch((error) => {
      dispatch(savingProductInProcess(false));

      // !!! FAKE LOGIC delete once get proper back-end app
      dispatch(savingProductFailed(false, error.message)); // should be TRUE in app with proper back-end
      dispatch(push(redirectUrl));
    });
};

//  DELETE PRODUCT
export const deletingProductInProcess = createAction(
  'DELETING_PRODUCT_IN _PROCESS',
  isdeletingProductInProcess => isdeletingProductInProcess,
);
export const deletingProductSuccess = createAction('DELETING_PRODUCT_SUCCESS', resultMessage => resultMessage);
export const deletingProductFailed = createAction('DELETING_PRODUCT_FAILED', (hasDeletingFailed, error) => ({ hasDeletingFailed, error }));

export const deleteProduct = productId => (dispatch) => {
  dispatch(deletingProductInProcess(true));
  return deleteProductFromDB(productId)
    .then((response) => {
      if (!response.statusText === 'OK') {
        throw Error(response.statusText);
      }
      dispatch(deletingProductInProcess(false));
      return response.data;
    })
    .then(resultMessage => dispatch(deletingProductSuccess(resultMessage)))
    .catch((error) => {
      dispatch(deletingProductInProcess(false));
      dispatch(deletingProductFailed(true, error.message));
    });
};
