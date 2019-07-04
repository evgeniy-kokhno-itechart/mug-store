import { createAction } from 'redux-actions';

export const addToCart = createAction('ADD_TO_CART', (productId, quantity) => ({ productId, quantity }));
export const incrementQuantity = createAction('INCREMENT_PRODUCT_QTY', (productId, delta) => ({ productId, delta }));
export const decrementQuantity = createAction('DECREMENT_PRODUCT_QTY', (productId, delta) => ({ productId, delta: -delta }));
export const changeQuantity = createAction('CHANGE_PRODUCT_QTY', (productId, value) => ({ productId, value }));
export const deleteProductFromCart = createAction('DELETE_PRODUCT_FROM_CART', productId => ({ productId }));
export const clearCart = createAction('CLEAR_CART', () => {});

//  !!! createActions() function DOESN'T WORK PROPERLY -  incrementQuantity, decrementQuantity, changeQuantity ARE ! UNDEFINED !
//  WHEN SYPPLIED IN A COMPONENT. ALSO I WAS UNABLE TO COMBINE incrementQuantity, decrementQuantity
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
