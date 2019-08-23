/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { CartTable } from '../../cart/containers/CartTable';

configure({ adapter: new Adapter() });

describe('<CartTable />', () => {
  let CartTableWrapper;
  let incrementQuantity;
  let decrementQuantity;
  let changeQuantity;
  let deleteProductFromCart;

  beforeEach(() => {
    incrementQuantity = jest.fn();
    decrementQuantity = jest.fn();
    changeQuantity = jest.fn();
    deleteProductFromCart = jest.fn();

    CartTableWrapper = shallow(
      <CartTable
        isCurrencyLoading
        productsInCart={[
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
        ]}
        sortColumn="id"
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
        changeQuantity={changeQuantity}
        deleteProductFromCart={deleteProductFromCart}
      />,
    );
  });

  it('renders properly with default props', () => {
    expect(CartTableWrapper).toMatchSnapshot();
  });
});