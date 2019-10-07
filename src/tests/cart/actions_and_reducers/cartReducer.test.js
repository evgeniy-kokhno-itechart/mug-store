/* eslint-disable no-undef */
import cartReducer from '../../../app/cart/CartReducer';
import initialCartState from '../../../app/cart/CartState';
import { cartActions } from '../../../app/cart/CartActions';

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

  it('should handle cartActions.AddToCart with brand new product', () => {
    const newProduct = {
      id: '3',
      imageURL: '#',
      title: 'test product 3',
      description: 'test product 3 description',
      currentCurrencyPrice: 10,
    };

    expect(cartReducer(cartState, cartActions.AddToCart(newProduct))).toEqual({
      ...cartState,
      cart: [...fakeCart, { ...newProduct, quantity: 1 }],
    });
  });

  it('should handle cartActions.AddToCart with an existed product', () => {
    const newProduct = fakeCart[0];

    const newCart = [...fakeCart];
    const prod0WithIncreasedQuantity = { ...newCart[0] };
    prod0WithIncreasedQuantity.quantity++;
    newCart[0] = prod0WithIncreasedQuantity;

    expect(cartReducer(cartState, cartActions.AddToCart(newProduct))).toEqual({
      ...cartState,
      cart: newCart,
    });
  });

  it('should handle cartActions.ChangeQuantity with new value', () => {
    const newQuantityValue = 100;
    const newCart = [...fakeCart];
    const prod0WithCangedQuantity = { ...newCart[0] };
    prod0WithCangedQuantity.quantity = newQuantityValue;
    newCart[0] = prod0WithCangedQuantity;

    expect(cartReducer(cartState, cartActions.ChangeQuantity(prod0WithCangedQuantity))).toEqual({
      ...cartState,
      cart: newCart,
    });
  });

  it('should handle cartActions.DeleteFromCart', () => {
    const newCart = [...fakeCart];
    newCart.splice(0, 1); // delete the 1st product with id==='1'

    expect(cartReducer(cartState, cartActions.DeleteFromCart('1'))).toEqual({
      ...cartState,
      cart: newCart,
    });
  });

  it('should handle cartActions.ClearCart', () => {
    expect(cartReducer(cartState, cartActions.ClearCart())).toEqual({
      ...cartState,
      cart: [],
    });
  });

  it('should handle cartActions.SubmitCartOrder.CallIsInProgress', () => {
    expect(cartReducer(initialCartState, cartActions.SubmitCartOrder.CallIsInProgress(true))).toEqual({
      ...initialCartState,
      submitOrderStatus: { isInProgress: true, hasFailed: false, error: '' },
    });
  });

  it('should handle cartActions.SubmitCartOrder.Failure', () => {
    expect(cartReducer(initialCartState, cartActions.SubmitCartOrder.Failure('test error'))).toEqual({
      ...initialCartState,
      submitOrderStatus: { isInProgress: false, hasFailed: true, error: 'test error' },
    });
  });

  it('should handle cartActions.SubmitCartOrder.Success', () => {
    expect(cartReducer(initialCartState, cartActions.SubmitCartOrder.Success('test result message'))).toEqual({
      ...initialCartState,
      submitResult: 'test result message',
      submitOrderStatus: { isInProgress: false, hasFailed: false, error: '' },
    });
  });
});
