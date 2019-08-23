/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TotalCostCalculator from '../../cart/containers/TotalCostCalculator';

configure({ adapter: new Adapter() });

describe('<TotalCostCalculator />', () => {
  let TotalCostCalculatorWrapper;

  beforeEach(() => {
    TotalCostCalculatorWrapper = shallow(<TotalCostCalculator products={[{ currentCurrencyCost: 5 }, { currentCurrencyCost: 10 }]} />);
  });

  it('renders properly with default props', () => {
    expect(TotalCostCalculatorWrapper).toMatchSnapshot();
  });

  it('renders properly with customClasses provided', () => {
    TotalCostCalculatorWrapper.setProps({ customClasses: 'testclass' });
    expect(TotalCostCalculatorWrapper).toMatchSnapshot();
  });

  it('calculates total cost properly', () => {
    expect(TotalCostCalculatorWrapper.first('TotalCost').prop('total')).toEqual(15);
  });
});
