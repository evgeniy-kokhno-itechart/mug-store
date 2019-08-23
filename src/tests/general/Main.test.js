/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Main from '../../general/components/Main';

configure({ adapter: new Adapter() });

describe('<Main />', () => {
  let MainWrapper;

  beforeEach(() => {
    MainWrapper = shallow(<Main />);
  });

  it('check Main renders properly', () => {
    expect(MainWrapper.debug()).toMatchSnapshot();
  });
});
