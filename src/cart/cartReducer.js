import { combineActions, handleActions } from 'redux-actions';
import initialCartState from './cartState';
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  changeQuantity,
  deleteProductFromCart,
  clearCart,
  recalculateCartProductPrices,
} from './cartActions';

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

    [deleteProductFromCart]: (state, { payload: { productId } }) => {
      const newCart = [...state.cart];
      newCart.splice(newCart.findIndex(p => p.id === productId), 1);
      return { ...state, cart: [...newCart] };
    },

    [recalculateCartProductPrices]: (state, { payload: currencyRate }) => {
      const { cart } = state;
      const newProducts = cart.map((product) => {
        const newCurrentCurrencyPrice = +(product.basePrice * currencyRate * product.quantity * (1 - product.discount / 100)).toFixed(1);
        const newProduct = { ...product };
        newProduct.currentCurrencyPrice = newCurrentCurrencyPrice;
        return newProduct;
      });
      return { ...state, cart: newProducts };
    },

    [clearCart]: state => ({ ...state, cart: [] }),
  },

  initialCartState,
);

export default cartReducer;
