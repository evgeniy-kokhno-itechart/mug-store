/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CurrensiesDropdown from '../../general/components/CurrenciesDropdown';

configure({ adapter: new Adapter() });

describe('<CurrensiesDropdown />', () => {
  let CurrensiesDropdownWrapper;

  beforeEach(() => {
    const onCurrencyChange = jest.fn();
    CurrensiesDropdownWrapper = shallow(
      <CurrensiesDropdown currentCurrencyId="1" currencyOptions={[{ id: '1', name: 'test' }]} onCurrencyChange={onCurrencyChange} />,
    );
  });

  it('check the shapshot without optional props provided', () => {
    expect(CurrensiesDropdownWrapper.debug()).toMatchSnapshot();
  });

  it('check the shapshot with isCurrenciesLoading = true provided', () => {
    CurrensiesDropdownWrapper.setProps({ isCurrenciesLoading: true });
    expect(CurrensiesDropdownWrapper.debug()).toMatchSnapshot();
  });

  it('check the shapshot with hasLoadFailed = true and errorMessage provided', () => {
    CurrensiesDropdownWrapper.setProps({ hasLoadFailed: true, errorMessage: 'test error' });
    expect(CurrensiesDropdownWrapper.debug()).toMatchSnapshot();
  });
});
