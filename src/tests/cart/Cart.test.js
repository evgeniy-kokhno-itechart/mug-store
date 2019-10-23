/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Cart } from '../../app/cart/containers/Cart/Cart';

configure({ adapter: new Adapter() });

describe('<Cart />', () => {
  let CartWrapper;
  let changeQuantity;
  let deleteProductFromCart;


  beforeEach(() => {
    changeQuantity = jest.fn();
    deleteProductFromCart = jest.fn();

    CartWrapper = shallow(
      <Cart
        cart={{ products: [], totalCost: 0 }}
        changeQuantity={changeQuantity}
        deleteProductFromCart={deleteProductFromCart}
      />,
    );
  });

  it('renders properly with default props', () => {
    expect(CartWrapper).toMatchSnapshot();
  });

  it('renders properly with cart array not empty', () => {
    CartWrapper.setProps({
      cart: {
        products: [
          {
            id: '1',
            imageURL: '#',
            title: 'test product 1',
            description: 'test product 1 description',
            currentCurrencyCost: 5,
            quantity: 3,
          },
          {
            id: '2',
            imageURL: '#',
            title: 'test product 2',
            description: 'test product 2 description',
            currentCurrencyCost: 10,
            quantity: 5,
          },
        ],
        totalCost: 15,
      },
    });
    expect(CartWrapper).toMatchSnapshot();
  });

  it('renders properly with not empty cart and currentUserName provided', () => {
    CartWrapper.setProps({
      cart: {
        products: [
          {
            id: '1',
            imageURL: '#',
            title: 'test product 1',
            description: 'test product 1 description',
            currentCurrencyCost: 5,
            quantity: 3,
          },
        ],
        totalCost: 5,
      },
      currentUserName: 'test user',
    });
    expect(CartWrapper).toMatchSnapshot();
  });
});
