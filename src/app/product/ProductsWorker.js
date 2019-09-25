import { put, call } from 'redux-saga/effects';
import { push, replace } from 'connected-react-router';
import { productsActions } from './ProductsActions';
import ProductsService from './ProductsService';

export function* workerGetProduct(action) {
  try {
    yield put(productsActions.GetProduct.CallIsInProgress(true));
    const result = yield call(ProductsService.getProduct, action.payload);
    yield put(productsActions.GetProduct.Success(result.data));
  } catch (error) {
    yield put(productsActions.GetProduct.Failure(error.message));
    if (error.message.includes('404')) {
      yield put(replace('/not-found'));
    }
  }
}

export function* workerGetProducts() {
  try {
    yield put(productsActions.GetProducts.CallIsInProgress(true));
    const result = yield call(ProductsService.getProducts);
    yield put(productsActions.GetProducts.Success(result.data));
  } catch (error) {
    yield put(productsActions.GetProducts.Failure(error.message));
  }
}

export function* workerSaveProduct(action) {
  try {
    yield put(productsActions.SaveProduct.CallIsInProgress(true));
    const result = yield call(ProductsService.saveProduct, action.payload.product);
    yield put(productsActions.SaveProduct.Success(result.data));
    yield put(push(action.payload.redirectUrl));
  } catch (error) {
    // !!! FAKE LOGIC delete once get proper back-end app
    yield put(productsActions.SaveProduct.Success(`ERROR! ${error.message}`));
    yield put(push(action.payload.redirectUrl));
  }
}

export function* workerDeleteProduct(action) {
  try {
    yield put(productsActions.DeleteProduct.CallIsInProgress(true));
    const result = yield call(ProductsService.deleteProduct, action.payload);
    yield put(productsActions.DeleteProduct.Success(result.data));
  } catch (error) {
    yield put(productsActions.DeleteProduct.Failure(error.message));
  }
}
