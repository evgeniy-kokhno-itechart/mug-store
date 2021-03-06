/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SearchBox from '../../../app/shared/components/controls/SearchBox/SearchBox';

configure({ adapter: new Adapter() });

describe('<SearchBox />', () => {
  let onSearchSubmit;

  beforeEach(() => {
    onSearchSubmit = jest.fn();
  });

  it('renders with default props with Search... text in the input', () => {
    const SearchBoxWrapper = shallow(<SearchBox onSearchSubmit={onSearchSubmit} />);
    expect(SearchBoxWrapper).toMatchSnapshot();
  });

  it('renders with value = test search in the input', () => {
    const SearchBoxWrapper = shallow(<SearchBox value="test search" onSearchSubmit={onSearchSubmit} />);
    expect(SearchBoxWrapper).toMatchSnapshot();
  });
});
