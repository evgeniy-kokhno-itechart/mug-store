/* eslint-disable no-undef */
import CartService from '../../app/cart/CartService';

describe('Cart service', () => {
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

  it('should count products in cart', () => {
    expect(CartService.countProducts(fakeCart)).toEqual(8);
  });
});
