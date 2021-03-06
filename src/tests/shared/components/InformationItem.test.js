/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import InformationItem from '../../../app/shared/components/markup/InformationItem/InformationItem';

configure({ adapter: new Adapter() });

describe('<InformationItem />', () => {
  let InformationItemWrapper;

  beforeEach(() => {
    InformationItemWrapper = shallow(<InformationItem label="test label" />);
  });

  it('check InformationItem renders properly with default props', () => {
    expect(InformationItemWrapper).toMatchSnapshot();
  });

  it('check InformationItem renders properly when info is number', () => {
    InformationItemWrapper.setProps({ info: 1 });
    expect(InformationItemWrapper).toMatchSnapshot();
  });

  it('check InformationItem renders properly when info is string', () => {
    InformationItemWrapper.setProps({ info: 'test info' });
    expect(InformationItemWrapper).toMatchSnapshot();
  });
});
