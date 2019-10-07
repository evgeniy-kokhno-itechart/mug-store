/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import About from '../../app/root/components/About';

configure({ adapter: new Adapter() });

describe('<About />', () => {
  let AboutWrapper;

  beforeEach(() => {
    AboutWrapper = shallow(<About />);
  });

  it('check About renders properly', () => {
    expect(AboutWrapper).toMatchSnapshot();
  });
});
