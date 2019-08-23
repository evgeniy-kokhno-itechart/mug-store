/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Pagination from '../../shared/controls/Pagination';

configure({ adapter: new Adapter() });

describe('<Pagination />', () => {
  let PaginationWrapper;

  beforeEach(() => {
    const onPageChange = jest.fn();
    PaginationWrapper = shallow(<Pagination itemsCount={7} pageSize={5} onPageChange={onPageChange} />);
  });

  it('renders with default props with 1st page checked as active', () => {
    expect(PaginationWrapper.debug()).toMatchSnapshot();
  });

  it('renders and displays 2nd page as active', () => {
    PaginationWrapper.setProps({ currentPage: 2 });
    expect(PaginationWrapper.debug()).toMatchSnapshot();
  });
});
