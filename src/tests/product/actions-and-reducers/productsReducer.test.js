/* eslint-disable no-undef */
import productsReducer from '../../../app/product/ProductsReducer';
import initialProductsState from '../../../app/product/ProductsState';
import { productsActions } from '../../../app/product/ProductsActions';

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
  it('should handle productsActions.GetProducts.CallIsInProgress', () => {
    expect(productsReducer(initialProductsState, productsActions.GetProducts.CallIsInProgress(true))).toEqual({
      ...initialProductsState,
      catalogProductsStatus: { isInProcess: true, hasFailed: false, error: '' },
    });
  });

  it('should handle productsActions.GetProducts.Failure', () => {
    expect(productsReducer(initialProductsState, productsActions.GetProducts.Failure('test error'))).toEqual({
      ...initialProductsState,
      catalogProductsStatus: { isInProcess: false, hasFailed: true, error: 'test error' },
    });
  });

  it('should handle productsActions.GetProducts.Success', () => {
    expect(productsReducer(initialProductsState, productsActions.GetProducts.Success(fakeProducts))).toEqual({
      ...initialProductsState,
      products: fakeProducts,
      catalogProductsStatus: { isInProcess: false, hasFailed: false, error: '' },
    });
  });

  //  GET PRODUCT BY ID
  it('should handle productsActions.ClearCurrentProductInfo', () => {
    expect(productsReducer(initialProductsState, productsActions.ClearCurrentProductInfo())).toEqual({
      ...initialProductsState,
      currentProduct: initialProductsState.currentProduct,
      currentProductStatus: initialProductsState.currentProductStatus,
    });
  });

  it('should handle productsActions.GetProduct.CallIsInProgress', () => {
    expect(productsReducer(initialProductsState, productsActions.GetProduct.CallIsInProgress(true))).toEqual({
      ...initialProductsState,
      currentProductStatus: { isInProcess: true, hasFailed: false, error: '' },
    });
  });

  it('should handle productsActions.GetProduct.Failure', () => {
    expect(productsReducer(initialProductsState, productsActions.GetProduct.Failure('test error'))).toEqual({
      ...initialProductsState,
      currentProductStatus: { isInProcess: false, hasFailed: true, error: 'test error' },
    });
  });

  it('should handle productsActions.GetProduct.Success', () => {
    expect(productsReducer(initialProductsState, productsActions.GetProduct.Success(fakeProducts[0]))).toEqual({
      ...initialProductsState,
      currentProduct: fakeProducts[0],
      currentProductStatus: { isInProcess: false, hasFailed: false, error: '' },
    });
  });

  // SAVE PRODUCT
  it('should handle productsActions.SaveProduct.CallIsInProgress', () => {
    expect(productsReducer(initialProductsState, productsActions.SaveProduct.CallIsInProgress(true))).toEqual({
      ...initialProductsState,
      savingStatus: { isInProcess: true, hasFailed: false, error: '' },
    });
  });

  it('should handle productsActions.SaveProduct.Failure', () => {
    expect(productsReducer(initialProductsState, productsActions.SaveProduct.Failure('test error'))).toEqual({
      ...initialProductsState,
      savingStatus: { isInProcess: false, hasFailed: true, error: 'test error' },
    });
  });

  it('should handle productsActions.SaveProduct.Success with updatedProduct provided', () => {
    expect(productsReducer(initialProductsState, productsActions.SaveProduct.Success({
      resultMessage: 'test result message', updatedProduct: fakeProducts[0],
    })))
      .toEqual({
        ...initialProductsState,
        saveResult: 'test result message',
        currentProduct: fakeProducts[0],
        savingStatus: { isInProcess: false, hasFailed: false, error: '' },
      });
  });

  it('should handle productsActions.SaveProduct.Success with updatedProduct null', () => {
    expect(productsReducer(initialProductsState, productsActions.SaveProduct.Success({
      resultMessage: 'test result message', updatedProduct: null,
    })))
      .toEqual({
        ...initialProductsState,
        saveResult: 'test result message',
        savingStatus: { isInProcess: false, hasFailed: false, error: '' },
      });
  });

  // DELETE PRODUCT
  it('should handle productsActions.DeleteProduct.CallIsInProgress', () => {
    expect(productsReducer(initialProductsState, productsActions.DeleteProduct.CallIsInProgress(true))).toEqual({
      ...initialProductsState,
      deletingStatus: { isInProcess: true, hasFailed: false, error: '' },
    });
  });

  it('should handle productsActions.DeleteProduct.Failure', () => {
    expect(productsReducer(initialProductsState, productsActions.DeleteProduct.Failure('test error'))).toEqual({
      ...initialProductsState,
      deletingStatus: { isInProcess: false, hasFailed: true, error: 'test error' },
    });
  });

  it('should handle productsActions.DeleteProduct.Success', () => {
    expect(productsReducer(initialProductsState, productsActions.DeleteProduct.Success('test result message'))).toEqual({
      ...initialProductsState,
      deleteResult: 'test result message',
      deletingStatus: { isInProcess: false, hasFailed: false, error: '' },
    });
  });
});
