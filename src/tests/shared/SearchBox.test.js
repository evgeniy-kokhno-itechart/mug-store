/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SearchBox from '../../shared/controls/SearchBox';

configure({ adapter: new Adapter() });

describe('<SearchBox />', () => {
  let onSearchSubmit;

  beforeEach(() => {
    onSearchSubmit = jest.fn();
  });

  it('renders with default props with Search... text in the input', () => {
    const SearchBoxWrapper = shallow(<SearchBox onSearchSubmit={onSearchSubmit} />);
    expect(SearchBoxWrapper.debug()).toMatchSnapshot();
  });

  it('renders with value = test search in the input', () => {
    const SearchBoxWrapper = shallow(<SearchBox value="test search" onSearchSubmit={onSearchSubmit} />);
    // SearchBoxWrapper.setState({ query: 'test search' }); // this is too late. value should be provided from the very beginning
    expect(SearchBoxWrapper.debug()).toMatchSnapshot();
  });
});
