import { handleActions } from 'redux-actions';
import initialCartState from './CartState';
import { cartActions } from './CartActions';

const cartReducer = handleActions(
  {
    [cartActions.AddToCart]: (state, { payload: product }) => {
      const newCart = [...state.cart];

      const index = newCart.findIndex(item => item.id === product.id);
      if (index >= 0) { // if product already exists
        const newProduct = { ...newCart[index] };
        newProduct.quantity++;
        newCart[index] = newProduct;
      } else {
        newCart.push({ ...product, quantity: 1 });
      }
      return { ...state, cart: [...newCart] };
    },

    [cartActions.ChangeQuantity]: (state, { payload: product }) => {
      const index = state.cart.findIndex(p => p.id === product.id);
      const newCart = [...state.cart];
      newCart[index] = product;
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
