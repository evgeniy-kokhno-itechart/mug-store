/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NotFound from '../../general/components/NotFound';

configure({ adapter: new Adapter() });

describe('<NotFound />', () => {
  let NotFoundWrapper;

  beforeEach(() => {
    NotFoundWrapper = shallow(<NotFound />);
  });

  it('check NotFound renders properly', () => {
    expect(NotFoundWrapper).toMatchSnapshot();
  });
});
