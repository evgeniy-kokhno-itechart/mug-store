/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ListGroup from '../../shared/controls/ListGroup';

configure({ adapter: new Adapter() });

describe('<ListGroup />', () => {
  let ListGroupWrapper;
  const itemToBeselectedMock = { id: '2', name: 'test name 2' }; // this is to get reference equality in ListGroup component worked

  beforeEach(() => {
    const onItemSelect = jest.fn();
    ListGroupWrapper = shallow(<ListGroup items={[{ id: '1', name: 'test name 1' }, itemToBeselectedMock]} onItemSelect={onItemSelect} />);
  });

  it('renders with default props properly', () => {
    expect(ListGroupWrapper.debug()).toMatchSnapshot();
  });

  it('renders and displays selected item as active', () => {
    ListGroupWrapper.setProps({ selectedItem: itemToBeselectedMock });
    expect(ListGroupWrapper.debug()).toMatchSnapshot();
  });
});
