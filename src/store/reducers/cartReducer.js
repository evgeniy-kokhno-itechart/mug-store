import * as actionTypes from '../actions';

const initialState = {
  cart: [],
};

const changeProductQuantity = (cart, productId, newValue = 1, delta) => {
  const prodInCart = cart.find(p => p._id === productId);

  if (newValue) {
    prodInCart.qty = newValue;
  } else if (prodInCart.qty > 1 || delta > 0) {
    prodInCart.qty += delta;
  }
  return cart;
};

const cartReducer = (state = initialState, action) => {
  const { cart } = state;

  switch (action.type) {
    case actionTypes.ADD_TO_CART: {
      const { product, quantity } = action.cart;

      const id = product._id.toString();
      const existedProduct = cart.find(prod => prod._id === id);
      if (existedProduct) {
        existedProduct.qty += parseInt(quantity, 10);
      } else {
        cart.push({ _id: id, qty: quantity });
      }

      return { ...state, cart: [...cart] };
    }

    case actionTypes.INCREMENT_PRODUCT_QTY: {
      const newCart = changeProductQuantity(cart, action.productId, null, 1);
      return { ...state, cart: [...newCart] };
    }

    case actionTypes.DECREMENT_PRODUCT_QTY: {
      const newCart = changeProductQuantity(cart, action.productId, null, -1);
      return { ...state, cart: [...newCart] };
    }

    case actionTypes.CHANGE_PRODUCT_QTY: {
      const { value, productId } = action.details;
      const newCart = changeProductQuantity(cart, productId, value);
      return { ...state, cart: [...newCart] };
    }

    case actionTypes.DELETE_PRODUCT_FROM_CART: {
      const { productId } = action;
      const newCart = state.cart;
      newCart.splice(newCart.findIndex(p => p._id === productId), 1);
      return { ...state, cart: [...newCart] };
    }

    case actionTypes.CLEAR_CART: {
      return { ...state, cart: [] };
    }

    default:
      return state;
  }
};

export default cartReducer;
