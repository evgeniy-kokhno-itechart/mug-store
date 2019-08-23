/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Spinner from '../../shared/markup-usage/Spinner';

configure({ adapter: new Adapter() });

describe('<Spinner />', () => {
  let SpinnerWrapper;

  beforeEach(() => {
    SpinnerWrapper = shallow(<Spinner />);
  });

  it('renders properly with default props', () => {
    expect(SpinnerWrapper).toMatchSnapshot();
  });

  it('renders properly with customSizeClassName provided', () => {
    SpinnerWrapper.setProps({ customSizeClassName: 'testclassname' });
    expect(SpinnerWrapper).toMatchSnapshot();
  });

  it('renders properly with marginBootstrapClassName provided', () => {
    SpinnerWrapper.setProps({ marginBootstrapClassName: 'mt-1' });
    expect(SpinnerWrapper).toMatchSnapshot();
  });
});
