/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Input from '../../shared/controls/Input';

configure({ adapter: new Adapter() });

describe('<Input />', () => {
  let InputWrapper;

  beforeEach(() => {
    const onValueChange = jest.fn();
    InputWrapper = shallow(<Input name="testname" label="Test label" onValueChange={onValueChange} />);
  });

  it('check Input renders properly with default props', () => {
    expect(InputWrapper).toMatchSnapshot();
  });

  it('check Input renders properly with error', () => {
    InputWrapper.setProps({ error: 'test error' });
    expect(InputWrapper).toMatchSnapshot();
  });

  it('check Input renders properly with matchedInputName provided', () => {
    InputWrapper.setProps({ matchedInputName: 'Test matchedInputName' });
    expect(InputWrapper).toMatchSnapshot();
  });

  it('check Input renders properly with value provided', () => {
    InputWrapper.setProps({ value: 'Test value' });
    expect(InputWrapper).toMatchSnapshot();
  });
});
