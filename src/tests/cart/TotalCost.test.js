/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TotalCost from '../../cart/components/TotalCost';

configure({ adapter: new Adapter() });

describe('<TotalCost />', () => {
  let TotalCostWrapper;

  beforeEach(() => {
    TotalCostWrapper = shallow(<TotalCost total={100} />);
  });

  it('check render without customClasses provided', () => {
    expect(TotalCostWrapper).toMatchSnapshot();
  });

  it('check render with customClasses = testclass provided', () => {
    TotalCostWrapper.setProps({ customClasses: 'testclass' });
    expect(TotalCostWrapper).toMatchSnapshot();
  });
});
