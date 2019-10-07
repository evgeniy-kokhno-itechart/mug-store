/* eslint-disable no-undef */
import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { push, replace } from 'connected-react-router';
import { productsActions } from '../../../app/product/ProductsActions';
import ProductsService from '../../../app/product/ProductsService';
import {
  workerGetProduct, workerGetProducts, workerSaveProduct, workerDeleteProduct,
} from '../../../app/product/ProductsWorker';

describe('product saga:', () => {
  const fakeProductsResponse = {
    data: [
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
    ],
  };
  const fakeProducts = fakeProductsResponse.data;

  const fakeProductResponse = { data: fakeProducts[0] };
  const fakeProduct = fakeProductResponse.data;


  const fakeError = new Error('error');
  const fakeError404 = new Error('404 Error');
  const fakeProductId = '123';

  const fakeResultResponse = { data: 'OK' };
  const fakeResult = fakeResultResponse.data;

  const fakeSavePayloadObject = { product: fakeProduct, redirectUrl: 'testurl' };

  // GET PRODUCT
  it('workerGetProduct fetch product and dispatches successfull result within product', () => (
    expectSaga(workerGetProduct, productsActions.GetProduct.InitiateApiCall(fakeProductId))
      .provide([[call(ProductsService.getProduct, fakeProductId), fakeProductResponse]])
      .put(productsActions.GetProduct.CallIsInProgress(true))
      .call(ProductsService.getProduct, fakeProductId)
      .put(productsActions.GetProduct.Success(fakeProduct))
      .run(1000)));

  it('workerGetProduct fetch product and dispatches non 404 error result within error message', () => (
    expectSaga(workerGetProduct, productsActions.GetProduct.InitiateApiCall(fakeProductId))
      .provide([[call(ProductsService.getProduct, fakeProductId), throwError(fakeError)]])
      .put(productsActions.GetProduct.CallIsInProgress(true))
      .call(ProductsService.getProduct, fakeProductId)
      .put(productsActions.GetProduct.Failure(fakeError.message))
      .run(1000)));

  it('workerGetProduct fetch product and dispatches 404 error result within error message', () => (
    expectSaga(workerGetProduct, productsActions.GetProduct.InitiateApiCall(fakeProductId))
      .provide([[call(ProductsService.getProduct, fakeProductId), throwError(fakeError404)]])
      .put(productsActions.GetProduct.CallIsInProgress(true))
      .call(ProductsService.getProduct, fakeProductId)
      .put(productsActions.GetProduct.Failure(fakeError404.message))
      .put(replace('/not-found'))
      .run(1000)));

  // GET PRODUCTS
  it('workerGetProducts fetch products and dispatches successfull result within products', () => (
    expectSaga(workerGetProducts)
      .provide([[call(ProductsService.getProducts), fakeProductsResponse]])
      .put(productsActions.GetProducts.CallIsInProgress(true))
      .call(ProductsService.getProducts)
      .put(productsActions.GetProducts.Success(fakeProducts))
      .run(1000)
  ));

  it('workerGetProducts fetch products and dispatches error result within error message', () => (
    expectSaga(workerGetProducts)
      .provide([[call(ProductsService.getProducts), throwError(fakeError)]])
      .put(productsActions.GetProducts.CallIsInProgress(true))
      .call(ProductsService.getProducts)
      .put(productsActions.GetProducts.Failure(fakeError.message))
      .run(1000)
  ));

  // SAVE PRODUCT
  it('workerSaveProduct saves product and dispatches successfull result within message', () => (
    expectSaga(workerSaveProduct, productsActions.SaveProduct.InitiateApiCall(fakeSavePayloadObject))
      .provide([[call(ProductsService.saveProduct, fakeSavePayloadObject.product), fakeResultResponse]])
      .put(productsActions.SaveProduct.CallIsInProgress(true))
      .call(ProductsService.saveProduct, fakeSavePayloadObject.product)
      .put(productsActions.SaveProduct.Success(fakeResult))
      .put(push(fakeSavePayloadObject.redirectUrl))
      .run(1000)
  ));

  it('workerSaveProduct saves product and dispatches error result within error', () => (
    expectSaga(workerSaveProduct, productsActions.SaveProduct.InitiateApiCall(fakeSavePayloadObject))
      .provide([[call(ProductsService.saveProduct, fakeSavePayloadObject.product), throwError(fakeError)]])
      .put(productsActions.SaveProduct.CallIsInProgress(true))
      .call(ProductsService.saveProduct, fakeSavePayloadObject.product)

      // !!! FAKE LOGIC delete once get proper back-end app
      .put(productsActions.SaveProduct.Success(`ERROR! ${fakeError.message}`))
      .put(push(fakeSavePayloadObject.redirectUrl))
      .run(1000)
  ));

  // DELETE PRODUCT
  it('workerDeleteProduct deletes product and dispatches successfull result within message', () => (
    expectSaga(workerDeleteProduct, productsActions.DeleteProduct.InitiateApiCall(fakeProductId))
      .provide([[call(ProductsService.deleteProduct, fakeProductId), fakeResultResponse]])
      .put(productsActions.DeleteProduct.CallIsInProgress(true))
      .call(ProductsService.deleteProduct, fakeProductId)
      .put(productsActions.DeleteProduct.Success(fakeResult))
      .run(1000)
  ));

  it('workerDeleteProduct deletes product and dispatches error result within error', () => (
    expectSaga(workerDeleteProduct, productsActions.DeleteProduct.InitiateApiCall(fakeProductId))
      .provide([[call(ProductsService.deleteProduct, fakeProductId), throwError(fakeError)]])
      .put(productsActions.DeleteProduct.CallIsInProgress(true))
      .call(ProductsService.deleteProduct, fakeProductId)
      .put(productsActions.DeleteProduct.Failure(fakeError.message))
      .run(1000)
  ));
});
