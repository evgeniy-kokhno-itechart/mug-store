/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import OrderConfirmation from '../../app/order/components/OrderConfirmation/OrderConfirmation';

configure({ adapter: new Adapter() });

describe('<OrderConfirmation />', () => {
  let OrderConfirmationWrapper;

  beforeEach(() => {
    OrderConfirmationWrapper = shallow(<OrderConfirmation />);
  });

  it('check OrderConfirmation renders properly', () => {
    expect(OrderConfirmationWrapper).toMatchSnapshot();
  });
});
