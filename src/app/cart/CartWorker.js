import { put, call, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { cartActions } from './CartActions';
import CartService from './CartService';
import { productsInCartSelector } from './CartSelectors';

// eslint-disable-next-line import/prefer-default-export
export function* workerSubmitCart(action) {
  try {
    yield put(cartActions.SubmitCartOrder.CallIsInProgress(true));
    const cartState = yield select(productsInCartSelector);

    const result = yield call(CartService.submitOrder, cartState);
    yield put(cartActions.SubmitCartOrder.Success(result.data));
    yield put(push(action.payload));
  } catch (error) {
    yield put(cartActions.SubmitCartOrder.Failure(error.message));

    // !!! FAKE LOGIC delete once get proper back-end app
    yield put(push(action.payload));
    yield put(cartActions.ClearCart());
  }
}
