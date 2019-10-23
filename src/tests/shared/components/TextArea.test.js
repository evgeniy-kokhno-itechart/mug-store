/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TextArea from '../../../app/shared/components/controls/TextArea/TextArea';

configure({ adapter: new Adapter() });

describe('<TextArea />', () => {
  let TextAreaWrapper;

  beforeEach(() => {
    TextAreaWrapper = shallow(<TextArea name="testname" label="Test label" />);
  });

  it('check TextArea renders properly with default props', () => {
    expect(TextAreaWrapper).toMatchSnapshot();
  });

  it('check TextArea renders properly with error', () => {
    TextAreaWrapper.setProps({ error: 'Test error' });
    expect(TextAreaWrapper).toMatchSnapshot();
  });

  it('check TextArea renders properly with value provided', () => {
    TextAreaWrapper.setProps({ value: 'Test value' });
    expect(TextAreaWrapper).toMatchSnapshot();
  });
});
