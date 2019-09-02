/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PaginationButton from '../../shared/controls/PaginationButton';

configure({ adapter: new Adapter() });

describe('<PaginationButton />', () => {
  let PaginationButtonWrapper;

  beforeEach(() => {
    const handlePageChange = jest.fn();
    PaginationButtonWrapper = shallow(<PaginationButton page={1} handlePageChange={handlePageChange} />);
  });

  it('check render properly', () => {
    expect(PaginationButtonWrapper).toMatchSnapshot();
  });
});
