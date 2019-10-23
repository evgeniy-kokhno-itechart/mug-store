/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Order } from '../../app/order/containers/Order/Order';

configure({ adapter: new Adapter() });

describe('<Order />', () => {
  let OrderWrapper;
  const fakeCart = {
    products: [{ id: '1', title: 'test product 1' }, { id: '2', title: 'test product 2' }],
    totalCost: 10,
  };

  beforeEach(() => {
    const submitCartOrder = jest.fn();
    OrderWrapper = shallow(
      <Order cart={fakeCart} submitCartOrder={submitCartOrder} />,
    );
  });

  it('renders properly with default props', () => {
    expect(OrderWrapper).toMatchSnapshot();
  });
});
