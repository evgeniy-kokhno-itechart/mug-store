import * as actionTypes from "../actions";

const initialState = {
  cart: []
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART: {
      const { product, quantity } = action.cart;
      const cart = state.cart;
      // console.log("cartReducer state.cart", cart);
      const id = product._id.toString();
      const existedProduct = cart.find(prod => prod._id === id);
      // console.log("existedProduct", existedProduct);
      if (existedProduct)
        existedProduct.qty = existedProduct.qty + parseInt(quantity);
      else cart.push({ _id: id, qty: quantity });
      // console.log("cart in the end of reducer", cart);
      return { ...state, cart: [...cart] };
    }
    case actionTypes.INCREMENT_PRODUCT_QTY: {
      let cart = state.cart;
      // console.log("INCREMENT action", action);
      const newCart = changeProductQuantity(cart, action.productId, null, 1);
      return { ...state, cart: [...newCart] };
    }
    case actionTypes.DECREMENT_PRODUCT_QTY: {
      let cart = state.cart;
      const newCart = changeProductQuantity(cart, action.productId, null, -1);
      return { ...state, cart: [...newCart] };
    }
    case actionTypes.CHANGE_PRODUCT_QTY: {
      let cart = state.cart;
      const { value, productId } = action.details;
      // console.log("action!!!", action);
      const newCart = changeProductQuantity(cart, productId, value);
      return { ...state, cart: [...newCart] };
    }
    case actionTypes.DELETE_PRODUCT_FROM_CART: {
      const { productId } = action;
      let newCart = state.cart;
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

const changeProductQuantity = (cart, productId, newValue = 1, delta) => {
  // console.log("changeProductQuantity method. cart", cart);
  let prodInCart = cart.find(p => p._id === productId);
  // console.log("prodInCart", [prodInCart, productId]);
  if (newValue) {
    prodInCart.qty = newValue;
  } else {
    if (prodInCart.qty > 1 || delta > 0) {
      prodInCart.qty += delta;
    }
  }
  return cart;
};

export default cartReducer;
