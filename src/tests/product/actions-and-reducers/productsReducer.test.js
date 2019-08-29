/* eslint-disable no-undef */
import productsReducer from '../../../product/productsReducer';
import initialProductsState from '../../../product/productsState';
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
} from '../../../product/productsActions';

describe('products reducer', () => {
  const fakeProducts = [
    {
      id: '1',
      imageURL: '###',
      title: 'Test Mug',
      description: 'Lorem ipsum',
      category: { id: '1', name: 'Category1' },
      basePrice: 5,
      discount: 0,
      producer: 'Best Kitchenware',
      publishDate: '2018-01-03T19:04:28.809Z',
      rate: '3',
    },
    {
      id: '2',
      imageURL: '###',
      title: 'Test Plate',
      description: 'Lorem ipsum',
      category: { id: '2', name: 'Category2' },
      basePrice: 4,
      discount: 0,
      producer: 'Test',
      publishDate: '2018-01-03T19:04:28.809Z',
      rate: '5',
    },
  ];

  it('should return the initial state', () => {
    expect(productsReducer(initialProductsState, {})).toEqual(initialProductsState);
  });

  // GET PRODUCTS
  it('should handle gettingProductsInProgress', () => {
    expect(productsReducer(initialProductsState, gettingProductsInProgress(true))).toEqual({
      ...initialProductsState,
      tableProductsStatus: { isGettingInProcess: true, hasGettingFailed: false, error: '' },
    });
  });

  it('should handle gettingProductsFailed', () => {
    expect(productsReducer(initialProductsState, gettingProductsFailed(true, 'test error'))).toEqual({
      ...initialProductsState,
      tableProductsStatus: { isGettingInProcess: false, hasGettingFailed: true, error: 'test error' },
    });
  });

  it('should handle gettingProductsSuccess', () => {
    expect(productsReducer(initialProductsState, gettingProductsSuccess(fakeProducts))).toEqual({
      ...initialProductsState,
      products: fakeProducts,
      tableProductsStatus: { isGettingInProcess: false, hasGettingFailed: false, error: '' },
    });
  });

  //  GET PRODUCT BY ID
  it('should handle clearCurrentProductInfo', () => {
    expect(productsReducer(initialProductsState, clearCurrentProductInfo(true))).toEqual({
      ...initialProductsState,
      currentProduct: initialProductsState.currentProduct,
      currentProductStatus: initialProductsState.currentProductStatus,
    });
  });

  it('should handle gettingProductByIdInProgress', () => {
    expect(productsReducer(initialProductsState, gettingProductByIdInProgress(true))).toEqual({
      ...initialProductsState,
      currentProductStatus: { isGettingByIdInProcess: true, hasGettingByIdFailed: false, error: '' },
    });
  });

  it('should handle gettingProductByIdFailed', () => {
    expect(productsReducer(initialProductsState, gettingProductByIdFailed(true, 'test error'))).toEqual({
      ...initialProductsState,
      currentProductStatus: { isGettingByIdInProcess: false, hasGettingByIdFailed: true, error: 'test error' },
    });
  });

  it('should handle gettingProductByIdSuccess', () => {
    expect(productsReducer(initialProductsState, gettingProductByIdSuccess(fakeProducts[0]))).toEqual({
      ...initialProductsState,
      currentProduct: fakeProducts[0],
      currentProductStatus: { isGettingByIdInProcess: false, hasGettingByIdFailed: false, error: '' },
    });
  });

  // SAVE PRODUCT
  it('should handle savingProductInProcess', () => {
    expect(productsReducer(initialProductsState, savingProductInProcess(true))).toEqual({
      ...initialProductsState,
      savingStatus: { isSavingInProcess: true, hasSavingFailed: false, error: '' },
    });
  });

  it('should handle savingProductFailed', () => {
    expect(productsReducer(initialProductsState, savingProductFailed(true, 'test error'))).toEqual({
      ...initialProductsState,
      savingStatus: { isSavingInProcess: false, hasSavingFailed: true, error: 'test error' },
    });
  });

  it('should handle savingProductSuccess', () => {
    expect(productsReducer(initialProductsState, savingProductSuccess('test result message'))).toEqual({
      ...initialProductsState,
      saveResult: 'test result message',
      savingStatus: { isSavingInProcess: false, hasSavingFailed: false, error: '' },
    });
  });

  // DELETE PRODUCT
  it('should handle deletingProductInProcess', () => {
    expect(productsReducer(initialProductsState, deletingProductInProcess(true))).toEqual({
      ...initialProductsState,
      deletingStatus: { isDeletingInProcess: true, hasDeletingFailed: false, error: '' },
    });
  });

  it('should handle deletingProductFailed', () => {
    expect(productsReducer(initialProductsState, deletingProductFailed(true, 'test error'))).toEqual({
      ...initialProductsState,
      deletingStatus: { isDeletingInProcess: false, hasDeletingFailed: true, error: 'test error' },
    });
  });

  it('should handle deletingProductSuccess', () => {
    expect(productsReducer(initialProductsState, deletingProductSuccess('test result message'))).toEqual({
      ...initialProductsState,
      deleteResult: 'test result message',
      deletingStatus: { isDeletingInProcess: false, hasDeletingFailed: false, error: '' },
    });
  });
});
