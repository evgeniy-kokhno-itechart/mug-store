/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SortBox from '../../catalog/components/SortBox';

configure({ adapter: new Adapter() });

describe('<SortBox />', () => {
  let SortBoxWrapper;

  beforeEach(() => {
    const onSortChange = jest.fn();
    SortBoxWrapper = shallow(
      <SortBox sortColumnKey="title" sortOptions={[{ id: 'title_desc', name: 'Title Z-A' }]} onSortChange={onSortChange} />,
    );
  });

  it('check render properly', () => {
    expect(SortBoxWrapper.debug()).toMatchSnapshot();
  });
});
