/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PaginationButton from '../../../app/shared/components/controls/PaginationButton/PaginationButton';

configure({ adapter: new Adapter() });

describe('<PaginationButton />', () => {
  let PaginationButtonWrapper;
  let handlePageChange;

  beforeEach(() => {
    handlePageChange = jest.fn();
    PaginationButtonWrapper = shallow(<PaginationButton page={1} handlePageChange={handlePageChange} />);
  });

  it('check render properly', () => {
    expect(PaginationButtonWrapper).toMatchSnapshot();
  });

  it('check onClick passes proper arguments to handlePageChange', () => {
    PaginationButtonWrapper.find('button').simulate('click');
    expect(handlePageChange).toHaveBeenCalledWith(1);
  });
});
