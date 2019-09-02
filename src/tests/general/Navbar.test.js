/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Navbar } from '../../general/containers/Navbar';

configure({ adapter: new Adapter() });

describe('<Navbar />', () => {
  let NavbarWrapper;

  beforeEach(() => {
    const changeCurrency = jest.fn();
    NavbarWrapper = shallow(<Navbar currentCurrency={{ id: '0' }} isCurrenciesLoading changeCurrency={changeCurrency} />);
  });

  it('renders properly with default props', () => {
    expect(NavbarWrapper).toMatchSnapshot();
  });

  it('renders with currentUser provided', () => {
    NavbarWrapper.setProps({ currentUser: { name: 'testUsername' } });
    expect(NavbarWrapper).toMatchSnapshot();
  });

  it('renders with hasCurrenciesLoadFailed and errorCurrenciesLoading provided', () => {
    NavbarWrapper.setProps({ isCurrenciesLoading: false, hasCurrenciesLoadFailed: true, errorCurrenciesLoading: 'test error' });
    expect(NavbarWrapper).toMatchSnapshot();
  });

  it('renders with cart provided', () => {
    NavbarWrapper.setProps({ cart: [{ quantity: 3 }, { quantity: 1 }, { quantity: 7 }] });
    expect(NavbarWrapper).toMatchSnapshot();
  });

  it('renders with currencies dropdown filled with currencies list', () => {
    NavbarWrapper.setProps({ isCurrenciesLoading: false, currencies: [{ id: '1', name: 'CURR1' }, { id: '2', name: 'CURR2' }] });
    expect(NavbarWrapper).toMatchSnapshot();
  });
});
