/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Cart } from '../../cart/containers/Cart';

configure({ adapter: new Adapter() });

describe('<Cart />', () => {
  let CartWrapper;

  beforeEach(() => {
    CartWrapper = shallow(<Cart cart={[]} />);
  });

  it('renders properly with default props', () => {
    expect(CartWrapper).toMatchSnapshot();
  });

  it('renders properly with cart array not empty', () => {
    CartWrapper.setProps({
      cart: [
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
      ],
    });
    expect(CartWrapper).toMatchSnapshot();
  });

  it('renders properly with not empty cart and currentUserName provided', () => {
    CartWrapper.setProps({
      cart: [
        {
          id: '1',
          imageURL: '#',
          title: 'test product 1',
          description: 'test product 1 description',
          currentCurrencyPrice: 5,
          quantity: 3,
        },
      ],
      currentUserName: 'test user',
    });
    expect(CartWrapper).toMatchSnapshot();
  });
});
