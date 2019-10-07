/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ListGroupItem from '../../../app/shared/components/controls/ListGroupItem';

configure({ adapter: new Adapter() });

describe('<ListGroupItem />', () => {
  let ListGroupItemWrapper;
  const fakeItem = { id: '1', name: 'test item' };

  beforeEach(() => {
    const handleItemSelect = jest.fn();
    ListGroupItemWrapper = shallow(<ListGroupItem item={fakeItem} index={1} handleItemSelect={handleItemSelect} />);
  });

  it('renders properly with default props provided', () => {
    expect(ListGroupItemWrapper).toMatchSnapshot();
  });

  it('renders within active class if current item is selected item', () => {
    ListGroupItemWrapper.setProps({ selectedItem: fakeItem });
    expect(ListGroupItemWrapper).toMatchSnapshot();
  });
});
