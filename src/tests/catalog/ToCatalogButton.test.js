/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ToCatalogButton from '../../catalog/components/ToCatalogButton';

configure({ adapter: new Adapter() });

describe('<ToCatalogButton />', () => {
  let ToCatalogButtonWrapper;

  beforeEach(() => {
    ToCatalogButtonWrapper = shallow(<ToCatalogButton />);
  });

  it('check render without customClasses provided', () => {
    expect(ToCatalogButtonWrapper.debug()).toMatchSnapshot();
  });

  it('check render with customClasses = testclass provided', () => {
    ToCatalogButtonWrapper.setProps({ customClasses: 'testclass' });
    expect(ToCatalogButtonWrapper.debug()).toMatchSnapshot();
  });
});
