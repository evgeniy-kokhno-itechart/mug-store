import { createAction } from 'redux-actions';
import { push, replace } from 'connected-react-router';
import ProductsService from './ProductsService';

// GET PRODUCTS LIST
export const gettingProductsInProgress = createAction('GETING_PRODUCTS_IN_PROGRESS', isInProcess => isInProcess);
export const gettingProductsFailed = createAction('GETTING_PRODUCTS_FAILED', (hasFailed, error) => ({ hasFailed, error }));
export const gettingProductsSuccess = createAction('GETTING_PRODUCTS_SUCCESS', products => products);

// GET PRODUCTS
export const getProducts = () => (dispatch) => {
  dispatch(gettingProductsInProgress(true));
  return ProductsService.getProducts()
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

export const clearCurrentProductInfo = createAction('CLEAR_CURRENT_PRODUCT_INFO');

//  GET PRODUCT BY ID
export const gettingProductByIdInProgress = createAction('GETING_PRODUCT_BY_ID_IN_PROGRESS', isInProcess => isInProcess);
export const gettingProductByIdFailed = createAction('GETTING_PRODUCT_BY_ID_FAILED', (hasFailed, error) => ({ hasFailed, error }));
export const gettingProductByIdSuccess = createAction('GETTING_PRODUCT_BY_ID_SUCCESS', product => product);

export const getProduct = productId => (dispatch) => {
  dispatch(gettingProductByIdInProgress(true));
  return ProductsService.getProduct(productId)
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
export const savingProductInProcess = createAction('SAVING_PRODUCT_IN _PROCESS', isInProcess => isInProcess);
export const savingProductSuccess = createAction('SAVING_PRODUCT_SUCCESS', (resultMessage, updatedProduct) => ({
  resultMessage,
  updatedProduct,
}));
export const savingProductFailed = createAction('SAVING_PRODUCT_FAILED', (hasFailed, error) => ({ hasFailed, error }));

export const saveProduct = (product, redirectUrl) => (dispatch) => {
  dispatch(savingProductInProcess(true));
  return ProductsService.saveProduct(product)
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
export const deletingProductInProcess = createAction('DELETING_PRODUCT_IN _PROCESS', isInProcess => isInProcess);
export const deletingProductSuccess = createAction('DELETING_PRODUCT_SUCCESS', resultMessage => resultMessage);
export const deletingProductFailed = createAction('DELETING_PRODUCT_FAILED', (hasFailed, error) => ({ hasFailed, error }));

export const deleteProduct = productId => (dispatch) => {
  dispatch(deletingProductInProcess(true));
  return ProductsService.deleteProduct(productId)
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
