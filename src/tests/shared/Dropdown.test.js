/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Dropdown from '../../shared/controls/Dropdown';

configure({ adapter: new Adapter() });

describe('<Dropdown />', () => {
  let DropdownWrapper;

  beforeEach(() => {
    const onValueChange = jest.fn();
    DropdownWrapper = shallow(
      <Dropdown
        name="name"
        label="label"
        options={[{ id: '1', name: 'test name 1' }, { id: '2', name: 'test name 2' }]}
        onValueChange={onValueChange}
      />,
    );
  });

  it('check Dropdown renders properly with default props', () => {
    expect(DropdownWrapper).toMatchSnapshot();
  });

  it('check Dropdown renders properly with error', () => {
    DropdownWrapper.setProps({ error: 'test error' });
    expect(DropdownWrapper).toMatchSnapshot();
  });

  it('check Dropdown renders properly with defaultText', () => {
    DropdownWrapper.setProps({ defaultText: 'test default text' });
    expect(DropdownWrapper).toMatchSnapshot();
  });

  it('check Dropdown renders properly with customClasses', () => {
    DropdownWrapper.setProps({ customClasses: 'testclass' });
    expect(DropdownWrapper).toMatchSnapshot();
  });

  it('check Dropdown renders properly with value provided', () => {
    DropdownWrapper.setProps({ value: '2' });
    expect(DropdownWrapper).toMatchSnapshot();
  });

  it('check Dropdown renders properly with isOnelineElement true', () => {
    DropdownWrapper.setProps({ isOnelineElement: true });
    expect(DropdownWrapper).toMatchSnapshot();
  });
});
