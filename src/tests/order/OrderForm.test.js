/* eslint-disable no-undef */
import React from 'react';

import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import OrderForm from '../../order/containers/OrderForm';

configure({ adapter: new Adapter() });

describe('<OrderForm />', () => {
  let OrderFormWrapper;
  let onOrderSubmit;

  beforeEach(() => {
    onOrderSubmit = jest.fn();
  });

  it('renders properly with default props', () => {
    OrderFormWrapper = shallow(<OrderForm onOrderSubmit={onOrderSubmit} />);
    expect(OrderFormWrapper).toMatchSnapshot();
  });

  it('renders properly with default props', () => {
    OrderFormWrapper = shallow(<OrderForm onOrderSubmit={onOrderSubmit} />);
    OrderFormWrapper.setProps({
      currentUser: {
        id: 'test',
        address: 'test address',
        city: 'test city',
        country: 'test country',
        name: 'test usename',
        phone: '+000000000123',
        roles: [],
        username: 'user@user.com',
      },
    });
    expect(OrderFormWrapper).toMatchSnapshot();
  });

  it('rerenders with updated state on name input change', () => {
    OrderFormWrapper = mount(<OrderForm onOrderSubmit={onOrderSubmit} />);
    const input = OrderFormWrapper.find('#name');
    input.simulate('change', { target: { name: 'name', value: 'test name' } });

    expect(OrderFormWrapper.state('data').name).toBe('test name');
  });

  it('rerenders with updated state on country input change', () => {
    OrderFormWrapper = mount(<OrderForm onOrderSubmit={onOrderSubmit} />);
    const input = OrderFormWrapper.find('#country');
    input.simulate('change', { target: { name: 'country', value: 'test country' } });

    expect(OrderFormWrapper.state('data').country).toBe('test country');
  });

  it('rerenders with updated state on city input change', () => {
    OrderFormWrapper = mount(<OrderForm onOrderSubmit={onOrderSubmit} />);
    const input = OrderFormWrapper.find('#city');
    input.simulate('change', { target: { name: 'city', value: 'test city' } });

    expect(OrderFormWrapper.state('data').city).toBe('test city');
  });

  it('rerenders with updated state on address input change', () => {
    OrderFormWrapper = mount(<OrderForm onOrderSubmit={onOrderSubmit} />);
    const input = OrderFormWrapper.find('#address');
    input.simulate('change', { target: { name: 'address', value: 'test address' } });

    expect(OrderFormWrapper.state('data').address).toBe('test address');
  });

  it('rerenders with updated state on phone input change', () => {
    OrderFormWrapper = mount(<OrderForm onOrderSubmit={onOrderSubmit} />);
    const input = OrderFormWrapper.find('#phone');
    input.simulate('change', { target: { name: 'phone', value: '+000000012345' } });

    expect(OrderFormWrapper.state('data').phone).toBe('+000000012345');
  });

  it('rerenders with updated state on comment input change', () => {
    OrderFormWrapper = mount(<OrderForm onOrderSubmit={onOrderSubmit} />);
    const input = OrderFormWrapper.find('#comment');
    input.simulate('change', { target: { name: 'comment', value: 'test comment' } });

    expect(OrderFormWrapper.state('data').comment).toBe('test comment');
  });

  it('submits form properly after the from has been filled out', () => {
    OrderFormWrapper = shallow(<OrderForm onOrderSubmit={onOrderSubmit} />);
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
