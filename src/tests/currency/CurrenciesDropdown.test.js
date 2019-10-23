/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CurrensiesDropdown from '../../app/currency/components/CurrenciesDropdown/CurrenciesDropdown';

configure({ adapter: new Adapter() });

describe('<CurrensiesDropdown />', () => {
  let CurrensiesDropdownWrapper;

  beforeEach(() => {
    const onCurrencyChange = jest.fn();
    CurrensiesDropdownWrapper = shallow(<CurrensiesDropdown onChange={onCurrencyChange} />);
  });

  it('renders spinner with default props provided', () => {
    expect(CurrensiesDropdownWrapper).toMatchSnapshot();
  });

  it('renders currencies dropdown with currencies provided', () => {
    CurrensiesDropdownWrapper.setProps({
      currencyState: {
        currentCurrency: { id: '1' },
        currencies: [{ id: '1', name: 'test' }],
        currenciesStatus: {
          isInProcess: false,
          hasFailed: false,
          error: '',
        },
      },
    });
    expect(CurrensiesDropdownWrapper).toMatchSnapshot();
  });

  it('renders badge within error with when currenciesStatus.hasFailed=true and errorMessage provided', () => {
    CurrensiesDropdownWrapper.setProps({
      currencyState: {
        currentCurrency: { id: '1' },
        currencies: [{ id: '1', name: 'test' }],
        currenciesStatus: {
          isInProcess: false,
          hasFailed: true,
          error: 'test error',
        },
      },
    });
    expect(CurrensiesDropdownWrapper).toMatchSnapshot();
  });
});
