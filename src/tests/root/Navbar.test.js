/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Navbar } from '../../app/root/containers/Navbar/Navbar';

configure({ adapter: new Adapter() });

describe('<Navbar />', () => {
  let NavbarWrapper;

  beforeEach(() => {
    const changeCurrency = jest.fn();
    const logoutUser = jest.fn();
    NavbarWrapper = shallow(
      <Navbar
        currentCurrency={{ id: '0' }}
        isCurrenciesLoading
        changeCurrency={changeCurrency}
        logoutUser={logoutUser}
      />,
    );
  });

  it('renders properly with default props', () => {
    expect(NavbarWrapper).toMatchSnapshot();
  });

  it('renders user name with currentUser provided', () => {
    NavbarWrapper.setProps({ currentUserName: 'testUsername' });
    expect(NavbarWrapper).toMatchSnapshot();
  });

  it('renders with currenciesStatus.hasFailed and error provided', () => {
    NavbarWrapper.setProps({
      currencyState: {
        currenciesStatus: { isInProcess: false, hasFailed: true, error: 'test error' },
      },
    });
    expect(NavbarWrapper).toMatchSnapshot();
  });

  it('renders cart count badge with cart provided', () => {
    NavbarWrapper.setProps({ cart: [{ quantity: 3 }, { quantity: 1 }, { quantity: 7 }] });
    expect(NavbarWrapper).toMatchSnapshot();
  });

  it('renders currencies dropdown filled with currencies list when provided', () => {
    NavbarWrapper.setProps({
      currencyState: {
        currencies: [{ id: '1', name: 'CURR1' }, { id: '2', name: 'CURR2' }],
        currenciesStatus: { isInProcess: false, hasFailed: false, error: '' },
        currentCurrency: { id: '2' },
      },
    });
    expect(NavbarWrapper).toMatchSnapshot();
  });
});
