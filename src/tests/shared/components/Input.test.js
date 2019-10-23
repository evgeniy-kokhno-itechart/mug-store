/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Input from '../../../app/shared/components/controls/Input/Input';

configure({ adapter: new Adapter() });

describe('<Input />', () => {
  let InputWrapper;

  beforeEach(() => {
    InputWrapper = shallow(<Input name="testname" label="Test label" />);
  });

  it('check Input renders properly with default props', () => {
    expect(InputWrapper).toMatchSnapshot();
  });

  it('check Input renders properly with error', () => {
    InputWrapper.setProps({ error: 'test error' });
    expect(InputWrapper).toMatchSnapshot();
  });

  it('check Input renders properly with custom type provided', () => {
    InputWrapper.setProps({ type: 'password' });
    expect(InputWrapper).toMatchSnapshot();
  });

  it('check Input renders properly with string value provided', () => {
    InputWrapper.setProps({ value: 'Test value' });
    expect(InputWrapper).toMatchSnapshot();
  });

  it('check Input renders properly with number value provided', () => {
    InputWrapper.setProps({ value: 5 });
    expect(InputWrapper).toMatchSnapshot();
  });
});
