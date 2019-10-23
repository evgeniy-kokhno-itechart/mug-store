/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import DropdownInline from '../../../app/shared/components/controls/DropdownInline/DropdownInline';

configure({ adapter: new Adapter() });

describe('<DropdownInline />', () => {
  let DropdownInlineWrapper;

  beforeEach(() => {
    const onChange = jest.fn();
    DropdownInlineWrapper = shallow(
      <DropdownInline
        name="name"
        label="label"
        options={[{ id: '1', name: 'test name 1' }, { id: '2', name: 'test name 2' }]}
        onChange={onChange}
      />,
    );
  });

  it('renders properly with default props', () => {
    expect(DropdownInlineWrapper).toMatchSnapshot();
  });

  it('renders properly with error', () => {
    DropdownInlineWrapper.setProps({ error: 'test error' });
    expect(DropdownInlineWrapper).toMatchSnapshot();
  });

  it('renders properly with value provided', () => {
    DropdownInlineWrapper.setProps({ value: '2' });
    expect(DropdownInlineWrapper).toMatchSnapshot();
  });

  it('renders properly with defaultText', () => {
    DropdownInlineWrapper.setProps({ defaultText: 'test default text' });
    expect(DropdownInlineWrapper).toMatchSnapshot();
  });

  it('renders properly with labelClasses', () => {
    DropdownInlineWrapper.setProps({ labelClasses: 'testlabelclass' });
    expect(DropdownInlineWrapper).toMatchSnapshot();
  });

  it('renders properly with selectClasses', () => {
    DropdownInlineWrapper.setProps({ selectClasses: 'testselectclass' });
    expect(DropdownInlineWrapper).toMatchSnapshot();
  });

  it('renders properly with wrapperClasses', () => {
    DropdownInlineWrapper.setProps({ wrapperClasses: 'testwrapperclass' });
    expect(DropdownInlineWrapper).toMatchSnapshot();
  });
});
