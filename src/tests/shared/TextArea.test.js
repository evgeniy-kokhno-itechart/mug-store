/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TextArea from '../../shared/controls/TextArea';

configure({ adapter: new Adapter() });

describe('<TextArea />', () => {
  let TextAreaWrapper;

  beforeEach(() => {
    const onValueChange = jest.fn();
    TextAreaWrapper = shallow(<TextArea name="testname" label="Test label" onValueChange={onValueChange} />);
  });

  it('check TextArea renders properly with default props', () => {
    expect(TextAreaWrapper.debug()).toMatchSnapshot();
  });

  it('check TextArea renders properly with error', () => {
    TextAreaWrapper.setProps({ error: 'Test error' });
    expect(TextAreaWrapper.debug()).toMatchSnapshot();
  });

  it('check TextArea renders properly with value provided', () => {
    TextAreaWrapper.setProps({ value: 'Test value' });
    expect(TextAreaWrapper.debug()).toMatchSnapshot();
  });
});
