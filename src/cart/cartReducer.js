import * as cartActionTypes from './cartActions';
import initialCartState from './cartState';

const changeProductQuantityWithDelta = (cart, productId, delta) => {
  const prodInCart = cart.find(p => p._id === productId);
  if (prodInCart.qty > 1 || delta > 0) {
    prodInCart.qty += delta;
  }
  return cart;
};

const editProductQuantity = (cart, productId, newQuantity) => {
  const prodInCart = cart.find(p => p._id === productId);
  prodInCart.qty = newQuantity;
};

const cartReducer = (state = initialCartState, action) => {
  const { cart } = state;

  switch (action.type) {
    case cartActionTypes.ADD_TO_CART: {
      const { productId, quantity } = action.cart;

      const id = productId.toString();
      const updatedCart = [...cart];
      const existedProduct = updatedCart.find(item => item._id === id);
      if (existedProduct) {
        existedProduct.qty += parseInt(quantity, 10);
      } else {
        updatedCart.push({ _id: id, qty: quantity });
      }

      return { ...state, cart: [...updatedCart] };
    }

    case cartActionTypes.INCREMENT_PRODUCT_QTY: {
      const newCart = changeProductQuantityWithDelta(cart, action.productId, 1);
      return { ...state, cart: [...newCart] };
    }

    case cartActionTypes.DECREMENT_PRODUCT_QTY: {
      const newCart = changeProductQuantityWithDelta(cart, action.productId, -1);
      return { ...state, cart: [...newCart] };
    }

    case cartActionTypes.CHANGE_PRODUCT_QTY: {
      const { value, productId } = action.details;
      const newCart = editProductQuantity(cart, productId, value);
      return { ...state, cart: [...newCart] };
    }

    case cartActionTypes.DELETE_PRODUCT_FROM_CART: {
      const { productId } = action;
      const newCart = state.cart;
      newCart.splice(newCart.findIndex(p => p._id === productId), 1);
      return { ...state, cart: [...newCart] };
    }

    case cartActionTypes.CLEAR_CART: {
      return { ...state, cart: [] };
    }

    default:
      return state;
  }
};

export default cartReducer;
