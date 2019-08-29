import { createAction } from 'redux-actions';
import { push } from 'connected-react-router';
import { submitOrder } from '../services/cart/cartService';

export const incrementQuantity = createAction('INCREMENT_PRODUCT_QTY', (productId, delta) => ({ productId, delta }));
export const decrementQuantity = createAction('DECREMENT_PRODUCT_QTY', (productId, delta) => ({ productId, delta: -delta }));
export const changeQuantity = createAction('CHANGE_PRODUCT_QTY', (productId, value) => ({ productId, value }));

export const addToCart = createAction('ADD_TO_CART', (product, quantity) => ({ product, quantity }));
export const deleteProductFromCart = createAction('DELETE_PRODUCT_FROM_CART', productId => productId);
export const clearCart = createAction('CLEAR_CART');

// SUBMIT CART ORDER
export const submittingOrderInProgress = createAction('SUBMITTING_ORDER_IN_PROGRESS', isInProgress => isInProgress);
export const submittingOrderFailed = createAction('SUBMITTING_ORDER_FAILED', (hasFailed, error) => ({ hasFailed, error }));
export const submittingOrderSuccess = createAction('SUBMITTING_ORDER_SUCCESS', resultMessage => resultMessage);

export const submitCartOrder = orderConfirmPath => (dispatch, getState) => {
  dispatch(submittingOrderInProgress(true));
  const { cart } = getState();
  return submitOrder(cart.cart)
    .then((response) => {
      if (!response.statusText === 'OK') {
        throw Error(response.statusText);
      }
      dispatch(submittingOrderInProgress(false));
      return response.data;
    })
    .then((resultMessage) => {
      dispatch(submittingOrderSuccess(resultMessage));
      dispatch(push(orderConfirmPath));
      dispatch(clearCart());
    })
    .catch((error) => {
      dispatch(submittingOrderInProgress(false));
      dispatch(submittingOrderFailed(true, error.message));

      // !!! FAKE LOGIC delete once get proper back-end app
      dispatch(push(orderConfirmPath));
      dispatch(clearCart());
    });
};

//  !!! createAction!s!() function DOESN'T WORK PROPERLY -  incrementQuantity, decrementQuantity, changeQuantity ARE ! UNDEFINED !
//  WHEN SYPPLIED TO A COMPONENT. ALSO I WAS UNABLE TO COMBINE incrementQuantity, decrementQuantity
//  WITH combineActions() - Error occurred

// export const {
//   addToCart,
//   incrementQuantity,
//   decrementQuantity,
//   changeQuantity,
//   deleteProductFromCart,
//   clearCart,
// } = createActions({
//   ADD_TO_CART: (productId, quantity) => ({ productId, quantity }),
//   INCREMENT_PRODUCT_QTY: (productId, delta) => ({ productId, delta }),
//   DECREMENT_PRODUCT_QTY: (productId, delta) => ({ productId, delta: -delta }),
//   CHANGE_PRODUCT_QTY: (productId, value) => ({ productId, value }),
//   DELETE_PRODUCT_FROM_CART: productId => ({ productId }),
//   CLEAR_CART: () => {},
// });
