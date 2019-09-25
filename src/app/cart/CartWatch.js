import { takeEvery } from 'redux-saga/effects';
import { cartActions } from './CartActions';
import { workerSubmitCart } from './CartWorker';

// eslint-disable-next-line import/prefer-default-export
export function* watchSubmitCart() {
  yield takeEvery(cartActions.SubmitCartOrder.InitiateApiCall, workerSubmitCart);
}
