/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { App } from '../App';

configure({ adapter: new Adapter() });

describe('<App />', () => {
  let AppWrapper;
  let getCategories;
  let getCurrencies;

  beforeEach(() => {
    getCategories = jest.fn();
    getCurrencies = jest.fn();
    AppWrapper = shallow(<App getCategories={getCategories} getCurrencies={getCurrencies} />);
  });

  it('renders properly with default props', () => {
    expect(AppWrapper).toMatchSnapshot();
    expect(getCategories).toHaveBeenCalled();
    expect(getCurrencies).toHaveBeenCalled();
  });
});
