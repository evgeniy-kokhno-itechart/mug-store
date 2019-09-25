import { handleActions } from 'redux-actions';
import { productsActions } from './ProductsActions';
import initialProductsState from './ProductsState';

const productsReducer = handleActions(
  {
    //  GET PRODUCTS
    [productsActions.GetProducts.CallIsInProgress]: (state, { payload: isInProcess }) => ({
      ...state,
      catalogProductsStatus: { isInProcess, hasFailed: false, error: '' },
    }),

    [productsActions.GetProducts.Failure]: (state, { payload: error }) => ({
      ...state,
      catalogProductsStatus: { isInProcess: false, hasFailed: true, error },
    }),

    [productsActions.GetProducts.Success]: (state, { payload: products }) => ({
      ...state,
      products,
      catalogProductsStatus: { isInProcess: false, hasFailed: false, error: '' },
    }),

    //  GET PRODUCT BY ID
    [productsActions.ClearCurrentProductInfo]: state => ({
      ...state,
      currentProduct: initialProductsState.currentProduct,
      currentProductStatus: initialProductsState.currentProductStatus,
    }),

    [productsActions.GetProduct.CallIsInProgress]: (state, { payload: isInProcess }) => ({
      ...state,
      currentProductStatus: { isInProcess, hasFailed: false, error: '' },
    }),

    [productsActions.GetProduct.Failure]: (state, { payload: error }) => ({
      ...state,
      currentProduct: initialProductsState.currentProduct,
      currentProductStatus: { isInProcess: false, hasFailed: true, error },
    }),

    [productsActions.GetProduct.Success]: (state, { payload: product }) => ({
      ...state,
      currentProduct: product,
      currentProductStatus: { isInProcess: false, hasFailed: false, error: '' },
    }),

    //  SAVE PRODUCT
    [productsActions.SaveProduct.CallIsInProgress]: (state, { payload: isInProcess }) => ({
      ...state,
      savingStatus: { isInProcess, hasFailed: false, error: '' },
    }),

    [productsActions.SaveProduct.Failure]: (state, { payload: error }) => ({
      ...state,
      savingStatus: { isInProcess: false, hasFailed: true, error },
    }),

    [productsActions.SaveProduct.Success]: (state, { payload: { resultMessage, updatedProduct } }) => ({
      ...state,
      saveResult: resultMessage, // added for future. will be empty since back-end is fake
      currentProduct: updatedProduct || state.currentProduct,
      savingStatus: { isInProcess: false, hasFailed: false, error: '' },
    }),

    // DELETE PRODUCT
    [productsActions.DeleteProduct.CallIsInProgress]: (state, { payload: isInProcess }) => ({
      ...state,
      deletingStatus: { isInProcess, hasFailed: false, error: '' },
    }),

    [productsActions.DeleteProduct.Failure]: (state, { payload: error }) => ({
      ...state,
      deletingStatus: { isInProcess: false, hasFailed: true, error },
    }),

    [productsActions.DeleteProduct.Success]: (state, { payload: resultMessage }) => ({
      ...state,
      deleteResult: resultMessage, // added for future. will be empty since back-end is fake
      deletingStatus: { isInProcess: false, hasFailed: false, error: '' },
    }),
  },
  initialProductsState,
);

export default productsReducer;
