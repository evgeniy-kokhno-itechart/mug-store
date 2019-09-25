import { takeEvery } from 'redux-saga/effects';
import { productsActions } from './ProductsActions';
import {
  workerGetProduct, workerGetProducts, workerSaveProduct, workerDeleteProduct,
} from './ProductsWorker';

export function* watchGetProduct() {
  yield takeEvery(productsActions.GetProduct.InitiateApiCall, workerGetProduct);
}

export function* watchGetProducts() {
  yield takeEvery(productsActions.GetProducts.InitiateApiCall, workerGetProducts);
}

export function* watchSaveProduct() {
  yield takeEvery(productsActions.SaveProduct.InitiateApiCall, workerSaveProduct);
}

export function* watchDeleteProduct() {
  yield takeEvery(productsActions.DeleteProduct.InitiateApiCall, workerDeleteProduct);
}
