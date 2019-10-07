/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Dropdown from '../../../app/shared/components/controls/Dropdown';

configure({ adapter: new Adapter() });

describe('<Dropdown />', () => {
  let DropdownWrapper;

  beforeEach(() => {
    DropdownWrapper = shallow(
      <Dropdown
        name="name"
        label="label"
        options={[{ id: '1', name: 'test name 1' }, { id: '2', name: 'test name 2' }]}
      />,
    );
  });

  it('renders properly with default props', () => {
    expect(DropdownWrapper).toMatchSnapshot();
  });

  it('renders properly with error', () => {
    DropdownWrapper.setProps({ error: 'test error' });
    expect(DropdownWrapper).toMatchSnapshot();
  });

  it('renders properly with value provided', () => {
    DropdownWrapper.setProps({ value: '2' });
    expect(DropdownWrapper).toMatchSnapshot();
  });

  it('renders properly with defaultText', () => {
    DropdownWrapper.setProps({ defaultText: 'test default text' });
    expect(DropdownWrapper).toMatchSnapshot();
  });

  it('renders properly with labelClasses', () => {
    DropdownWrapper.setProps({ labelClasses: 'testlabelclass' });
    expect(DropdownWrapper).toMatchSnapshot();
  });

  it('renders properly with selectClasses', () => {
    DropdownWrapper.setProps({ selectClasses: 'testselectclass' });
    expect(DropdownWrapper).toMatchSnapshot();
  });

  it('renders properly with wrapperClasses', () => {
    DropdownWrapper.setProps({ wrapperClasses: 'testwrapperclass' });
    expect(DropdownWrapper).toMatchSnapshot();
  });
});
