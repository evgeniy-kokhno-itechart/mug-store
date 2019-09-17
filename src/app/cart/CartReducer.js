import { combineActions, handleActions } from 'redux-actions';
import initialCartState from './CartState';
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  changeQuantity,
  deleteProductFromCart,
  clearCart,
  submittingOrderInProgress,
  submittingOrderFailed,
  submittingOrderSuccess,
} from './CartActions';

const incrementDecrementQuantity = combineActions(incrementQuantity, decrementQuantity);

const cartReducer = handleActions(
  {
    [addToCart]: (state, { payload: { product, quantity } }) => {
      const id = product.id.toString();
      const newCart = [...state.cart];
      const existedProduct = newCart.find(item => item.id === id);
      if (existedProduct) {
        existedProduct.quantity += parseInt(quantity, 10);
      } else {
        newCart.push({ ...product, quantity });
      }
      return { ...state, cart: [...newCart] };
    },

    [incrementDecrementQuantity]: (state, { payload: { productId, delta } }) => {
      const newCart = [...state.cart];
      const prodInCart = newCart.find(p => p.id === productId);
      if (prodInCart.quantity > 1 || delta > 0) {
        prodInCart.quantity += delta;
      }
      return { ...state, cart: [...newCart] };
    },

    [changeQuantity]: (state, { payload: { productId, value } }) => {
      const newCart = [...state.cart];
      const index = newCart.findIndex(p => p.id === productId);
      const newProdInCart = { ...newCart[index] };
      newProdInCart.quantity = value;
      newCart[index] = newProdInCart;
      return { ...state, cart: [...newCart] };
    },

    [deleteProductFromCart]: (state, { payload: productId }) => {
      const newCart = [...state.cart];
      newCart.splice(newCart.findIndex(p => p.id === productId), 1);
      return { ...state, cart: [...newCart] };
    },

    // SUBMIT CART ORDER
    [submittingOrderInProgress]: (state, { payload: isInProgress }) => ({
      ...state,
      submitOrderStatus: { isInProgress, hasFailed: false, error: '' },
    }),

    [submittingOrderFailed]: (state, { payload: { hasFailed, error } }) => ({
      ...state,
      submitOrderStatus: { isInProgress: false, hasFailed, error },
    }),

    [submittingOrderSuccess]: (state, { payload: resultMessage }) => ({
      ...state,
      submitResult: resultMessage, // added for future. will be empty because back-end is fake
      submitOrderStatus: { isInProgress: false, hasFailed: false, error: '' },
    }),

    [clearCart]: state => ({ ...state, cart: [] }),
  },

  initialCartState,
);

export default cartReducer;
