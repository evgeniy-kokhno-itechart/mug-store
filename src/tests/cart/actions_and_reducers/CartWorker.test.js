/* eslint-disable no-undef */
import { call, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { cartActions } from '../../../app/cart/CartActions';
import CartService from '../../../app/cart/CartService';
import { productsInCartSelector } from '../../../app/cart/CartSelectors';
import { workerSubmitCart } from '../../../app/cart/CartWorker';

describe('workerSubmitCart saga', () => {
  const fakeCart = [
    {
      id: '1',
      imageURL: '#',
      title: 'test product 1',
      description: 'test product 1 description',
      currentCurrencyPrice: 5,
      quantity: 3,
    },
    {
      id: '2',
      imageURL: '#',
      title: 'test product 2',
      description: 'test product 2 description',
      currentCurrencyPrice: 10,
      quantity: 5,
    },
  ];
  const fakeResult = { data: 'OK' };
  const fakeError = new Error('error');
  const fakeUrl = 'redirecturltest';

  it('submits cart order and dispatches successfull result', () => (
    expectSaga(workerSubmitCart, cartActions.SubmitCartOrder.InitiateApiCall(fakeUrl))
      .provide([[select(productsInCartSelector), fakeCart], [call(CartService.submitOrder, fakeCart), fakeResult]])
      .put(cartActions.SubmitCartOrder.CallIsInProgress(true))
      .select(productsInCartSelector)
      .call(CartService.submitOrder, fakeCart)
      .put(cartActions.SubmitCartOrder.Success(fakeResult.data))
      .put(push(fakeUrl))
      .run()));

  it('submits cart order and dispatches error result', () => (
    expectSaga(workerSubmitCart, cartActions.SubmitCartOrder.InitiateApiCall(fakeUrl))
      .provide([[select(productsInCartSelector), fakeCart], [call(CartService.submitOrder, fakeCart), throwError(fakeError)]])
      .put(cartActions.SubmitCartOrder.CallIsInProgress(true))
      .select(productsInCartSelector)
      .call(CartService.submitOrder, fakeCart)
      .put(cartActions.SubmitCartOrder.Failure(fakeError.message))
    // !!! FAKE LOGIC delete once get proper back-end app
      .put(push(fakeUrl))
      .put(cartActions.ClearCart())
      .run()));
});
