/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import OrderForm from '../../app/order/components/OrderForm';

configure({ adapter: new Adapter() });

describe('<OrderForm />', () => {
  let OrderFormWrapper;
  let onOrderSubmit;

  beforeEach(() => {
    onOrderSubmit = jest.fn();
  });

  it('renders properly with default props', () => {
    OrderFormWrapper = shallow(<OrderForm onSubmit={onOrderSubmit} />);
    expect(OrderFormWrapper).toMatchSnapshot();
  });

  it('renders properly with currentUser provided', () => {
    OrderFormWrapper = shallow(
      <OrderForm
        onSubmit={onOrderSubmit}
        currentUser={{
          id: 'test',
          address: 'test address',
          city: 'test city',
          country: 'test country',
          name: 'test usename',
          phone: '+000000000123',
          roles: [],
          username: 'user@user.com',
        }}
      />,
    );
    expect(OrderFormWrapper).toMatchSnapshot();
  });

  it('submits form properly after the from has been filled out', () => {
    OrderFormWrapper = shallow(<OrderForm onSubmit={onOrderSubmit} />);
    OrderFormWrapper.setState({
      data: {
        address: 'test address',
        city: 'test city',
        country: 'test country',
        name: 'test usename',
        phone: '+000000000123',
        comment: 'test comment',
      },
    });
    const form = OrderFormWrapper.find('form');
    form.simulate('submit', { preventDefault() {} });

    expect(onOrderSubmit).toHaveBeenCalled();
  });
});
