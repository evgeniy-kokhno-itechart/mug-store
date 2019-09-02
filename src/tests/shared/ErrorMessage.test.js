/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ErrorMessage from '../../shared/markup-usage/ErrorMessage';

configure({ adapter: new Adapter() });

describe('<ErrorMessage />', () => {
  let ErrorMessageWrapper;

  beforeEach(() => {
    ErrorMessageWrapper = shallow(<ErrorMessage message="test error" />);
  });

  it('check ErrorMessage renders properly', () => {
    expect(ErrorMessageWrapper).toMatchSnapshot();
  });
});
