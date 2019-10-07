/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ErrorMessage from '../../../app/shared/components/markup/ErrorMessage';

configure({ adapter: new Adapter() });

describe('<ErrorMessage />', () => {
  let ErrorMessageWrapper;

  beforeEach(() => {
    ErrorMessageWrapper = shallow(<ErrorMessage message="test error" />);
  });

  it('check ErrorMessage renders properly with default props', () => {
    expect(ErrorMessageWrapper).toMatchSnapshot();
  });

  it('check ErrorMessage renders properly custom class testclass', () => {
    ErrorMessageWrapper.setProps({ customClasses: 'testclass' });
    expect(ErrorMessageWrapper).toMatchSnapshot();
  });
});
