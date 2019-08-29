/* eslint-disable no-undef */
import cartReducer from '../../../cart/cartReducer';
import initialCartState from '../../../cart/cartState';
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
} from '../../../cart/cartActions';

describe('cart reducer', () => {
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
  const cartState = { cart: fakeCart, submitOrderStatus: { isInProgress: false, hasFailed: false, error: '' } };

  it('should return the initial state', () => {
    expect(cartReducer(initialCartState, {})).toEqual(initialCartState);
  });

  it('should handle addToCart with brand new product', () => {
    const newProduct = {
      id: '3',
      imageURL: '#',
      title: 'test product 3',
      description: 'test product 3 description',
      currentCurrencyPrice: 10,
    };

    expect(cartReducer(cartState, addToCart(newProduct, 1))).toEqual({
      ...cartState,
      cart: [...fakeCart, { ...newProduct, quantity: 1 }],
    });
  });

  it('should handle addToCart with an existed product', () => {
    const newProduct = fakeCart[0];

    const newCart = [...fakeCart];
    const prod0WithIncreasedQuantity = { ...newCart[0] };
    prod0WithIncreasedQuantity.quantity++;
    newCart[0] = prod0WithIncreasedQuantity;

    expect(cartReducer(cartState, addToCart(newProduct, 1))).toEqual({
      ...cartState,
      cart: newCart,
    });
  });

  it('should handle incrementQuantity by 1', () => {
    const newCart = [...fakeCart];
    const prod0WithIncreasedQuantity = { ...newCart[0] };
    prod0WithIncreasedQuantity.quantity++;
    newCart[0] = prod0WithIncreasedQuantity;

    expect(cartReducer(cartState, incrementQuantity('1', 1))).toEqual({
      ...cartState,
      cart: newCart,
    });
  });

  it('should handle decrementQuantity by 1', () => {
    const newCart = [...fakeCart];
    const prod0WithDecreasedQuantity = { ...newCart[0] };
    prod0WithDecreasedQuantity.quantity--;
    newCart[0] = prod0WithDecreasedQuantity;

    expect(cartReducer(cartState, decrementQuantity('1', 1))).toEqual({
      ...cartState,
      cart: newCart,
    });
  });

  it('should handle changeQuantity with new value', () => {
    const newQuantityValue = 100;
    const newCart = [...fakeCart];
    const prod0WithCangedQuantity = { ...newCart[0] };
    prod0WithCangedQuantity.quantity = newQuantityValue;
    newCart[0] = prod0WithCangedQuantity;

    expect(cartReducer(cartState, changeQuantity('1', newQuantityValue))).toEqual({
      ...cartState,
      cart: newCart,
    });
  });

  it('should handle deleteProductFromCart', () => {
    const newCart = [...fakeCart];
    newCart.splice(0, 1); // delete the 1st product with id==='1'

    expect(cartReducer(cartState, deleteProductFromCart('1'))).toEqual({
      ...cartState,
      cart: newCart,
    });
  });

  it('should handle clearCart', () => {
    expect(cartReducer(cartState, clearCart())).toEqual({
      ...cartState,
      cart: [],
    });
  });

  it('should handle submittingOrderInProgress', () => {
    expect(cartReducer(initialCartState, submittingOrderInProgress(true))).toEqual({
      ...initialCartState,
      submitOrderStatus: { isInProgress: true, hasFailed: false, error: '' },
    });
  });

  it('should handle submittingOrderFailed', () => {
    expect(cartReducer(initialCartState, submittingOrderFailed(true, 'test error'))).toEqual({
      ...initialCartState,
      submitOrderStatus: { isInProgress: false, hasFailed: true, error: 'test error' },
    });
  });

  it('should handle submittingOrderSuccess', () => {
    expect(cartReducer(initialCartState, submittingOrderSuccess('test result message'))).toEqual({
      ...initialCartState,
      submitResult: 'test result message',
      submitOrderStatus: { isInProgress: false, hasFailed: false, error: '' },
    });
  });
});
