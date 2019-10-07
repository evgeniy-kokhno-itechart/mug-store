/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Spinner from '../../../app/shared/components/markup/Spinner';

configure({ adapter: new Adapter() });

describe('<Spinner />', () => {
  let SpinnerWrapper;

  beforeEach(() => {
    SpinnerWrapper = shallow(<Spinner />);
  });

  it('renders properly with default props', () => {
    expect(SpinnerWrapper).toMatchSnapshot();
  });

  it('renders properly with spinnerClasses provided', () => {
    SpinnerWrapper.setProps({ spinnerClasses: 'testspinnerclass' });
    expect(SpinnerWrapper).toMatchSnapshot();
  });

  it('renders properly with wrapperClasses provided', () => {
    SpinnerWrapper.setProps({ wrapperClasses: 'testwrapperclass' });
    expect(SpinnerWrapper).toMatchSnapshot();
  });
});
