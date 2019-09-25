import { combineActions, handleActions } from 'redux-actions';
import initialCartState from './CartState';
import { cartActions } from './CartActions';

const incrementDecrementQuantity = combineActions(cartActions.IncrementQuantity, cartActions.DecrementQuantity);

const cartReducer = handleActions(
  {
    [cartActions.AddToCart]: (state, { payload: { product, quantity } }) => {
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

    [cartActions.ChangeQuantity]: (state, { payload: { productId, value } }) => {
      const newCart = [...state.cart];
      const index = newCart.findIndex(p => p.id === productId);
      const newProdInCart = { ...newCart[index] };
      newProdInCart.quantity = value;
      newCart[index] = newProdInCart;
      return { ...state, cart: [...newCart] };
    },

    [cartActions.DeleteFromCart]: (state, { payload: productId }) => {
      const newCart = [...state.cart];
      newCart.splice(newCart.findIndex(p => p.id === productId), 1);
      return { ...state, cart: [...newCart] };
    },

    // SUBMIT CART ORDER
    [cartActions.SubmitCartOrder.CallIsInProgress]: (state, { payload: isInProgress }) => ({
      ...state,
      submitOrderStatus: { isInProgress, hasFailed: false, error: '' },
    }),

    [cartActions.SubmitCartOrder.Failure]: (state, { payload: error }) => ({
      ...state,
      submitOrderStatus: { isInProgress: false, hasFailed: true, error },
    }),

    [cartActions.SubmitCartOrder.Success]: (state, { payload: resultMessage }) => ({
      ...state,
      submitResult: resultMessage, // added for future. will be empty because back-end is fake
      submitOrderStatus: { isInProgress: false, hasFailed: false, error: '' },
      cart: [],
    }),

    [cartActions.ClearCart]: state => ({ ...state, cart: [] }),
  },

  initialCartState,
);

export default cartReducer;
