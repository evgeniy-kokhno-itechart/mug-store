/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Order } from '../../order/containers/Order';

configure({ adapter: new Adapter() });

describe('<Order />', () => {
  let OrderWrapper;

  beforeEach(() => {
    const submitCartOrder = jest.fn();
    OrderWrapper = shallow(
      <Order cart={[{ id: '1', title: 'test product 1' }, { id: '2', title: 'test product 2' }]} submitCartOrder={submitCartOrder} />,
    );
  });

  it('renders properly with default props', () => {
    expect(OrderWrapper.debug()).toMatchSnapshot();
  });
});
