/* eslint-disable no-undef */
import React from 'react';

import { configure, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Rate from '../../../app/shared/components/markup/Rate/Rate';

configure({ adapter: new Adapter() });

describe('<Rate />', () => {
  let RateWrapper;

  beforeEach(() => {
    RateWrapper = render(<Rate rate="3" />);
  });

  it('renders properly with default props', () => {
    expect(RateWrapper).toMatchSnapshot();
  });
});
