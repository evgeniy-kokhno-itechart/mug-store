/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Footer from '../../general/components/Footer';

configure({ adapter: new Adapter() });

describe('<Footer />', () => {
  let FooterWrapper;

  beforeEach(() => {
    FooterWrapper = shallow(<Footer />);
  });

  it('check Footer renders properly', () => {
    expect(FooterWrapper.debug()).toMatchSnapshot();
  });
});