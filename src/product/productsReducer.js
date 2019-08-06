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
  recalculateProductPrices,
} from './productsActions';
import initialProductsState from './productsState';

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

    [gettingProductsSuccess]: (state, { payload: products }) => {
      const productsWithCurrentCurrencyPrices = products.map(product => ({ ...product, currentCurrencyPrice: product.basePrice }));
      return {
        ...state,
        products: productsWithCurrentCurrencyPrices,
        tableProductsStatus: { isGettingInProcess: false, hasGettingFailed: false, error: '' },
      };
    },

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

    [gettingProductByIdSuccess]: (state, { payload: { product, currencyRate } }) => ({
      ...state,
      currentProduct: { ...product, currentCurrencyPrice: +(product.basePrice * currencyRate * (1 - product.discount / 100)).toFixed(1) },
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

    [savingProductSuccess]: (state, { payload: resultMessage }) => ({
      ...state,
      saveResult: resultMessage, // added for future. will be empty because back-end is fake
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
      deleteResult: resultMessage, // added for future. will be empty because sunce back-end is fake
      deletingStatus: { isDeletingInProcess: false, hasDeletingFailed: false, error: '' },
    }),

    // RECALCULATE PRODUCT PRICES
    [recalculateProductPrices]: (state, { payload: rate }) => {
      const { products, currentProduct } = state;

      const newProducts = products.map((product) => {
        const newCurrentCurrencyPrice = +(product.basePrice * rate * (1 - product.discount / 100)).toFixed(1);
        const newProduct = { ...product };
        newProduct.currentCurrencyPrice = newCurrentCurrencyPrice;
        return newProduct;
      });

      const newCurrentProduct = { ...currentProduct };
      newCurrentProduct.currentCurrencyPrice = +(newCurrentProduct.basePrice * rate * (1 - newCurrentProduct.discount / 100)).toFixed(1);
      return {
        ...state,
        products: newProducts,
        currentProduct: newCurrentProduct,
      };
    },
  },
  initialProductsState,
);

export default productsReducer;
